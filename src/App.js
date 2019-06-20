import { Component } from './component';
import { createElement } from './element';
import { LimitLabel } from './components';

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

    return createElement('div', {}, [
      createElement('h1', {}, 'Ajuste de limite'),
      createElement(
        'input',
        {
          tagName: 'input',
          type: 'text',
          value: definedLimit,
          onkeypress: e => this.setDefinedLimit(e)
        },
        []
      ),
      createElement(
        LimitLabel,
        {
          maxLimit,
          definedLimit
        },
        []
      ),
      createElement(
        'input',
        {
          type: 'range',
          min: 0,
          max: maxLimit,
          value: definedLimit,
          oninput: e => this.setDefinedLimit(e)
        },
        []
      )
    ]);
    // return Node({
    //   tagName: 'div',
    //   children: [
    //     Node({
    //       tagName: 'h1',
    //       textContent: 'Ajuste de limite'
    //     }),
    //     Node({
    //       tagName: 'input',
    //       type: 'text',
    //       value: definedLimit,
    //       onkeypress: e => this.setDefinedLimit(e)
    //     }),
    //     Node({
    //       componentClass: LimitLabel,
    //       props: {
    //         maxLimit,
    //         definedLimit
    //       }
    //     }),
    //     Node({
    //       tagName: 'input',
    //       type: 'range',
    //       min: 0,
    //       max: maxLimit,
    //       value: definedLimit,
    //       oninput: e => this.setDefinedLimit(e)
    //     })
    //   ]
    // });
  }
}
