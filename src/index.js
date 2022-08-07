const _ = require('lodash');
const React = require('react');
const SassRenderer = require('./services/sassRenderer');
const getInnerComponent = require('./utils/getInnerComponent');
const generateSuperClass = require('./utils/generateSuperClass');
const { DEFALUT_CLASSNAME_PREFIX, DOM_ATTRIBUTES, INTRINSIC_ELEMENTS, STYLE_ELEMENT_ID } = require('./constants');

class ReactSassKit {

  constructor() {
    this.sassRenderer = new SassRenderer({ elementId: STYLE_ELEMENT_ID });
  }

  makeStyles(superClasses) {

    if (_.isEmpty(superClasses)) {
      return {};
    }
  
    if (!_.isObject(superClasses)) {
      return {};
    }
  
    if (!_.every(superClasses, _.isString)) {
      return {};
    }
  
    this.sassRenderer.render(superClasses);
  
    const styles = _.reduce(superClasses, (res, value, key) => {
      res[key] = key;
      return res;
    }, {});
  
    return styles;
  
  }

  extend(Component) {

    return (...args) => {

      const settings = {
        componentName: (
          _.get(Component, 'Naked.render.name') ||
          _.get(Component, 'name', DEFALUT_CLASSNAME_PREFIX)
        ),
        className: '',
        finalComponent: null,
        finalComponentType: null,
        isInitialised: false,
      };
    
      const init = ({ children, ...props }) => {
    
        if (settings.isInitialised) {
          return;
        }

        const superClass = generateSuperClass({ args, props, componentName: settings.componentName, superClasses: this.sassRenderer.superClasses });
        this.sassRenderer.render({ [superClass.className]: superClass.cssStyle });

        settings.finalComponent = getInnerComponent(Component, { children, ...props });
        settings.finalComponentType = _.get(settings.finalComponent, 'type', '').toString();
        settings.className = superClass.className;
        settings.isInitialised = true;

      };

      return ({ children, ...props }) => {

        if (!settings.isInitialised) {
          init({ children, ...props });
        }

        const isDOMTypeElement = _.includes(INTRINSIC_ELEMENTS, settings.finalComponentType);
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
          { ..._.pick(props, DOM_ATTRIBUTES), className: settings.className },
          children,
        );

      };

    };

  }

}

module.exports = new ReactSassKit();
