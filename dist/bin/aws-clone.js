#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utils = require('../utils');

var _AWS = require('../workflows/AWS');

var _AWS2 = _interopRequireDefault(_AWS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

// Load our .env file into process.env
_dotenv2.default.load();

var debug = new _debug2.default('aws-setup:run');

var run = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var workflow;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            // Kick off the main workflow
            workflow = (0, _AWS2.default)();

            workflow.on('success', function (flowObject) {
              debug('Flow succeeded.');
            });

            workflow.on('failure', function (flowObject) {
              debug('Flow failed.');
            });

            workflow.on('error', function (error, flowObject) {
              throw new Error(error);
              debug('Flow encountered an error.');
            });

            // Will always get called
            workflow.on('complete', function (flowObject) {
              debug('Flow has finished executing.');
            });

            _context.next = 8;
            return workflow.start();

          case 8:
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0.stack);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function run() {
    return ref.apply(this, arguments);
  };
}();

run();