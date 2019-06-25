import { Component, Node } from 'mini-react';

import './LimitLabel.scss';

export default class LimitLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { maxLimit, definedLimit } = this.props;

    return Node({
      tagName: 'p',
      className: 'limit-label',
      children: [
        Node({
          tagName: 'span',
          textContent: 'R$'
        }),
        Node({
          tagName: 'strong',
          textContent: ` ${maxLimit - definedLimit}`
        }),
        Node({
          tagName: 'span',
          textContent: ',00 disponíveis'
        })
      ]
    });
  }
}
