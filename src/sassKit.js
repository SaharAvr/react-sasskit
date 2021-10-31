/* eslint-disable react/prop-types */
const _ = require('lodash');
const md5 = require('md5');
const React = require('react');
const sassKitParser = require('./sassKitParser');
const sassKitElement = require('./sassKitElement');
const { DEFALUT_CLASSNAME_PREFIX, DOMAttributes, IntrinsicElements } = require('./sassKitConsts');

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

  const settings = {
    componentName: (
      _.get(Component, 'Naked.render.name') ||
      _.get(Component, 'name', DEFALUT_CLASSNAME_PREFIX)
    ),
    className: '',
    didUpdateSuperClasses: false,
    finalComponent: null,
    isInitialised: false,
  };

  const init = ({ children, ...props }) => {

    if (settings.isInitialised) {
      return;
    }

    settings.finalComponent = (() => {

      if (!_.isFunction(Component)) {
        return Component;
      }
  
      let InnerComponent = Component({ children, ...props });

      while (_.isFunction(InnerComponent.type)) {
        InnerComponent = InnerComponent.type({ ...InnerComponent.props });
      }
  
      return InnerComponent;
  
    })();

    settings.finalComponentType = _.get(settings.finalComponent, 'type', '').toString();

    settings.className = (() => {

      const cssStyle = `${sassKitParser.parseWithProps(props, ...args)}\n${_.get(sassKitElement.superClasses, props.className, '')}`;
      const className = `${settings.componentName}-${md5(cssStyle).substring(0, 5)}`;
      settings.didUpdateSuperClasses = true;

      sassKitElement.updateWith({ [className]: cssStyle });

      return className;

    })();

    settings.isInitialised = true;

  };

  return ({ children, ...props }) => {
    
    if (!settings.isInitialised) {
      init({ children, ...props });
    }

    const isDOMTypeElement = _.includes(IntrinsicElements, settings.finalComponentType);
    if (isDOMTypeElement) {
      return React.createElement(
        settings.finalComponentType,
        { ...settings.finalComponent.props, className: settings.className },
        settings.finalComponent.props.children,
      );
    }

    const isReactFragment = (settings.finalComponentType === 'Symbol(react.fragment)');
    if (isReactFragment) {
      return React.createElement(
        'div',
        { ...settings.finalComponent.props, className: settings.className },
        settings.finalComponent.props.children,
      );
    }

    return React.createElement(
      Component,
      { ..._.pick(props, DOMAttributes), className: settings.className },
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
