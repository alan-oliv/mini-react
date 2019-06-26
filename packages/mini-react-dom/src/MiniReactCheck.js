const inserted = (prev, next) => key => prev[key] !== next[key];

const deleted = (prev, next) => key => !(key in next);

const event = name => name.startsWith('on');

const attribute = name => !event(name) && name != 'children' && name != 'style';

export { inserted, deleted, event, attribute };
