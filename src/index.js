import App from './App';
import { render, createElement } from './didact';

const element = createElement(App, {});
render(element, document.getElementById('root'));
