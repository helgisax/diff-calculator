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

const getPropertyName = (property, parents) => [...parents, property].join('.');

const plain = (nodes) => {
  const iter = (node, path = []) => {
    const { type, key } = node;
    const currentPath = [...path, key];
    const currentPathString = getPropertyName(key, path);
    switch (type) {
      case 'nested': {
        const { children } = node;
        return children.flatMap((child) => iter(child, currentPath)).filter((x) => x !== null).join('\n');
      }
      case 'removed':
        return `Property '${currentPathString}' was removed`;
      case 'added': {
        const { value } = node;
        return `Property '${currentPathString}' was added with value: ${makeString(value)}`;
      }
      case 'updated': {
        const { value } = node;
        return `Property '${currentPathString}' was updated. From ${makeString(value[0])} to ${makeString(value[1])}`;
      }
      case 'unchanged':
        return null;
      default: throw new Error(`Unknown type: ${type}`);
    }
  };
  const result = nodes.map((node) => iter(node)).filter((x) => x !== null);
  return result.join('\n');
};

export default plain;
