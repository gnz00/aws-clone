import {
    Flow,
    Decider
} from "@maysale01/flowjs";

import AwsContext from './contexts/AwsContext';

import CreateApplications from './activities/EB/CreateApplications';
import CreateConfig from './activities/EB/CreateConfig';
import ShowMenu from './activities/EB/ShowMenu';

import Debug from 'debug';
import util from 'util';

const debug = new Debug('app:workflows:EB');

/* Define our states */
export const states = {
    START: Symbol.for('START'),
    SHOW_MENU: Symbol.for('SHOW_MENU'),
    CREATE_APPLICATIONS: Symbol.for('CREATE_APPLICATIONS'),
    CREATE_CONFIG: Symbol.for('CREATE_CONFIG'),
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

        case states.CREATE_APPLICATIONS: 
            return CreateApplications;

        case states.CREATE_CONFIG: 
            return CreateConfig;

        case states.ABORTED:
            throw new Error(`Workflow aborted due to error: ${util.inspect(context.error.stack)}`);

        default:
            throw new Error(`Invalid state: ${util.inspect(context)}`);
            break;
    }
};

/* Setup the workflow, 
  it's also possible to set the state directly inside the activity */
CreateApplications
    .on('complete', (context) => {
        context.setState(context.getStates().SHOW_MENU);
    })
    .on('error', (context) => {
        context.setState(context.getStates().ABORTED);
    });
ShowMenu
    .on('error', (context) => {
        context.setState(context.getStates().ABORTED);
    });
CreateConfig
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