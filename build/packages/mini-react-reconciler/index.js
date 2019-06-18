
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var HOST_COMPONENT = 'host';
var CLASS_COMPONENT = 'class';

/* eslint-disable no-console */
var reconciler = {
  queue: [],
  nextMessage: null,
  addMessage: function addMessage(message) {
    var queue = reconciler.queue;
    queue.push(message);
    console.log('addMessage: ', message, queue);
  },
  consumeMessage: function consumeMessage(timeLimit) {
    console.log('consumeMessage: ', timeLimit);
  }
};

var MiniReactFiber = {
  reconciler: reconciler
};

export { CLASS_COMPONENT, HOST_COMPONENT, MiniReactFiber, reconciler };
