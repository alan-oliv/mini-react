import { Component, Node } from 'mini-react';
import MiniReactDOM from 'mini-react-dom';

const time = {
  timeRemaining: () => 1000
};
const { render } = MiniReactDOM;
let root;

// eslint-disable-next-line no-undef
global['requestIdleCallback'] = function requestIdleCallback(fn) {
  fn(time);
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1000
    };
  }

  subtract() {
    this.setState(() => ({
      count: this.state.count - 1
    }));
  }

  render() {
    const { count } = this.state;

    return Node({
      tagName: 'button',
      onclick: () => this.subtract(),
      textContent: `count: ${count}`
    });
  }
}

const click = dom => {
  var evt = document.createEvent('MouseEvent');
  evt.initEvent('click', false, true);
  dom.dispatchEvent(evt);
};

beforeEach(() => {
  root = document.getElementById('root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }
});

describe('reconciler', () => {
  describe('render', () => {
    it('should render component', () => {
      render(Node({ componentClass: App }), root);

      expect(root.innerHTML).toBe('<button>count: 1000</button>');
    });

    it('should change add 1 to state on click', () => {
      render(Node({ componentClass: App }), root);

      expect(root.innerHTML).toBe('<button>count: 1000</button>');
      click(root.firstChild);
      expect(root.innerHTML).toBe('<button>count: 999</button>');
    });
  });
});
