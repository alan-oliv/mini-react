import { reconciler } from 'mini-react-reconciler';

export default class Component {
  constructor(props = null) {
    if (props) {
      this.props = props;
      this.state = this.state || {};
    }
  }

  setState(newState) {
    const { addMessage } = reconciler;

    const message = {
      from: 'class',
      instance: this,
      state: newState()
    };

    addMessage(message);

    // const state = newState();
    // this.state = Object.assign(this.state, state);
  }
}
