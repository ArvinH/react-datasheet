(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './components/ReactDataSheet'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./components/ReactDataSheet'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.ReactDataSheet);
    global.index = mod.exports;
  }
})(this, function (exports, _ReactDataSheet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_ReactDataSheet).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});
