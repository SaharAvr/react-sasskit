import _ from 'lodash';

export const STYLE_ELEMENT_ID = 'react-sasskit';

export const DEFALUT_CLASSNAME_PREFIX = _.upperFirst(STYLE_ELEMENT_ID);

export const DOMAttributes = [
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