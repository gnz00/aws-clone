#!/usr/bin/env node
'use strict';

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _aws = require('aws');

var _aws2 = _interopRequireDefault(_aws);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

// Load our .env file into process.ENV
_dotenv2.default.load();

var warn = new _debug2.default('aws-setup:warn');
var info = new _debug2.default('aws-setup:info');
var error = new _debug2.default('aws-setup:error');
var debug = new _debug2.default('aws-setup:debug');

debug('Starting ENV: ', _util2.default.inspect(process.env));

_inquirer2.default.prompt('What up', function (answer) {
  console.log(answer);
  return answer;
})(_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var configFile;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Prompt('Input File');

        case 2:
          configFile = _context.sent;

          info(configFile);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
})))();

var Prompt = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(prompt) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _inquirer2.default.prompt(prompt, function (answer) {
              return answer;
            });

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function Prompt(_x) {
    return ref.apply(this, arguments);
  };
}();