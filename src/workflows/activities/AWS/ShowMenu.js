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

const debug = new Debug('aws-setup:workflows:EB:promptAction');
let ebClient;

const START_EB = "EB";

export default new Activity('Prompt Action', async function(context) {
    try { 

      const action = await displayMainMenu();
      switch (action) {
        case START_EB:
          context.setState(context.getStates().START_EB);
          break;
      }

      this.emit('complete', context);
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
      message: `Select a service:`,
      choices: [
        START_EB
      ],
      default: false
    }
  ]);

  return selected.name;
}
