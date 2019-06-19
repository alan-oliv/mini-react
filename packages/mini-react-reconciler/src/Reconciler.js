/* eslint-disable no-console */
import { TIME_I_NEED } from './constants';

let _queue = [];
let _nextMessage = null;
let _toCommit = null;

const reconciler = {
  getQueue: () => _queue,
  addMessage: message => {
    _queue.push(message);
  },
  consumeMessage: timeLimit => {}
};

export { reconciler };
