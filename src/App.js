import { Component } from 'mini-react';
import { LimitLabel } from './components/';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      definedLimit: 2500,
      maxLimit: 5000
    };
  }

  setDefinedLimit(e) {
    this.setState(prevState => ({
      definedLimit: parseInt(e.target.value)
    }));
  }

  render() {
    const { maxLimit, definedLimit } = this.state;

    return node({
      tagName: 'div',
      children: [
        node({
          tagName: 'h1',
          textContent: 'Ajuste de limite'
        }),
        node({
          tagName: 'input',
          type: 'text',
          value: definedLimit,
          onchange: e => this.setDefinedLimit(e)
        }),
        node({
          componentClass: LimitLabel,
          props: {
            maxLimit,
            definedLimit
          }
        }),
        node({
          tagName: 'input',
          type: 'range',
          min: 0,
          max: maxLimit,
          value: definedLimit,
          onchange: e => this.setDefinedLimit(e)
        })
      ]
    });
  }
}
