import {
  FlowContext
} from "@maysale01/flowjs";

export default class AwsContext extends FlowContext {
    constructor(states, store) {
        super(states);
        this.setStore(store);
    }

    setStore(store) {
        this.store = Object.assign({}, store);
    }
}