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
      textContent: `R$ ${maxLimit - definedLimit} disponíveis`
    });
  }
}
