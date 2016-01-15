'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flowjs = require('@maysale01/flowjs');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _EB = require('../../EB');

var _EB2 = _interopRequireDefault(_EB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

var debug = new _debug2.default('aws-setup:workflows:activities:StartEB');

exports.default = new _flowjs.Activity('Starting the EB workflow', function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(context) {
    var _this = this;

    var workflow;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            workflow = (0, _EB2.default)();

            workflow.on('success', function (flowObject) {
              debug('Flow succeeded.');
              _this.emit('success', context);
            });

            workflow.on('failure', function (flowObject) {
              debug('Flow failed.');
              _this.emit('failure', context);
            });

            workflow.on('error', function (error, flowObject) {
              debug('Flow encountered an error.');
              throw new Error(error);
            });

            // Will always get called
            workflow.on('complete', function (flowObject) {
              debug('Flow has finished executing.');
              _this.emit('complete', context);
            });

            _context.next = 8;
            return workflow.start();

          case 8:
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            context.error = _context.t0;
            this.emit('error', context);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function (_x) {
    return ref.apply(this, arguments);
  };
}());