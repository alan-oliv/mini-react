import { ROOT_WRAPPER, CLASS } from 'shared';
import { HOST_WRAPPER, INSERT, DELETE, UPDATE, THREAD_TIME } from './constants';
import { instantiate, findRoot } from './MiniReactReconcilerHelper';
import {
  childrenReconcile,
  childrenClone,
  removeFiber
} from './MiniReactReconciler';

let _renderer = null;
let _queue = [];
let _nextMessage = null;
let _pending = null;

const setRenderer = renderer => (_renderer = renderer);

const addMessage = message => {
  _queue.push(message);

  requestIdleCallback(initConsumer);
};

const initConsumer = time => {
  consumeQueue(time);

  if (_nextMessage || _queue.length > 0) {
    requestIdleCallback(initConsumer);
  }
};

const consumeQueue = time => {
  !_nextMessage && setNextMessage();

  while (_nextMessage && time.timeRemaining() > THREAD_TIME) {
    _nextMessage = consumeMessage(_nextMessage);
  }

  if (_pending) {
    pushAll(_pending);
  }
};

const setNextMessage = () => {
  const changes = _queue.shift();

  if (!changes) {
    return;
  }

  const { instance, partialState, dom, newProps, from } = changes;

  if (partialState) {
    instance.__fiber.partialState = partialState;
  }

  const root =
    from == ROOT_WRAPPER ? dom._rootContainerFiber : findRoot(instance.__fiber);

  _nextMessage = {
    tag: ROOT_WRAPPER,
    stateNode: dom || root.stateNode,
    props: newProps || root.props,
    alternate: root
  };
};

const consumeMessage = wipTree => {
  if (wipTree.tag == CLASS) {
    let instance = wipTree.stateNode;

    if (instance == null) {
      instance = wipTree.stateNode = instantiate(wipTree);
    } else if (wipTree.props == instance.props && !wipTree.partialState) {
      childrenClone(wipTree);
      return;
    }

    instance.props = wipTree.props;
    instance.state = Object.assign({}, instance.state, wipTree.partialState);
    wipTree.partialState = null;

    const newChildElements = wipTree.stateNode.render();
    childrenReconcile(wipTree, newChildElements);
  } else {
    if (!wipTree.stateNode) {
      wipTree.stateNode = _renderer.createElement(wipTree);
    }

    const newChildElements = wipTree.props.children;
    childrenReconcile(wipTree, newChildElements);
  }

  if (wipTree.child) {
    return wipTree.child;
  }

  let uow = wipTree;
  while (uow) {
    threadDone(uow);

    if (uow.sibling) {
      return uow.sibling;
    }

    uow = uow.parent;
  }
};

const threadDone = fiber => {
  if (fiber.tag == CLASS) {
    fiber.stateNode.__fiber = fiber;
  }

  if (fiber.parent) {
    const childEffects = fiber.effects || [];
    const thisEffect = fiber.effectTag != null ? [fiber] : [];
    const parentEffects = fiber.parent.effects || [];
    fiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
  } else {
    _pending = fiber;
  }
};

const pushAll = fiber => {
  fiber.effects.forEach(f => {
    pushOne(f);
  });
  fiber.stateNode._rootContainerFiber = fiber;
  _nextMessage = null;
  _pending = null;
};

const pushOne = fiber => {
  if (fiber.tag == ROOT_WRAPPER) {
    return;
  }

  let domParentFiber = fiber.parent;
  while (domParentFiber.tag == CLASS) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.stateNode;

  if (fiber.effectTag == INSERT && fiber.tag == HOST_WRAPPER) {
    domParent.appendChild(fiber.stateNode);
  } else if (fiber.effectTag == UPDATE) {
    _renderer.propsUpdate(fiber.stateNode, fiber.alternate.props, fiber.props);
  } else if (fiber.effectTag == DELETE) {
    removeFiber(fiber, domParent);
  }
};

export { addMessage, setRenderer };
