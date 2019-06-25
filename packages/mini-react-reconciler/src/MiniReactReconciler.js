import { ROOT_WRAPPER, CLASS } from 'shared';
import { instantiate, findRoot } from './MiniReactFiber';
import { HOST_WRAPPER, INSERT, DELETE, UPDATE, THREAD_TIME } from './constants';

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
    commitAllWork(_pending);
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
      wipTree.stateNode = _renderer.createDomElement(wipTree);
    }

    const newChildElements = wipTree.props.children;
    childrenReconcile(wipTree, newChildElements);
  }

  if (wipTree.child) {
    return wipTree.child;
  }

  let uow = wipTree;
  while (uow) {
    completeWork(uow);

    if (uow.sibling) {
      return uow.sibling;
    }

    uow = uow.parent;
  }
};

const childrenReconcile = (wipTree, newChildElements) => {
  const elements = [].concat(newChildElements);
  let index = 0;
  let oldFiber = wipTree.alternate ? wipTree.alternate.child : null;
  let newFiber = null;

  while (index < elements.length || oldFiber != null) {
    const prevFiber = newFiber;
    const element = index < elements.length && elements[index];
    const sameType = oldFiber && element && element.type == oldFiber.type;

    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        tag: oldFiber.tag,
        stateNode: oldFiber.stateNode,
        props: element.props,
        parent: wipTree,
        alternate: oldFiber,
        partialState: oldFiber.partialState,
        effectTag: UPDATE
      };
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        tag: typeof element.type === 'string' ? HOST_WRAPPER : CLASS,
        props: element.props,
        parent: wipTree,
        effectTag: INSERT
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = DELETE;
      wipTree.effects = wipTree.effects || [];
      wipTree.effects.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index == 0) {
      wipTree.child = newFiber;
    } else if (prevFiber && element) {
      prevFiber.sibling = newFiber;
    }

    index++;
  }
};

const childrenClone = parentFiber => {
  const oldFiber = parentFiber.alternate;

  if (!oldFiber.child) {
    return;
  }

  let oldChild = oldFiber.child;
  let prevChild = null;
  while (oldChild) {
    const newChild = {
      type: oldChild.type,
      tag: oldChild.tag,
      stateNode: oldChild.stateNode,
      props: oldChild.props,
      partialState: oldChild.partialState,
      alternate: oldChild,
      parent: parentFiber
    };
    if (prevChild) {
      prevChild.sibling = newChild;
    } else {
      parentFiber.child = newChild;
    }
    prevChild = newChild;
    oldChild = oldChild.sibling;
  }
};

const completeWork = fiber => {
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

const commitAllWork = fiber => {
  fiber.effects.forEach(f => {
    commitWork(f);
  });
  fiber.stateNode._rootContainerFiber = fiber;
  _nextMessage = null;
  _pending = null;
};

const commitWork = fiber => {
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
    _renderer.updateDomProperties(
      fiber.stateNode,
      fiber.alternate.props,
      fiber.props
    );
  } else if (fiber.effectTag == DELETE) {
    removeFiber(fiber, domParent);
  }
};

const removeFiber = (fiber, domParent) => {
  let node = fiber;

  while (true) {
    if (node.tag == CLASS) {
      node = node.child;
      continue;
    }

    domParent.removeChild(node.stateNode);

    while (node != fiber && !node.sibling) {
      node = node.parent;
    }

    if (node == fiber) {
      return;
    }

    node = node.sibling;
  }
};

export { addMessage, setRenderer };
