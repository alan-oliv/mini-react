
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var NOT_ATTRIBUTES = ['children'];
var TEXT_TYPE = 'textContent';
var FUNCTION = 'function';

(function (l, i, v, e) {
  v = l.createElement(i);
  v.async = 1;
  v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1';
  e = l.getElementsByTagName(i)[0];
  e.parentNode.insertBefore(v, e);
})(document, 'script');
/* eslint-disable no-console */

var _queue = [];
var reconciler = {
  getQueue: function getQueue() {
    return _queue;
  },
  nextMessage: null,
  addMessage: function addMessage(message) {
    _queue.push(message); // console.log('addMessage: ', message, _queue);

  },
  consumeMessage: function consumeMessage(timeLimit) {// console.log('consumeMessage: ', timeLimit);
  }
};

var MiniReactDOM = {
  render: function render(element, container) {
    var addMessage = reconciler.addMessage,
        getQueue = reconciler.getQueue;
    var message = {
      from: 'host',
      dom: container,
      newProps: {
        children: element
      }
    };
    addMessage(message);
    console.log(getQueue());
    if (element.render) element = element.render();
    var _element = element,
        _element$type = _element.type,
        type = _element$type === void 0 ? null : _element$type,
        _element$props = _element.props,
        props = _element$props === void 0 ? [] : _element$props;
    var _props = props,
        _props$children = _props.children,
        children = _props$children === void 0 ? [] : _props$children;

    if (_typeof(type) === FUNCTION) {
      element = new type(props).render();
      var _element2 = element;
      type = _element2.type;
      props = _element2.props;
    }

    var newElement = type === TEXT_TYPE ? document.createTextNode(props.textContent) : document.createElement(type);
    Object.keys(props).filter(function (name) {
      return !NOT_ATTRIBUTES.includes(name);
    }).forEach(function (name) {
      newElement[name] = props[name];
    });
    children.forEach(function (child) {
      return MiniReactDOM.render(child, newElement);
    });
    container.appendChild(newElement);
  }
};

export default MiniReactDOM;
