/* eslint-disable no-console */
// import { NOT_ATTRIBUTES, TEXT_TYPE, FUNCTION } from './constants';
import { reconciler } from 'mini-react-reconciler';

const MiniReactDOM = {
  render: (element, container) => {
    const { addMessage } = reconciler;

    const message = {
      from: 'host',
      dom: container,
      newProps: { children: element }
    };

    addMessage(message);
    // if (element.render) element = element.render();
    // let { type = null, props = [] } = element;
    // const { children = [] } = props;
    // if (typeof type === FUNCTION) {
    //   element = new type(props).render();
    //   ({ type, props } = element);
    // }
    // const newElement =
    //   type === TEXT_TYPE
    //     ? document.createTextNode(props.textContent)
    //     : document.createElement(type);
    // Object.keys(props)
    //   .filter(name => !NOT_ATTRIBUTES.includes(name))
    //   .forEach(name => {
    //     newElement[name] = props[name];
    //   });
    // children.forEach(child => MiniReactDOM.render(child, newElement));
    // container.appendChild(newElement);
  }
};

export default MiniReactDOM;
