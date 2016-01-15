import {
    Activity
} from '@maysale01/flowjs';
import Debug from 'debug';
import { ElasticBeanstalk } from 'aws-sdk';
import util from 'util';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

import {
  Prompt
} from '../../../utils';

const debug = new Debug('aws-setup:workflows:EB:createEBApplicationSpec');
let ebClient;

const regions = [
  "US-EAST-1",
  "US-WEST-1",
  "US-WEST-2",
  "EU-CENTRAL-1",
  "EU-WEST-1",
  "AP-NORTHEAST-1",
  "AP-NORTHEAST-2",
  "AP-SOUTHEAST-1",
  "AP-SOUTHEAST-2",
  "CN-NORTH-1",
  "GovCloud",
  "SA-EAST-1",
];

export default new Activity('Create EB Application Spec', async function(context) {
    try { 

      // Select a region
      const region = await Prompt([
        {
          "name": "name",
          "type": "list",
          "message": "Select a region: ",
          "choices": regions
        }
      ]);

      ebClient = new ElasticBeanstalk({ region: region.name.toLowerCase() });

      // Get all the applications
      let response = await listApplications();
      const applications = response.Applications;
      for (let application of applications) {

        // Get all the environments
        response = await listEnvironments(application);
        application.Environments = response.Environments;

        for (let environment of application.Environments) {
          // Get all the environment configs
          response = await getEnvironmentConfigurationSettings(environment);
          environment.ConfigurationSettings = response.ConfigurationSettings
        }
      }

      // Prompt for the output file
      const outputFile = await Prompt([{
        type: "input",
        name: "path",
        message: "Output File: "
      }]);

      fs.writeFileSync(path.resolve(outputFile.path), JSON.stringify(applications, null, 4)); 

      this.emit('complete', context);
    } catch (e) {
      context.error = e;
      this.emit('error', context);
    }
});

function listApplications() {
  return new Promise((resolve, reject) => {
    ebClient.describeApplications({}, (err, data) => {
      if (err)
        reject(err);
      else 
        resolve(data);
    });
  });
}

function listEnvironments(application) {
  return new Promise((resolve, reject) => {
    ebClient.describeEnvironments({
      ApplicationName: application.ApplicationName
    }, (err, data) => {
      if (err)
        reject(err);
      else 
        resolve(data);
    });
  });
}

function getEnvironmentConfigurationSettings(environment) {
  return new Promise((resolve, reject) => {
    ebClient.describeConfigurationSettings({
      ApplicationName: environment.ApplicationName,
      EnvironmentName: environment.EnvironmentName,
      TemplateName: environment.TemplateName,
    }, (err, data) => {
      if (err)
        reject(err);
      else 
        resolve(data);
    });
  });
}