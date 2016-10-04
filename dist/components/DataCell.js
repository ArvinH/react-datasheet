(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react);
    global.DataCell = mod.exports;
  }
})(this, function (exports, _react) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DataCell = function (_Component) {
    _inherits(DataCell, _Component);

    function DataCell(props) {
      _classCallCheck(this, DataCell);

      var _this = _possibleConstructorReturn(this, (DataCell.__proto__ || Object.getPrototypeOf(DataCell)).call(this, props));

      _this.state = { updated: false };
      return _this;
    }

    _createClass(DataCell, [{
      key: 'componentWillUpdate',
      value: function componentWillUpdate(nextProps) {
        var _this2 = this;

        var prevProps = this.props;
        if (nextProps.value !== this.props.value) {
          this.setState({ updated: true });
          setTimeout(function () {
            _this2.setState({ updated: false });
          }, 700);
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (prevProps.editing === true && this.props.editing === false) {
          this.onChange(this._input.value);
        }
        if (prevProps.editing === false && this.props.editing === true) {
          this._input.focus();
          this._input.value = this.props.data;
        }
      }
    }, {
      key: 'onChange',
      value: function onChange(value) {
        this.props.data !== value ? this.props.onChange(this.props.row, this.props.col, value) : null;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var _props = this.props;
        var row = _props.row;
        var col = _props.col;
        var rowSpan = _props.rowSpan;
        var colSpan = _props.colSpan;
        var value = _props.value;
        var className = _props.className;
        var cellStyle = _props.cellStyle;
        var editing = _props.editing;
        var selected = _props.selected;
        var _onMouseDown = _props.onMouseDown;
        var _onMouseOver = _props.onMouseOver;
        var _onDoubleClick = _props.onDoubleClick;


        return _react2.default.createElement(
          'td',
          {
            className: className + ' cell ' + (selected ? 'selected' : '') + ' ' + (this.state.updated ? 'updated' : ''),
            onMouseDown: function onMouseDown() {
              return _onMouseDown(row, col);
            },
            onDoubleClick: function onDoubleClick() {
              return _onDoubleClick(row, col);
            },
            onMouseOver: function onMouseOver() {
              return _onMouseOver(row, col);
            },
            colSpan: colSpan || 1,
            rowSpan: rowSpan || 1,
            style: cellStyle,
            ref: function ref(r) {
              _this3.domObject = r;
            }
          },
          _react2.default.createElement(
            'span',
            { style: { display: editing && selected ? 'none' : 'block' } },
            value
          ),
          _react2.default.createElement('input', { style: { display: editing && selected ? 'block' : 'none' }, ref: function ref(input) {
              return _this3._input = input;
            } })
        );
      }
    }]);

    return DataCell;
  }(_react.Component);

  exports.default = DataCell;

  DataCell.propTypes = {
    row: _react.PropTypes.number.isRequired,
    col: _react.PropTypes.number.isRequired,
    colSpan: _react.PropTypes.number,
    rowSpan: _react.PropTypes.number,
    selected: _react.PropTypes.bool.isRequired,
    editing: _react.PropTypes.bool.isRequired,
    onMouseDown: _react.PropTypes.func.isRequired,
    onDoubleClick: _react.PropTypes.func.isRequired,
    onMouseOver: _react.PropTypes.func.isRequired,
    updated: _react.PropTypes.bool
  };
});
