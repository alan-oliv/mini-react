import { Component, Node } from 'mini-react';

import './LimitRange.scss';

export default class LimitRange extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { maxLimit, definedLimit, oninput } = this.props;
    const percentage = (definedLimit * 100) / maxLimit;

    return Node({
      tagName: 'div',
      className: 'range',
      children: [
        Node({
          tagName: 'div',
          className: 'fill',
          style: {
            width: `${
              percentage < 25 ? `calc(${percentage}% + 30px)` : `${percentage}%`
            }`
          }
        }),
        Node({
          tagName: 'input',
          type: 'range',
          min: 0,
          max: maxLimit,
          value: definedLimit,
          step: '100',
          oninput: oninput
        }),
        Node({
          tagName: 'div',
          className: 'limit',
          children: [
            Node({
              tagName: 'span',
              textContent: '0'
            }),
            Node({
              tagName: 'span',
              textContent: `${maxLimit}`
            })
          ]
        })
      ]
    });
  }
}
