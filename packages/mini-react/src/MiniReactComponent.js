import { addMessage } from 'mini-react-reconciler';
import { CLASS_COMPONENT } from 'shared';

export default class Component {
  constructor(props = null) {
    this.props = props ? props : {};
    this.state = this.state ? this.state : {};
  }

  setState(state) {
    const message = {
      from: CLASS_COMPONENT,
      instance: this,
      partialState: state()
    };

    addMessage(message);
  }
}
