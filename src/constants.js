const _ = require('lodash');

const STYLE_ELEMENT_ID = 'react-sasskit';

const DEFALUT_CLASSNAME_PREFIX = _.upperFirst(STYLE_ELEMENT_ID);

const DOM_ATTRIBUTES = [
  'children', 'dangerouslySetInnerHTML', 'onCopy', 'onCopyCapture',
  'onCut', 'onCutCapture', 'onPaste', 'onPasteCapture',
  'onCompositionEnd', 'onCompositionEndCapture', 'onCompositionStart', 'onCompositionStartCapture',
  'onCompositionUpdate', 'onCompositionUpdateCapture', 'onFocus', 'onFocusCapture',
  'onBlur', 'onBlurCapture', 'onChange', 'onChangeCapture',
  'onBeforeInput', 'onBeforeInputCapture', 'onInput', 'onInputCapture',
  'onReset', 'onResetCapture', 'onSubmit', 'onSubmitCapture',
  'onInvalid', 'onInvalidCapture', 'onLoad', 'onLoadCapture',
  'onError', 'onErrorCapture', 'onKeyDown', 'onKeyDownCapture',
  'onKeyPress', 'onKeyPressCapture', 'onKeyUp', 'onKeyUpCapture',
  'onAbort', 'onAbortCapture', 'onCanPlay', 'onCanPlayCapture',
  'onCanPlayThrough', 'onCanPlayThroughCapture', 'onDurationChange', 'onDurationChangeCapture',
  'onEmptied', 'onEmptiedCapture', 'onEncrypted', 'onEncryptedCapture',
  'onEnded', 'onEndedCapture', 'onLoadedData', 'onLoadedDataCapture',
  'onLoadedMetadata', 'onLoadedMetadataCapture', 'onLoadStart', 'onLoadStartCapture',
  'onPause', 'onPauseCapture', 'onPlay', 'onPlayCapture',
  'onPlaying', 'onPlayingCapture', 'onProgress', 'onProgressCapture',
  'onRateChange', 'onRateChangeCapture', 'onSeeked', 'onSeekedCapture',
  'onSeeking', 'onSeekingCapture', 'onStalled', 'onStalledCapture',
  'onSuspend', 'onSuspendCapture', 'onTimeUpdate', 'onTimeUpdateCapture',
  'onVolumeChange', 'onVolumeChangeCapture', 'onWaiting', 'onWaitingCapture',
  'onAuxClick', 'onAuxClickCapture', 'onClick', 'onClickCapture',
  'onContextMenu', 'onContextMenuCapture', 'onDoubleClick', 'onDoubleClickCapture',
  'onDrag', 'onDragCapture', 'onDragEnd', 'onDragEndCapture',
  'onDragEnter', 'onDragEnterCapture', 'onDragExit', 'onDragExitCapture',
  'onDragLeave', 'onDragLeaveCapture', 'onDragOver', 'onDragOverCapture',
  'onDragStart', 'onDragStartCapture', 'onDrop', 'onDropCapture',
  'onMouseDown', 'onMouseDownCapture', 'onMouseEnter', 'onMouseLeave',
  'onMouseMove', 'onMouseMoveCapture', 'onMouseOut', 'onMouseOutCapture',
  'onMouseOver', 'onMouseOverCapture', 'onMouseUp', 'onMouseUpCapture',
  'onSelect', 'onSelectCapture', 'onTouchCancel', 'onTouchCancelCapture',
  'onTouchEnd', 'onTouchEndCapture', 'onTouchMove', 'onTouchMoveCapture',
  'onTouchStart', 'onTouchStartCapture', 'onPointerDown', 'onPointerDownCapture',
  'onPointerMove', 'onPointerMoveCapture', 'onPointerUp', 'onPointerUpCapture',
  'onPointerCancel', 'onPointerCancelCapture', 'onPointerEnter', 'onPointerEnterCapture',
  'onPointerLeave', 'onPointerLeaveCapture', 'onPointerOver', 'onPointerOverCapture',
  'onPointerOut', 'onPointerOutCapture', 'onGotPointerCapture', 'onGotPointerCaptureCapture',
  'onLostPointerCapture', 'onLostPointerCaptureCapture', 'onScroll', 'onScrollCapture',
  'onWheel', 'onWheelCapture', 'onAnimationStart', 'onAnimationStartCapture',
  'onAnimationEnd', 'onAnimationEndCapture', 'onAnimationIteration', 'onAnimationIterationCapture',
  'onTransitionEnd', 'onTransitionEndCapture',
];

const INTRINSIC_ELEMENTS = [
  'a', 'abbr', 'address', 'area',
  'article', 'aside', 'audio', 'b',
  'base', 'bdi', 'bdo', 'big',
  'blockquote', 'body', 'br', 'button',
  'canvas', 'caption', 'cite', 'code',
  'col', 'colgroup', 'data', 'datalist',
  'dd', 'del', 'details', 'dfn',
  'dialog', 'div', 'dl', 'dt',
  'em', 'embed', 'fieldset', 'figcaption',
  'figure', 'footer', 'form', 'h1',
  'h2', 'h3', 'h4', 'h5',
  'h6', 'head', 'header', 'hgroup',
  'hr', 'html', 'i', 'iframe',
  'img', 'input', 'ins', 'kbd',
  'keygen', 'label', 'legend', 'li',
  'link', 'main', 'map', 'mark',
  'menu', 'menuitem', 'meta', 'meter',
  'nav', 'noindex', 'noscript', 'object',
  'ol', 'optgroup', 'option', 'output',
  'p', 'param', 'picture', 'pre',
  'progress', 'q', 'rp', 'rt',
  'ruby', 's', 'samp', 'slot',
  'script', 'section', 'select', 'small',
  'source', 'span', 'strong', 'style',
  'sub', 'summary', 'sup', 'table',
  'template', 'tbody', 'td', 'textarea',
  'tfoot', 'th', 'thead', 'time',
  'title', 'tr', 'track', 'u',
  'ul', 'var', 'video', 'wbr',
  'webview', 'svg', 'animate', 'animateMotion',
  'animateTransform', 'circle', 'clipPath', 'defs',
  'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood',
  'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter',
  'foreignObject', 'g', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata',
  'mpath', 'path', 'pattern', 'polygon',
  'polyline', 'radialGradient', 'rect', 'stop',
  'switch', 'symbol', 'text', 'textPath',
  'tspan', 'use', 'view',
];

module.exports = {
  STYLE_ELEMENT_ID,
  DEFALUT_CLASSNAME_PREFIX,
  DOM_ATTRIBUTES,
  INTRINSIC_ELEMENTS,
};
