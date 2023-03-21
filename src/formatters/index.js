import stylish from './stylish.js';
import plain from './plain.js';

const formatSelection = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    default:
      throw new Error(`Wrong format, mate - ${format}`);
  }
};

export default formatSelection;
