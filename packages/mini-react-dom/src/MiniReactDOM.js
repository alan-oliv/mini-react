import { addMessage, setRenderer } from 'mini-react-reconciler';
import { inserted, deleted, event, attribute } from './MiniReactCheck';
import { ROOT_WRAPPER } from 'shared';
import { TEXT_ELEMENT } from './constants';

const MiniReactDOM = {
  render: (element, container) => {
    setRenderer(MiniReactDOM);

    const message = {
      from: ROOT_WRAPPER,
      dom: container,
      newProps: { children: element }
    };

    addMessage(message);
  },
  createElement: el => {
    const text = el.type === TEXT_ELEMENT;

    const dom = text
      ? document.createTextNode('')
      : document.createElement(el.type);

    MiniReactDOM.propsUpdate(dom, [], el.props);

    return dom;
  },
  propsUpdate: (dom, previous, next) => {
    previous &&
      Object.keys(previous)
        .filter(attribute)
        .filter(deleted(previous, next))
        .forEach(name => {
          dom[name] = null;
        });

    previous &&
      Object.keys(previous)
        .filter(event)
        .filter(key => !(key in next) || inserted(previous, next)(key))
        .forEach(name => {
          const eventType = name.toLowerCase().substring(2);
          !dom.props && dom.removeEventListener(eventType, previous[name]);
        });

    next &&
      Object.keys(next)
        .filter(attribute)
        .filter(inserted(previous, next))
        .forEach(name => {
          dom[name] = next[name];
        });

    previous && (previous.style = previous.style || {});
    next && (next.style = next.style || {});

    next &&
      Object.keys(next.style)
        .filter(inserted(previous.style, next.style))
        .forEach(key => {
          dom.style[key] = next.style[key];
        });

    previous &&
      next &&
      Object.keys(previous.style)
        .filter(deleted(previous.style, next.style))
        .forEach(key => {
          dom.style[key] = '';
        });

    previous &&
      next &&
      Object.keys(next)
        .filter(event)
        .filter(inserted(previous, next))
        .forEach(name => {
          const eventType = name.toLowerCase().substring(2);
          !dom.props && dom.addEventListener(eventType, next[name]);
        });
  }
};

export default MiniReactDOM;
