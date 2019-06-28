import { CLASS } from 'shared';
import { HOST_WRAPPER, INSERT, DELETE, UPDATE } from './constants';

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

const removeFiber = (fiber, domParent) => {
  let node = fiber;

  // eslint-disable-next-line no-constant-condition
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

export { childrenReconcile, childrenClone, removeFiber };
