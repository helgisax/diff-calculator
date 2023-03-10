import { load } from 'js-yaml';

const getParser = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return load(file);
    case 'yml':
      return load(file);
    default:
      throw new Error(`Wrong format, mate - ${format}`);
  }
};
export default getParser;
