import {
    Activity
} from '@maysale01/flowjs';
import Debug from 'debug';

import EBWorkflow from '../../EB';

const debug = new Debug('aws-setup:workflows:activities:StartEB');

export default new Activity('Starting the EB workflow', async function (context) {
    try { 
        const workflow = EBWorkflow();

        workflow.on('success', (flowObject) => {
          debug('Flow succeeded.');
          this.emit('success', context);
        });

        workflow.on('failure', (flowObject) => {
          debug('Flow failed.');
          this.emit('failure', context);
        });

        workflow.on('error', (error, flowObject) => {
          debug('Flow encountered an error.');
          throw new Error(error);
        });

        // Will always get called
        workflow.on('complete', (flowObject) => {
          debug('Flow has finished executing.');
          this.emit('complete', context);
        });

        await workflow.start();
    } catch (e) {
        context.error = e;
        this.emit('error', context);
    }
});