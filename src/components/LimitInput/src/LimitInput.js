import { Component, Node } from 'mini-react';

import './LimitInput.scss';

export default class LimitInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { definedLimit, onkeyup } = this.props;
    const width = definedLimit.toString().length * 28;

    const component = Node({
      tagName: 'div',
      className: 'input-wrapper',
      children: [
        Node({
          tagName: 'span',
          textContent: 'R$'
        }),
        Node({
          tagName: 'input',
          type: 'number',
          value: definedLimit,
          className: 'text',
          style: { width: `${width}px` },
          onkeyup: onkeyup
        }),
        Node({
          tagName: 'span',
          textContent: ',00'
        })
      ]
    });

    return component;
  }
}
