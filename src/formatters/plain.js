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
  const iter = (node, path = []) => {
    const {
      type, key, value, updatedValue, children,
    } = node;
    const currentPath = [...path, key];
    const currentPathSting = currentPath.join('.');
    switch (type) {
      case 'nested':
        return children.flatMap((child) => iter(child, currentPath)).filter((x) => x !== null).join('\n');
      case 'removed':
        return `Property '${currentPathSting}' was removed`;
      case 'added':
        return `Property '${currentPathSting}' was added with value: ${makeString(value)}`;
      case 'updated':
        return `Property '${currentPathSting}' was updated. From ${makeString(value)} to ${makeString(updatedValue)}`;
      case 'unchanged':
        return null;
      default: throw new Error(`Unknown type: ${type}`);
    }
  };
  const result = nodes.map((node) => iter(node));
  return `${result.join('\n')}`;
};

export default plain;
