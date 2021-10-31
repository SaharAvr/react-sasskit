/* eslint-disable react/prop-types */
const _ = require('lodash');
const md5 = require('md5');
const React = require('react');
const sassKitParser = require('./sassKitParser');
const sassKitElement = require('./sassKitElement');
const { DEFALUT_CLASSNAME_PREFIX, DOMAttributes } = require('./sassKitConsts');

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

  sassKitElement.updateWith(superClasses);

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

      const cssStyle = `${sassKitParser.parseWithProps(props, ...args)}\n${_.get(sassKitElement.superClasses, props.className, '')}`;
      state.className = `${state.componentName}-${md5(cssStyle).substring(0, 5)}`;
      state.didUpdateSuperClasses = true;

      sassKitElement.updateWith({ [state.className]: cssStyle });

    }

    const shouldRenderComponent = _.has(Component, 'render');
    const finalComponent = (shouldRenderComponent ? Component : _.camelCase(_.first(React.Children.toArray(children))));

    return React.createElement(
      finalComponent,
      { ..._.pick(props, DOMAttributes), className: state.className },
      children,
    );

  };

};

module.exports = (() => {

  sassKitElement.init();
  
  return {
    parse: sassKitParser.parse,
    makeStyles,
    extend,
  };

})();
