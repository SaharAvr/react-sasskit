const _ = require('lodash');
const sassJs = require('./sassJs');
const { STYLE_ELEMENT_ID } = require('./sassKitConsts');

const createSassKitElement = () => {

  const sassKitElement = document.createElement('style');
  sassKitElement.dataset.id = STYLE_ELEMENT_ID;
  
  document.head.appendChild(sassKitElement);
  
  return sassKitElement;
  
};

const getSassKitElement = () => (
  
  document.querySelector(`[data-id="${STYLE_ELEMENT_ID}"]`) ||
    createSassKitElement()
  
);

const prioritizeSassKitElement = () => {
  
  const sassKitElement = getSassKitElement();
  
  const observer = new MutationObserver(() => {
  
    if (document.head.lastChild === sassKitElement) {
      return;
    }
  
    document.head.appendChild(sassKitElement);
      
  });
  
  observer.observe(document.head, { childList: true, subtree: true });
  
};

const updateSassKitElementWith = superClasses => {
  
  if (_.isEmpty(superClasses)) {
    return;
  }
    
  const classesInnerHTML = _.chain(superClasses)
    .reduce((res, cssStyle, className) => (
      `${res}\n  .${className} {\n  ${cssStyle}\n}`
    ), '')
    .trim()
    .value();
  
  sassJs.compile(classesInnerHTML, result => {
  
    if (!result.text) {
      return;
    }
  
    getSassKitElement().innerHTML = _.chain(`\n${result.text}`)
      .replace(/; }/g, ';\n}')
      .replace(/\n\s+\.(.*)/g, '\n.$1')
      .value();
  
  });
  
};

module.exports = {
  prioritize: prioritizeSassKitElement,
  updateWith: updateSassKitElementWith,
};
