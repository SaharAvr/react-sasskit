/* eslint-disable react/prop-types */
import _ from 'lodash';
import md5 from 'md5';
import React from 'react';
import sassParser from './sassParser';
import sassKitElement from './sassKitElement';
import { DEFALUT_CLASSNAME_PREFIX, DOMAttributes } from './consts';

const allSuperClasses = {};

const updateSuperClasses = superClasses => {

  _.forEach(superClasses, (cssStyle, className) => {
    allSuperClasses[className] = cssStyle;
  });

  sassKitElement.updateWith(allSuperClasses);

};

const makeStyles = superClasses => {

  if (_.isEmpty(superClasses)) {
    return {};
  }

  if (!_.isObject(superClasses)) {
    return {};
  }

  if (!_.every(superClasses, _.isString)) {
    return {};
  }

  updateSuperClasses(superClasses);

  const styles = _.reduce(superClasses, (res, value, key) => {
    res[key] = key;
    return res;
  }, {});

  return styles;

};

const extend = Component => (...args) => {

  const state = {
    componentName: (
      _.get(Component, 'Naked.render.name') ||
      _.get(Component, 'name', DEFALUT_CLASSNAME_PREFIX)
    ),
    className: '',
    didUpdateSuperClasses: false,
  };

  return ({ children, ...props }) => {
    
    if (!state.didUpdateSuperClasses) {

      const cssStyle = `${sassParser.parseWithProps(props, ...args)}\n${allSuperClasses[props.className] || ''}`;
      state.className = `${state.componentName}-${md5(cssStyle).substring(0, 5)}`;
      state.didUpdateSuperClasses = true;

      updateSuperClasses({ [state.className]: cssStyle });

    }

    return React.createElement(
      Component,
      { ..._.pick(props, DOMAttributes), className: state.className },
      children,
    );

  };

};

export default (() => {

  sassKitElement.prioritize();
  
  return {
    parse: sassParser.parse,
    makeStyles,
    extend,
  };

})();
