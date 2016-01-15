'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.states = undefined;
exports.decideFn = decideFn;

exports.default = function (config) {
    return new _flowjs.Flow({
        decider: new _flowjs.Decider(decideFn),
        context: new _AwsContext2.default(states, null, config)
    });
};

var _flowjs = require('@maysale01/flowjs');

var _AwsContext = require('./contexts/AwsContext');

var _AwsContext2 = _interopRequireDefault(_AwsContext);

var _ShowMenu = require('./activities/AWS/ShowMenu');

var _ShowMenu2 = _interopRequireDefault(_ShowMenu);

var _StartEB = require('./activities/AWS/StartEB');

var _StartEB2 = _interopRequireDefault(_StartEB);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = new _debug2.default('app:workflows:AWS');

/* Define our states */
var states = exports.states = {
    START: Symbol.for('START'),
    SHOW_MENU: Symbol.for('SHOW_MENU'),
    START_EB: Symbol.for('START_EB'),
    END: Symbol.for('END'),
    ABORTED: Symbol.for('ABORTED')
};

/* Map the states to the activities */
function decideFn(context) {

    switch (context.getState()) {
        case states.START:
            return _ShowMenu2.default;

        case states.SHOW_MENU:
            return _ShowMenu2.default;

        case states.START_EB:
            return _StartEB2.default;

        case states.ABORTED:
            throw new Error('Workflow aborted due to error: ' + _util2.default.inspect(context.error.stack));

        default:
            throw new Error('Invalid state: ' + _util2.default.inspect(context));
            break;
    }
};

/* Setup the workflow, 
  it's also possible to set the state directly inside the activity */
_ShowMenu2.default.on('error', function (context) {
    context.setState(context.getStates().ABORTED);
});

_StartEB2.default.on('complete', function (context) {
    context.setState(context.getStates().SHOW_MENU);
}).on('error', function (context) {
    context.setState(context.getStates().ABORTED);
});

;