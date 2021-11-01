const _ = require('lodash');
const { init: initSassJs } = require('./sassJs');

class SassRenderer {

  constructor(options) {

    const isRunningOnBrowser = (typeof window !== 'undefined');
    if (!isRunningOnBrowser) {
      return;
    }

    this.elementId = options.elementId;
    this.superClasses = {};
    this.createElement();
    this.prioritizeElement();
    this.sassJs = initSassJs();
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

  render(newSuperClasses) {

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

module.exports = SassRenderer;
