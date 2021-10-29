/* eslint-disable */
const sassBlob = require('react-sasskit-blob');

module.exports = new ((this, () => {
  
  'use strict';
  
  const noop = () => {};
  const { slice } = [];
  
  function Sass() {
  
    for (const key in this) {
      if (typeof this[key] === 'function') {
        this[key] = this[key].bind(this);
      }
    }

    const blobUrl = URL.createObjectURL(sassBlob.init());
    const newSassWorker = new Worker(blobUrl);

    this._callbacks = {};
    this._worker = newSassWorker;
    this._worker.addEventListener('message', this._handleWorkerMessage, false);
    URL.revokeObjectURL(blobUrl);

  };
  
  Sass.style = {
    nested: 0,
    expanded: 1,
    compact: 2,
    compressed: 3,
  };
  
  Sass.comments = {
    none: 0,
    default: 1,
  };
  
  Sass.prototype = {
    style: Sass.style,
    comments: Sass.comments,
  
    destroy() {
      this._worker && this._worker.terminate();
      this._worker = null;
      this._callbacks = {};
      this._importer = null;
    },
  
    _handleWorkerMessage(event) {
      if (event.data.command) {
        this[event.data.command](event.data.args);
      }
  
      this._callbacks[event.data.id] && this._callbacks[event.data.id](event.data.result);
      delete this._callbacks[event.data.id];
    },
  
    _dispatch(options, callback) {
      if (!this._worker) {
        throw new Error('Sass worker has been terminated');
      }
  
      options.id = `cb${Date.now()}${Math.random()}`;
      this._callbacks[options.id] = callback;
      this._worker.postMessage(options);
    },
  
    _importerInit(args) {
      const done = function done(result) {
        this._worker.postMessage({
          command: '_importerFinish',
          args: [result],
        });
      }.bind(this);
  
      try {
        this._importer(args[0], done);
      } catch (e) {
        done({ error: e.message });
        throw e;
      }
    },
  
    importer(importerCallback, callback) {
      if (typeof importerCallback !== 'function' && importerCallback !== null) {
        throw new Error('importer callback must either be a function or null');
      }
  
      this._importer = importerCallback;

      this._worker.postMessage({
        command: 'importer',
        args: [Boolean(importerCallback)],
      });
  
      callback && callback();
    },
  }
  
  const commands = 'writeFile readFile listFiles removeFile clearFiles lazyFiles preloadFiles options compile compileFile';
  
  commands.split(' ').forEach(command => {
    Sass.prototype[command] = function () {
      let callback = slice.call(arguments, -1)[0];
      const args = slice.call(arguments, 0, -1);
      if (typeof callback !== 'function') {
        args.push(callback);
        callback = noop;
      }
  
      this._dispatch({
        command,
        args,
      }, callback);
    };
  });

  return Sass;
  
})())();
