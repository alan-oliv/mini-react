import { addMessage } from 'mini-react-reconciler';
const CLASS_COMPONENT = 'class';

export default class Component {
  constructor(props = null) {
    this.props = props ? props : {};
    this.state = this.state ? this.state : {};
  }

  setState(newState) {
    const message = {
      from: CLASS_COMPONENT,
      instance: this,
      partialState: newState()
    };

    addMessage(message);
  }
}
