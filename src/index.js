import App from './App';
import MiniReactDOM from 'mini-react-dom';
import { Node } from 'mini-react';

const Nu = Node({
  componentClass: App
});

MiniReactDOM.render(Nu, document.getElementById('root'));
