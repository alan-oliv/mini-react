export default ({ tagName, props = {}, componentClass, ...rest }) => {
  const type = tagName ? tagName : componentClass;
  Object.assign(props, rest);

  return { type, props };
};
