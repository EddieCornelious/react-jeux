(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("ReactJeux", ["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactJeux"] = factory(require("react"));
	else
		root["ReactJeux"] = factory(root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/connect.js":
/*!************************!*\
  !*** ./src/connect.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = connect;

var _react = __webpack_require__(/*! react */ "react");

var _defaultMapStateToProps = __webpack_require__(/*! ./defaultMapStateToProps.js */ "./src/defaultMapStateToProps.js");

var _defaultMapStateToProps2 = _interopRequireDefault(_defaultMapStateToProps);

var _defaultMapDispatchToProps = __webpack_require__(/*! ./defaultMapDispatchToProps.js */ "./src/defaultMapDispatchToProps.js");

var _defaultMapDispatchToProps2 = _interopRequireDefault(_defaultMapDispatchToProps);

var _shallowEqual = __webpack_require__(/*! ./shallowEqual.js */ "./src/shallowEqual.js");

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _mergeObjs = __webpack_require__(/*! ./mergeObjs.js */ "./src/mergeObjs.js");

var _mergeObjs2 = _interopRequireDefault(_mergeObjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function connect() {
  var mapStateToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaultMapStateToProps2["default"];
  var mapDispatchToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaultMapDispatchToProps2["default"];
  return function (store, componentToConnectToStore) {
    var stateMapperDependsOnProps = mapStateToProps.length > 1;
    var dispatchMapperDependsOnProps = mapDispatchToProps.length > 1;
    return (
      /*#__PURE__*/
      function (_Component) {
        _inherits(WrapperComponent, _Component);

        function WrapperComponent(props) {
          var _this;

          _classCallCheck(this, WrapperComponent);

          _this = _possibleConstructorReturn(this, (WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).call(this, props));
          _this.state = {
            storeState: store.getState()
          };
          _this.stateProps = mapStateToProps(_this.state.storeState, props);
          _this.dispatchProps = mapDispatchToProps(store.dispatch, props);
          _this.storeHasChanged = false;
          _this.propsHaveChanged = false;
          _this.propsBeforeRender = props;
          _this.renderedEle = (0, _react.createElement)(componentToConnectToStore, (0, _mergeObjs2["default"])(_this.stateProps, _this.dispatchProps, _this.props));
          return _this;
        }

        _createClass(WrapperComponent, [{
          key: "componentDidMount",
          value: function componentDidMount() {
            this.initSubscribe();
          }
        }, {
          key: "initSubscribe",
          value: function initSubscribe() {
            var self = this;

            if (!self.unsubscribe) {
              self.unsubscribe = store.subscribe(function (newState) {
                return self.setState({
                  storeState: newState
                });
              });
            }
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this.unsubscribe();
          }
        }, {
          key: "shouldComponentUpdate",
          value: function shouldComponentUpdate(nextProps, nextState) {
            this.storeHasChanged = nextState !== this.state.storeState;
            this.propsBeforeRender = this.props;
            return true;
          }
        }, {
          key: "shouldUpdateStateProps",
          value: function shouldUpdateStateProps() {
            var nextStateProps = mapStateToProps(store.getState(), this.props);

            if ((0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
              return false;
            }

            this.stateProps = nextStateProps;
            return true;
          }
        }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
            this.propsHaveChanged = !(0, _shallowEqual2["default"])(nextProps, this.props);
          }
        }, {
          key: "shouldUpdateDispatchProps",
          value: function shouldUpdateDispatchProps() {
            var nextDispatchProps = mapDispatchToProps(store.dispatch, this.props);

            if ((0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
              return false;
            }

            this.dispatchProps = nextDispatchProps;
            return true;
          }
        }, {
          key: "render",
          value: function render() {
            var stateMapperChanged = false;
            var dispatchMapperChanged = false;
            this.propsChanged = !(0, _shallowEqual2["default"])(this.propsBeforeRender, this.props);

            if (this.storeHasChanged || this.propsHaveChanged && stateMapperDependsOnProps) {
              stateMapperChanged = this.shouldUpdateStateProps();
            }

            if (this.propsHaveChanged && dispatchMapperDependsOnProps) {
              dispatchMapperChanged = this.shouldUpdateDispatchProps();
            }

            if (this.propsHaveChanged || stateMapperChanged || dispatchMapperChanged) {
              this.renderedEle = (0, _react.createElement)(componentToConnectToStore, (0, _mergeObjs2["default"])(this.stateProps, this.dispatchProps, this.props));
            }

            return this.renderedEle;
          }
        }]);

        return WrapperComponent;
      }(_react.Component)
    );
  };
}

/***/ }),

/***/ "./src/defaultMapDispatchToProps.js":
/*!******************************************!*\
  !*** ./src/defaultMapDispatchToProps.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = defaultMapDispatchToProps;
var staticObj = {};
var DISPATCH = 'dispatch';

function defaultMapDispatchToProps(dispatch) {
  if (!staticObj[DISPATCH]) {
    staticObj[DISPATCH] = dispatch;
  }

  return staticObj;
}

/***/ }),

/***/ "./src/defaultMapStateToProps.js":
/*!***************************************!*\
  !*** ./src/defaultMapStateToProps.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = defaultMapStateToProps;
var staticObj = {};

function defaultMapStateToProps() {
  return staticObj;
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.connect = undefined;

var _connect = __webpack_require__(/*! ./connect.js */ "./src/connect.js");

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.connect = _connect2["default"];

/***/ }),

/***/ "./src/mergeObjs.js":
/*!**************************!*\
  !*** ./src/mergeObjs.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = mergeObjs;

function mergeObjs(state, dispatch, props) {
  return Object.assign({}, state, dispatch, props);
}

/***/ }),

/***/ "./src/shallowEqual.js":
/*!*****************************!*\
  !*** ./src/shallowEqual.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = shallowEqual;

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var hasOwn = Object.prototype.hasOwnProperty;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","amd":"react","root":"React","commonjs2":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ });
});
//# sourceMappingURL=react-jeux.js.map