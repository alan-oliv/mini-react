import { addMessage, setRenderer } from 'mini-react-reconciler';
import { HOST_ROOT } from 'shared';
import { TEXT_ELEMENT } from './constants';

const isEvent = name => name.startsWith('on');
const isAttribute = name =>
  !isEvent(name) && name != 'children' && name != 'style';
const isNew = (prev, next) => key => prev[key] !== next[key];
const isGone = (prev, next) => key => !(key in next);

const MiniReactDOM = {
  render: (element, container) => {
    setRenderer(MiniReactDOM);

    const message = {
      from: HOST_ROOT,
      dom: container,
      newProps: { children: element }
    };

    addMessage(message);
  },
  updateDomProperties: (dom, prevProps, nextProps) => {
    Object.keys(prevProps)
      .filter(isEvent)
      .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        !dom.props && dom.removeEventListener(eventType, prevProps[name]);
      });

    Object.keys(prevProps)
      .filter(isAttribute)
      .filter(isGone(prevProps, nextProps))
      .forEach(name => {
        dom[name] = null;
      });

    Object.keys(nextProps)
      .filter(isAttribute)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        dom[name] = nextProps[name];
      });

    prevProps.style = prevProps.style || {};
    nextProps.style = nextProps.style || {};

    Object.keys(nextProps.style)
      .filter(isNew(prevProps.style, nextProps.style))
      .forEach(key => {
        dom.style[key] = nextProps.style[key];
      });

    Object.keys(prevProps.style)
      .filter(isGone(prevProps.style, nextProps.style))
      .forEach(key => {
        dom.style[key] = '';
      });

    Object.keys(nextProps)
      .filter(isEvent)
      .filter(isNew(prevProps, nextProps))
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        !dom.props && dom.addEventListener(eventType, nextProps[name]);
      });
  },
  createDomElement: fiber => {
    const isTextElement = fiber.type === TEXT_ELEMENT;

    const dom = isTextElement
      ? document.createTextNode('')
      : document.createElement(fiber.type);

    MiniReactDOM.updateDomProperties(dom, [], fiber.props);

    return dom;
  }
};
export default MiniReactDOM;
