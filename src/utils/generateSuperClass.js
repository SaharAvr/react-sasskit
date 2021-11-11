const _ = require('lodash');
const md5 = require('md5');
const interleave = require('./interleave');

module.exports = ({ args, props, componentName, superClasses } = {}) => {

  const cssStyle = `${interleave({ args, props })}\n${_.get(superClasses, _.get(props, 'className'), '')}`;
  const className = `${componentName}-${md5(cssStyle).substring(0, 5)}`;

  return { className, cssStyle };

};
