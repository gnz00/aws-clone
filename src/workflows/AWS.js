import {
    Flow,
    Decider
} from "@maysale01/flowjs";

import AwsContext from './contexts/AwsContext';

import ShowMenu from './activities/AWS/ShowMenu';
import StartEB from './activities/AWS/StartEB';

import Debug from 'debug';
import util from 'util';

const debug = new Debug('app:workflows:AWS');

/* Define our states */
export const states = {
    START: Symbol.for('START'),
    SHOW_MENU: Symbol.for('SHOW_MENU'),
    START_EB: Symbol.for('START_EB'),
    END: Symbol.for('END'),
    ABORTED: Symbol.for('ABORTED')
};

/* Map the states to the activities */
export function decideFn(context) {

    switch (context.getState()) {
        case states.START: 
            return ShowMenu;

        case states.SHOW_MENU: 
            return ShowMenu;

        case states.START_EB: 
            return StartEB;

        case states.ABORTED:
            throw new Error(`Workflow aborted due to error: ${util.inspect(context.error.stack)}`);

        default:
            throw new Error(`Invalid state: ${util.inspect(context)}`);
            break;
    }
};

/* Setup the workflow, 
  it's also possible to set the state directly inside the activity */
ShowMenu
    .on('error', (context) => {
        context.setState(context.getStates().ABORTED);
    });

StartEB
    .on('complete', (context) => {
        context.setState(context.getStates().SHOW_MENU);
    })
    .on('error', (context) => {
        context.setState(context.getStates().ABORTED);
    });

export default function (config) {
    return new Flow({
        decider: new Decider(decideFn),
        context: new AwsContext(states, null, config)
    });
};