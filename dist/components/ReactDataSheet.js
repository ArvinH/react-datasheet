(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './DataCell'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./DataCell'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.DataCell);
    global.ReactDataSheet = mod.exports;
  }
})(this, function (exports, _react, _DataCell) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _DataCell2 = _interopRequireDefault(_DataCell);

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

  var TAB_KEY = 9;
  var ENTER_KEY = 13;
  var LEFT_KEY = 37;
  var UP_KEY = 38;
  var RIGHT_KEY = 39;
  var DOWN_KEY = 40;
  var DELETE_KEY = 46;
  var BACKSPACE_KEY = 8;
  var CMD_KEY = 91;
  var CTRL_KEY = 17;

  var isEmpty = function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  };
  var range = function range(start, end) {
    var array = [];
    var inc = end - start > 0;
    for (var i = start; inc ? i < end : i > end; inc ? i++ : i--) {
      array.push(i);
    }
    return array;
  };

  var ReactDataSheet = function (_Component) {
    _inherits(ReactDataSheet, _Component);

    function ReactDataSheet(props, context) {
      _classCallCheck(this, ReactDataSheet);

      var _this = _possibleConstructorReturn(this, (ReactDataSheet.__proto__ || Object.getPrototypeOf(ReactDataSheet)).call(this, props, context));

      _this.onMouseDown = _this.onMouseDown.bind(_this);
      _this.onMouseUp = _this.onMouseUp.bind(_this);
      _this.onMouseOver = _this.onMouseOver.bind(_this);
      _this.onDoubleClick = _this.onDoubleClick.bind(_this);
      _this.handleKey = _this.handleKey.bind(_this);
      _this.handleKeyUp = _this.handleKeyUp.bind(_this);
      _this.handleCopy = _this.handleCopy.bind(_this);
      _this.handlePaste = _this.handlePaste.bind(_this);
      _this.pageClick = _this.pageClick.bind(_this);
      _this.onChange = _this.onChange.bind(_this);

      _this.defaultState = {
        start: {},
        end: {},
        selecting: false,
        editing: {},
        cmdDown: false
      };
      _this.state = _this.defaultState;

      _this.removeAllListeners = _this.removeAllListeners.bind(_this);
      return _this;
    }

    _createClass(ReactDataSheet, [{
      key: 'removeAllListeners',
      value: function removeAllListeners() {
        document.removeEventListener('keydown', this.handleKey);
        document.removeEventListener('keyup', this.handleKeyUp);
        document.removeEventListener('mousedown', this.pageClick);
        document.removeEventListener('copy', this.handleCopy);
        document.removeEventListener('mouseup', this.onMouseUp);
        document.removeEventListener('paste', this.handlePaste);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeAllListeners();
      }
    }, {
      key: 'pageClick',
      value: function pageClick(e) {
        if (!this.area.contains(e.target)) {
          this.setState(this.defaultState);
          this.removeAllListeners();
        }
      }
    }, {
      key: 'handleCopy',
      value: function handleCopy(e) {
        var _this2 = this;

        var cellConverter = this.props.dataRenderer ? this.props.dataRenderer : this.props.valueRenderer;
        if (!isEmpty(this.state.start)) {
          var text = range(this.state.start.i, this.state.end.i + 1).map(function (j) {
            return _this2.props.data.slice(0)[j].slice(_this2.state.start.j, _this2.state.end.j + 1).map(function (cell) {
              return cellConverter(cell);
            }).join('\t');
          }).join('\n');
          e.preventDefault();
          e.clipboardData.setData('text/plain', text);
        }
      }
    }, {
      key: 'handlePaste',
      value: function handlePaste(e) {
        var _this3 = this;

        var pasteData = e.clipboardData.getData('text/plain').split('\n').map(function (row) {
          return row.split('\t');
        });
        var map = new Map();
        this.props.data.map(function (row, i) {
          return row.map(function (cell, j) {
            var start = _this3.state.start;
            var cellData = pasteData[i - start.i] && pasteData[i - start.i][j - start.j];

            if (!cell.readOnly && typeof cellData !== 'undefined') {
              _this3.props.onPaste ? map.set(cell, cellData) : _this3.onChange(i, j, cellData);
            }
          });
        });
        if (this.props.onPaste) {
          this.props.onPaste(map);
        };
        this.setState(this.defaultState);
        document.removeEventListener('paste', this.handlePaste);
      }
    }, {
      key: 'handleKeyboardCellMovement',
      value: function handleKeyboardCellMovement(e) {
        var newLocation = null;
        var _state = this.state;
        var start = _state.start;
        var editing = _state.editing;
        var data = this.props.data;


        if (!isEmpty(this.state.editing) && e.keyCode !== TAB_KEY) {
          return false;
        } else if (e.keyCode === TAB_KEY) {
          newLocation = { i: start.i, j: start.j + 1 };
          newLocation = typeof data[newLocation.i][newLocation.j] !== 'undefined' ? newLocation : { i: start.i + 1, j: 0 };
        } else if (e.keyCode === RIGHT_KEY) {
          newLocation = { i: start.i, j: start.j + 1 };
        } else if (e.keyCode === LEFT_KEY) {
          newLocation = { i: start.i, j: start.j - 1 };
        } else if (e.keyCode === UP_KEY) {
          newLocation = { i: start.i - 1, j: start.j };
        } else if (e.keyCode === DOWN_KEY) {
          newLocation = { i: start.i + 1, j: start.j };
        }

        if (newLocation && data[newLocation.i] && typeof data[newLocation.i][newLocation.j] !== 'undefined') {
          this.setState({ end: newLocation, start: newLocation, editing: {} });
        }
        if (newLocation) {
          e.preventDefault();
          return true;
        }
        return false;
      }
    }, {
      key: 'getSelectedCells',
      value: function getSelectedCells(data, start, end) {
        var selected = [];
        range(start.i, end.i + 1).map(function (i) {
          range(start.j, end.j + 1).map(function (j) {
            selected.push({ cell: data[i][j], i: i, j: j });
          });
        });
        return selected;
      }
    }, {
      key: 'handleKeyUp',
      value: function handleKeyUp(e) {
        if (e.keyCode == CTRL_KEY || e.keyCode == CMD_KEY) {
          this.setState({ cmdDown: false });
        }
      }
    }, {
      key: 'handleKey',
      value: function handleKey(e) {
        var _this4 = this;

        if (isEmpty(this.state.start) || this.state.cmdDown) {
          return true;
        };
        if (e.keyCode == CTRL_KEY || e.keyCode == CMD_KEY) {
          this.setState({ cmdDown: true });
          return true;
        }
        if (this.handleKeyboardCellMovement(e)) {
          return true;
        };

        var _state2 = this.state;
        var start = _state2.start;
        var end = _state2.end;

        var data = this.props.data;
        var isEditing = !isEmpty(this.state.editing);

        if ((e.keyCode === DELETE_KEY || e.keyCode === BACKSPACE_KEY) && !isEditing) {
          //CASE when user presses delete
          console.log(this.getSelectedCells(data, start, end));
          this.getSelectedCells(data, start, end).map(function (_ref) {
            var cell = _ref.cell;
            var i = _ref.i;
            var j = _ref.j;

            _this4.onChange(i, j, '');
          });
          e.preventDefault();
        } else if (e.keyCode === ENTER_KEY && isEditing) {
          //CASE when user is editing a field, then presses enter (validate)
          this.setState({ editing: {} });
        } else if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 || e.keyCode >= 96 && e.keyCode <= 105 || [186, 187, 189, 190, 107, 109, 110, ENTER_KEY].indexOf(e.keyCode) > -1) {

          var startCell = data[start.i][start.j];
          //empty out cell if user starts typing without pressing enter
          if (e.keyCode !== ENTER_KEY && !isEditing) this.onChange(start.i, start.j, '');
          if (typeof startCell !== 'undefined' && !startCell.readOnly) this.setState({ editing: start });
        }
      }
    }, {
      key: 'onDoubleClick',
      value: function onDoubleClick(i, j) {
        var cell = this.props.data[i][j];
        !cell.readOnly ? this.setState({ editing: { i: i, j: j } }) : null;
      }
    }, {
      key: 'onMouseDown',
      value: function onMouseDown(i, j) {
        var editing = isEmpty(this.state.editing) || this.state.editing.i !== i || this.state.editing.j !== j ? {} : this.state.editing;

        this.setState({ selecting: true, start: { i: i, j: j }, end: { i: i, j: j }, editing: editing });

        document.addEventListener('mouseup', this.onMouseUp);
        document.addEventListener('mousedown', this.pageClick);
        document.addEventListener('copy', this.handleCopy);
        document.addEventListener('paste', this.handlePaste);
        document.addEventListener('keydown', this.handleKey);
        document.addEventListener('keyup', this.handleKeyUp);
      }
    }, {
      key: 'onMouseOver',
      value: function onMouseOver(i, j) {
        this.state.selecting && isEmpty(this.state.editing) ? this.setState({ end: { i: i, j: j } }) : null;
      }
    }, {
      key: 'onMouseUp',
      value: function onMouseUp() {
        this.setState({ selecting: false });
        document.removeEventListener('mouseup', this.onMouseUp);
      }
    }, {
      key: 'onChange',
      value: function onChange(i, j, val) {
        var cell = this.props.data[i][j];
        this.props.onChange(cell, i, j, val);
        this.setState({ editing: {} });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this5 = this;

        var _props = this.props;
        var keyFunction = _props.keyFunction;
        var dataRenderer = _props.dataRenderer;
        var valueRenderer = _props.valueRenderer;
        var className = _props.className;


        var isSelected = function isSelected(i, j) {
          var start = _this5.state.start;
          var end = _this5.state.end;
          var pos_x = j >= start.j && j <= end.j;
          var neg_x = j <= start.j && j >= end.j;
          var pos_y = i >= start.i && i <= end.i;
          var neg_y = i <= start.i && i >= end.i;

          return pos_x && pos_y || neg_x && pos_y || neg_x && neg_y || pos_x && neg_y;
        };

        var isEditing = function isEditing(i, j) {
          return _this5.state.editing.i === i && _this5.state.editing.j == j;
        };

        return _react2.default.createElement(
          'table',
          { ref: function ref(r) {
              return _this5.area = r;
            }, className: 'data-grid ' + (className ? className : '') },
          _react2.default.createElement(
            'tbody',
            null,
            this.props.data.map(function (row, i) {
              return _react2.default.createElement(
                'tr',
                { key: i },
                row.map(function (cell, j) {
                  return _react2.default.createElement(_DataCell2.default, {
                    key: cell.key ? cell.key : j,
                    className: cell.className ? cell.className : '',
                    row: i,
                    col: j,
                    onMouseDown: _this5.onMouseDown,
                    onDoubleClick: _this5.onDoubleClick,
                    onMouseOver: _this5.onMouseOver,

                    value: valueRenderer(cell),
                    data: dataRenderer ? dataRenderer(cell) : valueRenderer(cell),
                    selected: isSelected(i, j),
                    editing: isEditing(i, j),
                    colSpan: cell.colSpan,
                    rowSpan: cell.rowSpan,
                    onChange: _this5.onChange,
                    cellStyle: {
                      borderTop: '1px solid #DDD',
                      borderBottom: '1px solid #DDD',
                      borderLeft: '0',
                      borderRight: '0'
                    }
                  });
                })
              );
            })
          )
        );
      }
    }]);

    return ReactDataSheet;
  }(_react.Component);

  exports.default = ReactDataSheet;


  //Each cell object can have the following:
  //>readOnly  : cells can be selected/copied but cannot be edited
  //>className : cells will have these className added to them, use this to override cells with your own style
  //>colSpan   : Adds the colspan attribute to the cell <td> element
  //>rowSpan   : Adds the rowspan attribute to the cell <td> element
  ReactDataSheet.propTypes = {
    data: _react.PropTypes.array.isRequired, // Array of objects, number
    onChange: _react.PropTypes.func, // Fn to handle any change
    valueRenderer: _react.PropTypes.func.isRequired, // Fn to render data from provided data celss
    dataRenderer: _react.PropTypes.func };
});
