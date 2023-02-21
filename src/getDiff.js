import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const mknode = (key, value, type, oldValue = null) => ({ 
    key,
    value,
    type,
    oldValue
  });
  
  const nodes = keys.map((key) => {
    const [value1, value2] = [obj1[key], obj2[key]];
    if (!_.has(obj1, key)) {
      return mknode(key, value2, 'added');
    } if (!_.has(obj2, key)) {
      return mknode(key, value1, 'removed');
    } if (obj1[key] !== obj2[key]) {
      return mknode(key, value2, 'updated', value1);
    } 
    
    return mknode(key, value1, 'unchanged');
  })
  return nodes;
};

export default getDiff;





