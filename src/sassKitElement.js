const _ = require('lodash');
const { STYLE_ELEMENT_ID } = require('./sassKitConsts');
const { init: initSassJs } = require('./sassJs');

class SassKitElement {

  constructor() {
    this.element = null;
    this.superClasses = null;
    this.sassJs = null;
    this.isInitialised = false;
  }

  init() {

    const isRunningOnBrowser = (typeof window !== 'undefined');
    if (!isRunningOnBrowser) {
      return;
    }
    
    this.create();
    this.prioritize();
    this.superClasses = {};
    this.sassJs = initSassJs();
    this.isInitialised = true;

  }

  create() {

    this.element = document.createElement('style');
    this.element.dataset.id = STYLE_ELEMENT_ID;

    document.head.appendChild(this.element);

  }

  prioritize() {
  
    const observer = new MutationObserver(() => {
    
      if (document.head.lastChild === this.element) {
        return;
      }
    
      document.head.appendChild(this.element);
        
    });
    
    observer.observe(document.head, { childList: true, subtree: true });

  }

  updateWith(newSuperClasses) {

    if (!this.isInitialised) {
      return;
    }

    if (_.isEmpty(newSuperClasses)) {
      return;
    }

    _.forEach(newSuperClasses, (cssStyle, className) => {
      this.superClasses[className] = cssStyle;
    });
      
    const classesInnerHTML = _.chain(this.superClasses)
      .reduce((res, cssStyle, className) => (
        `${res}\n  .${className} {\n  ${cssStyle}\n}`
      ), '')
      .trim()
      .value();
    
    this.sassJs.compile(classesInnerHTML, result => {
    
      if (!result.text) {
        return;
      }
    
      this.element.innerHTML = _.chain(`\n${result.text}`)
        .replace(/; }/g, ';\n}')
        .replace(/\n\s+\.(.*)/g, '\n.$1')
        .value();
    
    });

  }

}

module.exports = new SassKitElement();
