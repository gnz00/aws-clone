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

var _utils = require('../../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

var debug = new _debug2.default('aws-setup:workflows:EB:createEBApplication');
var ebClient = undefined;

exports.default = new _flowjs.Activity('Create EB Application', function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(context) {
    var configFile, config, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _application, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, environment;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _utils.Prompt)([{
              type: "input",
              name: "path",
              message: "Input File: ",
              validate: function validate(filePath) {
                try {
                  filePath = path.resolve(filePath);
                  var _config = JSON.parse(fs.readFileSync(filePath));
                  return true;
                } catch (e) {
                  return new Error(e.message, e.stack);
                }
              }
            }]);

          case 3:
            configFile = _context.sent;

            // Open and parse the input file
            config = JSON.parse(fs.readFileSync(configFile.path));

            ebClient = new _awsSdk.ElasticBeanstalk({ region: config['AWS']['DEFAULT_REGION'] });
            debug('Creating an EB application', _util2.default.inspect(ebApplications, true, 2, true));

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 10;
            _iterator = ebApplications[Symbol.iterator]();

          case 12:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 60;
              break;
            }

            _application = _step.value;
            _context.prev = 14;
            _context.next = 17;
            return createApplication(_application);

          case 17:
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](14);

            console.log(_context.t0);
            return _context.abrupt('continue', 57);

          case 23:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 26;
            _iterator2 = _application['Environments'][Symbol.iterator]();

          case 28:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context.next = 43;
              break;
            }

            environment = _step2.value;

            environment.ApplicationName = _application.ApplicationName;
            _context.prev = 31;
            _context.next = 34;
            return createEnvironment(environment);

          case 34:
            _context.next = 40;
            break;

          case 36:
            _context.prev = 36;
            _context.t1 = _context['catch'](31);

            console.log(_context.t1);
            return _context.abrupt('continue', 40);

          case 40:
            _iteratorNormalCompletion2 = true;
            _context.next = 28;
            break;

          case 43:
            _context.next = 49;
            break;

          case 45:
            _context.prev = 45;
            _context.t2 = _context['catch'](26);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t2;

          case 49:
            _context.prev = 49;
            _context.prev = 50;

            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }

          case 52:
            _context.prev = 52;

            if (!_didIteratorError2) {
              _context.next = 55;
              break;
            }

            throw _iteratorError2;

          case 55:
            return _context.finish(52);

          case 56:
            return _context.finish(49);

          case 57:
            _iteratorNormalCompletion = true;
            _context.next = 12;
            break;

          case 60:
            _context.next = 66;
            break;

          case 62:
            _context.prev = 62;
            _context.t3 = _context['catch'](10);
            _didIteratorError = true;
            _iteratorError = _context.t3;

          case 66:
            _context.prev = 66;
            _context.prev = 67;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 69:
            _context.prev = 69;

            if (!_didIteratorError) {
              _context.next = 72;
              break;
            }

            throw _iteratorError;

          case 72:
            return _context.finish(69);

          case 73:
            return _context.finish(66);

          case 74:

            this.emit('complete', context);
            _context.next = 82;
            break;

          case 77:
            _context.prev = 77;
            _context.t4 = _context['catch'](0);

            console.log(_context.t4);
            context.error = _context.t4;
            this.emit('error', context);

          case 82:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 77], [10, 62, 66, 74], [14, 19], [26, 45, 49, 57], [31, 36], [50,, 52, 56], [67,, 69, 73]]);
  }));

  return function (_x) {
    return ref.apply(this, arguments);
  };
}());

function getSolutionStacks() {
  return new Promise(function (resolve, reject) {
    ebClient.listAvailableSolutionStacks(function (err, data) {
      if (err) reject(err);else resolve(data);
    });
  });
}

function createApplication(application) {
  return new Promise(function () {
    var _this = this;

    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var createApplicationPrompt;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _utils.Prompt)([{
                name: "continue",
                type: "confirm",
                message: 'Do you want to create application: ' + application.ApplicationName + ' ?',
                default: false
              }]);

            case 2:
              createApplicationPrompt = _context2.sent;

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

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x2, _x3) {
      return ref.apply(this, arguments);
    };
  }());
}

function createEnvironment(environment) {
  return new Promise(function () {
    var _this2 = this;

    var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var createEnvironmentPrompt;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return (0, _utils.Prompt)([{
                name: "continue",
                type: "confirm",
                message: 'Do you want to create environment: ' + environment.EnvironmentName + ' for ' + environment.ApplicationName + ' ?',
                default: false
              }]);

            case 2:
              createEnvironmentPrompt = _context3.sent;

              if (createEnvironmentPrompt.continue) {

                if (!environment.SolutionStackName) {
                  environment.SolutionStackName = pickSolutionStacks();
                }

                ebClient.createEnvironment({
                  ApplicationName: application.name,
                  EnvironmentName: environment.name,
                  Description: environment.description
                }, function (err, data) {
                  if (err) reject(err);else resolve(data);
                });
              } else {
                reject();
              }

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }));

    return function (_x4, _x5) {
      return ref.apply(this, arguments);
    };
  }());
}

var pickSolutionStacks = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var solutionStacks, picked;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getSolutionStacks();

          case 2:
            solutionStacks = _context4.sent;
            _context4.next = 5;
            return (0, _utils.Prompt)([{
              name: "name",
              type: "list",
              message: 'Select a stack: ',
              choices: solutionStacks.SolutionStacks,
              default: false
            }]);

          case 5:
            picked = _context4.sent;
            return _context4.abrupt('return', picked.name);

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function pickSolutionStacks() {
    return ref.apply(this, arguments);
  };
}();

function validateEnvironmentConfiguration(environment) {
  return new Promise(function (resolve, reject) {
    ebClient.validateConfigurationSettings(environment, function (err, data) {
      if (err) reject(err);else resolve(data);
    });
  });
}