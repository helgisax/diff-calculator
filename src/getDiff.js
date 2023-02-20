import _ from 'lodash';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';

const getDiff = (filepath1, filepath2) => { 
  const file1 = readFileSync(resolve(cwd(), (filepath1)), 'utf-8');
  const file2 = readFileSync(resolve(cwd(), (filepath2)), 'utf-8');

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const keys = _.union(_.keys(obj1), _.keys(obj2));
  
  const difObj = {};
    for (const key of keys) {
      if (!_.has(obj1, key)) {
        difObj[key] = 'added';
      } else if (!_.has(obj2, key)) {
        difObj[key] = 'deleted';
      } else if (obj1[key] !== obj2[key]) {
        difObj[key] = 'changed';
      } else {
        difObj[key] = 'unchanged';
      }
    }
    return difObj;
};
export default getDiff;





