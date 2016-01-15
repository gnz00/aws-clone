import {
    Activity
} from '@maysale01/flowjs';
import Debug from 'debug';
import { ElasticBeanstalk } from 'aws-sdk';
import util from 'util';
import inquirer from 'inquirer';

import {
  Prompt
} from '../../../utils';

const debug = new Debug('aws-setup:workflows:EB:createEBApplication');
let ebClient;

export default new Activity('Create EB Application', async function(context) {
    try { 

      // Prompt for the input file
      const configFile = await Prompt([{
        type: "input",
        name: "path",
        message: "Input File: ",
        validate: (filePath) => {
          try {
            filePath = path.resolve(filePath);
            let config = JSON.parse(fs.readFileSync(filePath));
            return true;
          }
          catch (e) {
            return new Error(e.message, e.stack);
          }
        }
      }]);

      // Open and parse the input file
      const config = JSON.parse(fs.readFileSync(configFile.path));

      ebClient = new ElasticBeanstalk({ region: config['AWS']['DEFAULT_REGION'] });
      debug('Creating an EB application', util.inspect(ebApplications, true, 2, true));

      for (let application of ebApplications) {
        try {
          await createApplication(application);
        } catch (e) {
          console.log(e);
          continue;
        }

        for (let environment of application['Environments']) {
          environment.ApplicationName = application.ApplicationName;
          try {
            await createEnvironment(environment);
          } catch (e) {
            console.log(e);
            continue;
          }
        }
      }

      this.emit('complete', context);
    } catch (e) {
      console.log(e);
      context.error = e;
      this.emit('error', context);
    }
});

function getSolutionStacks() {
  return new Promise((resolve, reject) => {
    ebClient.listAvailableSolutionStacks(function(err, data) {
      if (err) 
        reject(err);       
      else     
        resolve(data);
    });
  });
}

function createApplication(application) {
  return new Promise(async (resolve, reject) => {
    let createApplicationPrompt = await Prompt([
      {
        name: "continue",
        type: "confirm",
        message: `Do you want to create application: ${application.ApplicationName} ?`,
        default: false
      }
    ]);

    if (createApplicationPrompt.continue) {
      resolve();
      // ebClient.createApplication({
      //   ApplicationName: application.name,
      //   Description: application.description
      // }, function(err, data) {
      //   if (err)
      //     reject(err);
      //   else 
      //     resolve(data);
      // });
    } else {
      reject();
    }
  });
}

function createEnvironment(environment) {
  return new Promise(async (resolve, reject) => {
    let createEnvironmentPrompt = await Prompt([
      {
        name: "continue",
        type: "confirm",
        message: `Do you want to create environment: ${environment.EnvironmentName} for ${environment.ApplicationName} ?`,
        default: false
      }
    ]);

    if (createEnvironmentPrompt.continue) {

      if (!environment.SolutionStackName) {
        environment.SolutionStackName = pickSolutionStacks();
      }

      ebClient.createEnvironment({
        ApplicationName: application.name,
        EnvironmentName: environment.name,
        Description: environment.description,
      }, function(err, data) {
        if (err)
          reject(err);
        else 
          resolve(data);
      });
    } else {
      reject();
    }
  });
}

async function pickSolutionStacks() {
  const solutionStacks = await getSolutionStacks();

  let picked = await Prompt([
    {
      name: "name",
      type: "list",
      message: `Select a stack: `,
      choices: solutionStacks.SolutionStacks,
      default: false
    }
  ]);

  return picked.name;
}



function validateEnvironmentConfiguration(environment) {
  return new Promise((resolve, reject) => {
    ebClient.validateConfigurationSettings(environment, function(err, data) {
      if (err) 
        reject(err);
      else     
        resolve(data);
    });
  });
}
