/* eslint-disable no-console */
import { TIME_I_NEED } from './constants';

const reconciler = {
  queue: [],
  nextMessage: null,
  addMessage: message => {
    const { queue } = reconciler;

    queue.push(message);
    console.log('addMessage: ', message, queue);
  },
  consumeMessage: timeLimit => {
    console.log('consumeMessage: ', timeLimit);
  }
};

export { reconciler };
