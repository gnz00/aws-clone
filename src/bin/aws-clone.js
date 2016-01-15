#!/usr/bin/env node

import 'babel-polyfill';

import dotenv from 'dotenv';
import Debug from 'debug';
import util from 'util';
import path from 'path';
import fs from 'fs';
import { Prompt } from '../utils';

import AWSWorkflow from '../workflows/AWS';

// Load our .env file into process.env
dotenv.load();

const debug = new Debug('aws-setup:run');

async function run () {
  try {

    // Kick off the main workflow
    let workflow = AWSWorkflow();

    workflow.on('success', (flowObject) => {
      debug('Flow succeeded.');
    });

    workflow.on('failure', (flowObject) => {
      debug('Flow failed.');
    });

    workflow.on('error', (error, flowObject) => {
      throw new Error(error);
      debug('Flow encountered an error.');
    });

    // Will always get called
    workflow.on('complete', (flowObject) => {
      debug('Flow has finished executing.');
    });

    await workflow.start();
  }
  catch (e) {
    console.log(e.stack);
  }
}

run();