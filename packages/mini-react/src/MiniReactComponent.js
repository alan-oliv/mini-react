import { reconciler } from 'mini-react-reconciler';

export default class Component {
  constructor(props = null) {
    if (props) {
      this.props = props;
      this.state = this.state || {};
    }
  }

  setState(newState) {
    this.state = Object.assign(this.state, newState());
    reconciler();
  }
}
