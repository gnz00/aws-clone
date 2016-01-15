'use strict';

var inquirer = require('inquirer');
var AWS = require('aws');
var dotenv = require('dotenv');
var Debug = require('debug');
var util = require('util');

// Load our .env file into process.ENV
dotenv.load();

var warn = Debug('aws-setup:warn');
var info = Debug('aws-setup:info');
var error = Debug('aws-setup:error');
var debug = Debug('aws-setup:debug');

debug('Starting ENV: ', util.inspect(process.env));

inquirer.prompt('What up', function (answer) {
  console.log(answer);
  return answer;
});