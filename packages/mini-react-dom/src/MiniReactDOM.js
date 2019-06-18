/* eslint-disable no-console */
import { NOT_ATTRIBUTES, TEXT_TYPE, FUNCTION } from './constants';

const MiniReactDOM = {
  render: (element, container) => {
    if (element.render) element = element.render();

    let { type = null, props = [] } = element;
    const { children = [] } = props;

    if (typeof type === FUNCTION) {
      element = new type(props).render();
      ({ type, props } = element);
    }

    const newElement =
      type === TEXT_TYPE
        ? document.createTextNode(props.textContent)
        : document.createElement(type);

    Object.keys(props)
      .filter(name => !NOT_ATTRIBUTES.includes(name))
      .forEach(name => {
        newElement[name] = props[name];
      });

    children.forEach(child => MiniReactDOM.render(child, newElement));

    container.appendChild(newElement);
  }
};

export default MiniReactDOM;
