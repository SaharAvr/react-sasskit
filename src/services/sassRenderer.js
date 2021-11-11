const _ = require('lodash');
const SassJs = require('./sassJs');

class SassRenderer {

  constructor(options) {

    const isRunningOnBrowser = (typeof window !== 'undefined');
    if (!isRunningOnBrowser) {
      return;
    }

    this.elementId = options.elementId;
    this.allSuperClasses = {};
    this.createElement();
    this.prioritizeElement();
    this.sassJs = new SassJs();
    this.isInitialised = true;

  }

  createElement() {

    if (this.isInitialised) {
      return;
    }

    this.element = document.createElement('style');
    this.element.dataset.id = this.elementId;

    document.head.appendChild(this.element);

  }

  prioritizeElement() {

    if (this.isInitialised) {
      return;
    }

    const observer = new MutationObserver(() => {

      if (document.head.lastChild === this.element) {
        return;
      }

      document.head.appendChild(this.element);

    });

    observer.observe(document.head, { childList: true, subtree: true });

  }

  render(superClasses) {

    if (!this.isInitialised) {
      return;
    }

    if (_.isEmpty(superClasses)) {
      return;
    }

    _.forEach(superClasses, (sass, className) => {

      const superClassExists = _.has(this.allSuperClasses, className);
      const isFreeStyleSuperClass = _.startsWith(className, 'FreeStyle-');

      if (superClassExists && !isFreeStyleSuperClass) {
        return;
      }

      this.allSuperClasses[className] = sass;

      this.sassJs.compile(`.${className} { ${sass} }`, result => {

        if (isFreeStyleSuperClass) {
          this.element.innerHTML = _.replace(this.element.innerHTML, /\s*\.FreeStyle-[^{]+{[^}]+}/g, '');
        }

        if (!result.text) {
          delete this.allSuperClasses[className];
          return;
        }
  
        const newCss = _.chain(`\n${result.text}`)
          .replace(/; }/g, ';\n}')
          .replace(/\n\s+\.(.*)/g, '\n\n.$1')
          .value();
        
        this.element.innerHTML = `${this.element.innerHTML || ''}${newCss}`;
  
      });

    });

    // const combinedSass = _.chain(this.allSuperClasses)
    //   .reduce((res, sass, className) => (
    //     `${res}\n  .${className} {\n  ${sass}\n}`
    //   ), '')
    //   .trim()
    //   .value();

    // this.sassJs.compile(combinedSass, result => {

    //   if (!result.text) {
    //     return;
    //   }

    //   this.element.innerHTML = _.chain(`\n${result.text}`)
    //     .replace(/; }/g, ';\n}')
    //     .replace(/\n\s+\.(.*)/g, '\n.$1')
    //     .value();

    // });

  }

}

module.exports = SassRenderer;
