
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
class Component {
  constructor() {
    // eslint-disable-next-line no-console
    console.log('classe');
  }
}

const MiniReact = {
  Component
};

export { Component, MiniReact };
