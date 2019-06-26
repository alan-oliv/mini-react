import { addMessage } from 'mini-react-reconciler';
import { CLASS } from 'shared';

export default class Component {
  constructor(props) {
    this.props = props ? props : {};
    this.state = this.state ? this.state : {};
  }

  setState(state) {
    const newState = typeof state === 'function' ? state() : state;

    const message = {
      from: CLASS,
      instance: this,
      partialState: newState
    };

    addMessage(message);
  }
}
