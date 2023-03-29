import _ from 'lodash';

const makeString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const plain = (nodes) => {
  const iter = (node, parent = '') => {
    const {
      type, key, value, oldValue, children,
    } = node;
    const currentKey = parent ? `${parent}.${key}` : key;
    switch (type) {
      case 'nested':
        return children.flatMap((child) => iter(child, currentKey)).join('\n');
      case 'removed':
        return `Property '${currentKey}' was removed`;
      case 'added':
        return `Property '${currentKey}' was added with value: ${makeString(value)}`;
      case 'updated':
        return `Property '${currentKey}' was updated. From ${makeString(oldValue)} to ${makeString(value)}`;
      case 'unchanged':
        return null;
      default: throw new Error(`Unknown type: ${type}`);
    }
  };
  const result = nodes.map((node) => iter(node));
  return `${result.join('\n')}`;
};

export default plain;

