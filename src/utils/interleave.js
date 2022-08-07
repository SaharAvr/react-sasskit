import _ from 'lodash';

export default ({ args, props }) => (

  _.reduce(args[0], (res, line, index) => {

    const arg = args[index + 1];
    const parsedArg = (_.isFunction(arg) ? arg(props) : arg);

    return `${res}${line}${parsedArg || ''}`;

  }, '')

);
