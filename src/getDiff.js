import _ from 'lodash';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';

const getDiff = (filepath1, filepath2) => { 
  const file1 = readFileSync(filepath1, 'utf-8');
  const file2 = readFileSync(filepath2, 'utf-8');

  console.log(JSON.parse(file1));
  console.log(JSON.parse(file2));

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
};
export default getDiff;





