const md5 = require('md5');
const interleave = require('./interleave');

module.exports = ({ args } = {}) => {

  const callee = (new Error()).stack.split('\n')[2].trim().split(' ')[1];
  const className = `FreeStyle-${md5(callee).substring(0, 5)}`;
  const cssStyle = `${interleave({ args })}\n`;

  return { className, cssStyle };

};
