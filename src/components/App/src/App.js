import MiniReact from 'mini-react';
import { Component, Node } from 'mini-react';

import LimitInput from '../../LimitInput';
import LimitLabel from '../../LimitLabel';
import LimitRange from '../../LimitRange';
import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      definedLimit: 2500,
      maxLimit: 5000
    };
  }

  setDefinedLimit(e) {
    this.setState(() => ({
      definedLimit: parseInt(e.target.value)
    }));
  }

  render() {
    const { maxLimit, definedLimit } = this.state;

    return <div>teste</div>;
  }
}
