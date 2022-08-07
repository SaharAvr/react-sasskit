import _ from 'lodash';
import md5 from 'md5';
import interleave from './interleave';

export default ({ args, props, componentName, superClasses }) => {

  const cssStyle = `${interleave({ args, props })}\n${_.get(superClasses, props.className, '')}`;
  const className = `${componentName}-${md5(cssStyle).substring(0, 5)}`;

  return { className, cssStyle };

};
