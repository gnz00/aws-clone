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

const CREATE_CONFIG = "Create a config file from existing applications";
const CREATE_APPLICATIONS = "Create new applications from a config file";
const END = "<-- Go Back --";

const debug = new Debug('aws-setup:workflows:EB:promptAction');
let ebClient;

export default new Activity('Prompt Action', async function(context) {
    try { 
      const action = await displayMainMenu();
      switch (action) {
        case CREATE_CONFIG:
          context.setState(context.getStates().CREATE_CONFIG);
          break;
        case CREATE_APPLICATIONS:
          context.setState(context.getStates().CREATE_APPLICATIONS);
          break;
        case END:
          context.setState(context.getStates().END);
          break;
      }
    } catch (e) {
      context.error = e;
      this.emit('error', context);
    }
});

async function displayMainMenu() {
  let selected = await Prompt([
    {
      name: "name",
      type: "list",
      message: `Select an action:`,
      choices: [
        CREATE_CONFIG,
        CREATE_APPLICATIONS,
        END
      ],
      default: false
    }
  ]);

  return selected.name;
}
