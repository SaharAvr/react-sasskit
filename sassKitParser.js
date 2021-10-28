import _ from 'lodash';

const parse = (...args) => (
  _.reduce(args[0], (res, line, index) =>
    `${res}${line}${(args[index + 1] || '')}`, '')
);
  
const parseWithProps = (props, ...args) => {
  
  const getSpecialArg = arg => {
  
    if (!arg) {
      return '';
    }
  
    if (_.isFunction(arg)) {
      return arg(props);
    }
  
    return arg;
  
  };
  
  return _.reduce(args[0], (res, line, index) =>
    `${res}${line}${getSpecialArg(args[index + 1])}`, '');
};

export default {
  parse,
  parseWithProps,
};
