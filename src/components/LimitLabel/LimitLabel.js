export default class LimitLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { maxLimit, definedLimit } = this.props;

    return node({
      tagName: 'p',
      textContent: `R$ ${maxLimit - definedLimit} disponíveis`
    });
  }
}
