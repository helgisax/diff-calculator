import _ from 'lodash';

const mknode = (key, type, value, value2 = null) => {
  if (type === 'updated') {
    return { key, type, value: [value, value2] };
  }
  return { key, value, type };
};

const getDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const nodes = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return mknode(key, obj2[key], 'added');
    }

    if (!_.has(obj2, key)) {
      return mknode(key, obj1[key], 'removed');
    }

    const [value1, value2] = [obj1[key], obj2[key]];
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'nested',
        key,
        children: getDiff(value1, value2),
      };
    }

    if (value1 !== value2) {
      return mknode(key, value1, 'updated', value2);
    }

    return mknode(key, value1, 'unchanged');
  });

  return nodes;
};

export default getDiff;
