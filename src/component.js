import { scheduleUpdate } from './reconciler';

export class Component {
  constructor(props) {
    this.props = props || {};
    this.state = this.state || {};
  }

  setState(partialState) {
    scheduleUpdate(this, partialState());
  }
}
