import _ from 'lodash';

const symbols = {
  unchanged: ' ',
  removed: '-',
  added: '+',
};

const setIndent = (depth, str = ' ') => str.repeat(depth * 4 - 2);

const getString = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = _.keys(value);
  const result = keys.map((key) => {
    const nestedKey = value[key];
    if (!_.has(value, key)) {
      return null;
    }
    return `${setIndent(depth + 1)}  ${key}: ${getString(nestedKey, depth + 1)}`;
  });
  return `{\n${result.filter((item) => item !== null).join('\n')}\n  ${setIndent(depth)}}`;
};

const stylish = (obj) => {
  const iter = (node, depth = 1) => {
    const {
      type, key, value, children,
    } = node;
    switch (type) {
      case 'removed':
      case 'added':
      case 'unchanged':
        return `${setIndent(depth)}${symbols[type]} ${key}: ${getString(value, depth)}`;
      case 'updated':
        return `${setIndent(depth)}${symbols.removed} ${key}: ${getString(value[0], depth)}\n${setIndent(depth)}${symbols.added} ${key}: ${getString(value[1], depth)}`;
      case 'nested': {
        const objectResult = children.flatMap((child) => iter(child, depth + 1));
        return `${setIndent(depth)}  ${key}: {\n${objectResult.join('\n')}\n${setIndent(depth)}  }`;
      }
      default: throw new Error(`Unknown type: ${type}`);
    }
  };
  const result = obj.map((item) => iter(item));
  return `{\n${result.join('\n')}\n}`;
};

export default stylish;
