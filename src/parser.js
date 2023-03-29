import { load } from 'js-yaml';

const getParser = (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return load(data);
    default:
      throw new Error(`Wrong dataType, mate - ${dataType}`);
  }
};
export default getParser;
