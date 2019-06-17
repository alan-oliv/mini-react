
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var FORBIDDEN_ATTRIBUTES = ['children'];
var TEXT_TYPE = 'textContent';

/* eslint-disable no-console */
var MiniReactDOM = {
  render: function render(element, container) {
    if (element.render) element = element.render();
    var _element = element,
        _element$type = _element.type,
        type = _element$type === void 0 ? null : _element$type,
        _element$props = _element.props,
        props = _element$props === void 0 ? [] : _element$props;
    var _props = props,
        _props$children = _props.children,
        children = _props$children === void 0 ? [] : _props$children;

    if (typeof type == 'function') {
      element = new type(props).render();
      var _element2 = element;
      type = _element2.type;
      props = _element2.props;
    }

    var newElement = type === TEXT_TYPE ? document.createTextNode(props.textContent) : document.createElement(type);
    Object.keys(props).filter(function (name) {
      return !FORBIDDEN_ATTRIBUTES.includes(name);
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
