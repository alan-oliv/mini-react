import { Component, Node } from 'mini-react';

import LimitLabel from '../../LimitLabel';
import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      definedLimit: 2500,
      maxLimit: 5000
    };
  }

  setDefinedLimit(e) {
    this.setState(() => ({
      definedLimit: parseInt(e.target.value)
    }));
  }

  render() {
    const { maxLimit, definedLimit } = this.state;

    return Node({
      tagName: 'div',
      className: 'app',
      children: [
        Node({
          tagName: 'h1',
          textContent: 'Ajuste de limite',
          className: 'title'
        }),
        Node({
          tagName: 'input',
          type: 'number',
          value: definedLimit,
          className: 'text',
          onkeyup: e => this.setDefinedLimit(e)
        }),
        Node({
          componentClass: LimitLabel,
          props: {
            maxLimit,
            definedLimit
          }
        }),
        Node({
          tagName: 'input',
          type: 'range',
          min: 0,
          max: maxLimit,
          value: definedLimit,
          className: 'range',
          oninput: e => this.setDefinedLimit(e)
        })
      ]
    });
  }
}
