
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
/* eslint-disable no-console */
const MiniReactDOM = {
  render: (element, container) => {
    console.log('teste', element, container);
  }
};

export default MiniReactDOM;
