'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flowjs = require('@maysale01/flowjs');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _awsSdk = require('aws-sdk');

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

var debug = new _debug2.default('aws-setup:workflows:EB:createEBApplicationSpec');
var ebClient = undefined;

var regions = ["US-EAST-1", "US-WEST-1", "US-WEST-2", "EU-CENTRAL-1", "EU-WEST-1", "AP-NORTHEAST-1", "AP-NORTHEAST-2", "AP-SOUTHEAST-1", "AP-SOUTHEAST-2", "CN-NORTH-1", "GovCloud", "SA-EAST-1"];

exports.default = new _flowjs.Activity('Create EB Application Spec', function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(context) {
    var region, response, applications, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, application, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, environment, outputFile;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _utils.Prompt)([{
              "name": "name",
              "type": "list",
              "message": "Select a region: ",
              "choices": regions
            }]);

          case 3:
            region = _context.sent;

            ebClient = new _awsSdk.ElasticBeanstalk({ region: region.name.toLowerCase() });

            // Get all the applications
            _context.next = 7;
            return listApplications();

          case 7:
            response = _context.sent;
            applications = response.Applications;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;
            _iterator = applications[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 51;
              break;
            }

            application = _step.value;
            _context.next = 18;
            return listEnvironments(application);

          case 18:
            response = _context.sent;

            application.Environments = response.Environments;

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 23;
            _iterator2 = application.Environments[Symbol.iterator]();

          case 25:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 34;
              break;
            }

            environment = _step2.value;
            _context.next = 29;
            return getEnvironmentConfigurationSettings(environment);

          case 29:
            response = _context.sent;

            environment.ConfigurationSettings = response.ConfigurationSettings;

          case 31:
            _iteratorNormalCompletion2 = true;
            _context.next = 25;
            break;

          case 34:
            _context.next = 40;
            break;

          case 36:
            _context.prev = 36;
            _context.t0 = _context['catch'](23);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t0;

          case 40:
            _context.prev = 40;
            _context.prev = 41;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 43:
            _context.prev = 43;

            if (!_didIteratorError2) {
              _context.next = 46;
              break;
            }

            throw _iteratorError2;

          case 46:
            return _context.finish(43);

          case 47:
            return _context.finish(40);

          case 48:
            _iteratorNormalCompletion = true;
            _context.next = 14;
            break;

          case 51:
            _context.next = 57;
            break;

          case 53:
            _context.prev = 53;
            _context.t1 = _context['catch'](12);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 57:
            _context.prev = 57;
            _context.prev = 58;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 60:
            _context.prev = 60;

            if (!_didIteratorError) {
              _context.next = 63;
              break;
            }

            throw _iteratorError;

          case 63:
            return _context.finish(60);

          case 64:
            return _context.finish(57);

          case 65:
            _context.next = 67;
            return (0, _utils.Prompt)([{
              type: "input",
              name: "path",
              message: "Output File: "
            }]);

          case 67:
            outputFile = _context.sent;

            _fs2.default.writeFileSync(_path2.default.resolve(outputFile.path), JSON.stringify(applications, null, 4));

            this.emit('complete', context);
            _context.next = 76;
            break;

          case 72:
            _context.prev = 72;
            _context.t2 = _context['catch'](0);

            context.error = _context.t2;
            this.emit('error', context);

          case 76:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 72], [12, 53, 57, 65], [23, 36, 40, 48], [41,, 43, 47], [58,, 60, 64]]);
  }));

  return function (_x) {
    return ref.apply(this, arguments);
  };
}());

function listApplications() {
  return new Promise(function (resolve, reject) {
    ebClient.describeApplications({}, function (err, data) {
      if (err) reject(err);else resolve(data);
    });
  });
}

function listEnvironments(application) {
  return new Promise(function (resolve, reject) {
    ebClient.describeEnvironments({
      ApplicationName: application.ApplicationName
    }, function (err, data) {
      if (err) reject(err);else resolve(data);
    });
  });
}

function getEnvironmentConfigurationSettings(environment) {
  return new Promise(function (resolve, reject) {
    ebClient.describeConfigurationSettings({
      ApplicationName: environment.ApplicationName,
      EnvironmentName: environment.EnvironmentName,
      TemplateName: environment.TemplateName
    }, function (err, data) {
      if (err) reject(err);else resolve(data);
    });
  });
}