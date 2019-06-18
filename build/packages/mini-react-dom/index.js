
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (l, i, v, e) {
  v = l.createElement(i);
  v.async = 1;
  v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1';
  e = l.getElementsByTagName(i)[0];
  e.parentNode.insertBefore(v, e);
})(document, 'script');
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

/* eslint-disable no-console */
var MiniReactDOM = {
  render: function render(element, container) {
    var addMessage = reconciler.addMessage;
    var message = {
      from: 'host',
      dom: container,
      newProps: {
        children: element
      }
    };
    addMessage(message); // if (element.render) element = element.render();
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
