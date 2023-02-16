import _ from 'lodash';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';

const getDiff = (filepath1, filepath2) => { 
  const file1 = readFileSync(resolve(cwd(), (filepath1)), 'utf-8');
  const file2 = readFileSync(resolve(cwd(), (filepath2)), 'utf-8');

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  console.log(obj1, obj2);
};
export default getDiff;





