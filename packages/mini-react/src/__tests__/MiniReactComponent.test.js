import { Component } from 'mini-react';
import { addMessage } from 'mini-react-reconciler';

jest.mock('mini-react-reconciler');

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newState: 'test-one'
    };
  }

  render() {
    this.setState({ newState: 'test-two' });
  }
}

describe('Component', () => {
  it('should add a message to fiber queue', () => {
    const component = new Test();
    component.render();

    expect(addMessage).toHaveBeenCalledTimes(1);
  });
});
