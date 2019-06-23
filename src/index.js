import App from './App';
import { render } from './didact';
import { Node } from 'mini-react';

const element = Node({
  componentClass: App,
  props: {}
});

render(element, document.getElementById('root'));
