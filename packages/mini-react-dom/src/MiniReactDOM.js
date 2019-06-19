/* eslint-disable no-console */
// import { NOT_ATTRIBUTES, TEXT_TYPE, FUNCTION } from './constants';
import { reconciler } from 'mini-react-reconciler';

const MiniReactDOM = {
  render: (element, container) => {
    if (element.render) element = element.render();

    const { addMessage } = reconciler;

    const message = {
      from: 'host',
      dom: container,
      newProps: { children: element }
    };

    addMessage(message);
  }
};

export default MiniReactDOM;
