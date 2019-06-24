import MiniReact from 'mini-react';
import MiniReactDOM from 'mini-react-dom';

import App from './components/App';
import './index.scss';

const Nu = MiniReact.Node({
  componentClass: App
});

MiniReactDOM.render(Nu, document.getElementById('root'));
