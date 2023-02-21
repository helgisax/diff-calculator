import _ from 'lodash';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';

const getDiff = (filepath1, filepath2) => { 
  const file1 = readFileSync(resolve(cwd(), (filepath1)), 'utf-8');
  const file2 = readFileSync(resolve(cwd(), (filepath2)), 'utf-8');

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const keysValues1 = Object.entries(obj1);
  const keysValues2 = Object.entries(obj2);
  const keysValues = _.union(keysValues1, keysValues2);
  //const keys = _.union(_.keys(obj1), _.keys(obj2));
  
  const difObj = {};
    for (const [key, value] of keysValues) {
      if (!_.has(obj1, key)) {
        difObj[key] = `+ ${value}`;
      } else if (!_.has(obj2, key)) {
        difObj[key] = `- ${value}`;
      } else if (obj1[key] !== obj2[key]) {
        difObj[key] = `changed? ${value}`;  // не очень понимаю как оформить логику, когда ключ есть в обоих объектах, но значения разные и нужно написать две строчки подряд, одну с +, а вторую с -.
      } else {
        difObj[key] = `  ${value}`;
      }
    }
    return difObj;
};
export default getDiff;





