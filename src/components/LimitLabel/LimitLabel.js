import { Component, Node } from 'mini-react';

export default class LimitLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { maxLimit, definedLimit } = this.props;

    return Node({
      tagName: 'p',
      textContent: `R$ ${maxLimit - definedLimit} disponíveis`
    });
  }
}
