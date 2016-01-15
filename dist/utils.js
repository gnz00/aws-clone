'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prompt = Prompt;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Prompt(prompt) {
  return new Promise(function (resolve, reject) {
    _inquirer2.default.prompt(prompt, function (answer) {
      resolve(answer);
    });
  });
}