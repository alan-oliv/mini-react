const instantiate = fiber => {
  const instance = new fiber.type(fiber.props);
  instance.__fiber = fiber;
  return instance;
};

const findRoot = fiber => {
  let node = fiber;

  while (node.parent) {
    node = node.parent;
  }
  return node;
};

export { instantiate, findRoot };
