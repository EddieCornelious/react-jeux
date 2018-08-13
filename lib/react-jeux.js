(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("reactjeux", ["react"], factory);
	else if(typeof exports === 'object')
		exports["reactjeux"] = factory(require("react"));
	else
		root["reactjeux"] = factory(root["react"]);
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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function defaultMapStateToProps() {
  return {};
}

function defaultMapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
}

function mergeObjs(state, dispatch, props) {
  return Object.assign({}, state, dispatch, props);
}

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

function connect() {
  var mapStateToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultMapStateToProps;
  var mapDispatchToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultMapDispatchToProps;
  return function (store, componentToConnectToStore) {
    var stateMapperDependsOnProps = mapStateToProps.length > 1;
    var dispatchMapperDependsOnProps = mapDispatchToProps.length > 1;
    return (
      /*#__PURE__*/
      function (_React$Component) {
        _inherits(WrapperComponent, _React$Component);

        function WrapperComponent(props) {
          var _this;

          _classCallCheck(this, WrapperComponent);

          _this = _possibleConstructorReturn(this, (WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).call(this, props));
          _this.state = {
            storeState: store.getState()
          };
          _this.stateProps = mapStateToProps(_this.store.storeState, props);
          _this.dispatchProps = mapDispatchToProps(store.dispatch, props);
          _this.firstCycle = true;
          _this.storeChanged = false;
          _this.propsChanged = false;
          _this.propsBeforeRender = props;
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
            var _this2 = this;

            this.unsubscribe = function (newState) {
              return _this2.setState({
                storeState: newState
              });
            };
          }
        }, {
          key: "componentWillUnMount",
          value: function componentWillUnMount() {
            this.unsubscribe();
          }
        }, {
          key: "shouldComponentUpdate",
          value: function shouldComponentUpdate(nextProps, nextState) {
            this.storeChanged = nextState !== this.state.storeState;
            this.propsBeforeRender = this.props;
            return true;
          }
        }, {
          key: "updateStateProps",
          value: function updateStateProps() {
            var nextStateProps = mapStateToProps(store.getState(), this.props);

            if (shallowEqual(nextStateProps, this.stateProps)) {
              return false;
            }

            this.stateProps = nextStateProps;
            return true;
          }
        }, {
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(nextProps) {
            this.propsChanged = !shallowEqual(nextProps, this.propsBeforeRender);
          }
        }, {
          key: "updateDispatchProps",
          value: function updateDispatchProps() {
            var nextDispatchProps = mapDispatchToProps(store.getState(), this.props);

            if (shallowEqual(nextDispatchProps, this.stateProps)) {
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

            if (this.firstCycle) {
              this.renderedEle = _react.default.createElement(componentToConnectToStore, mergeObjs(this.stateProps, this.dispatchProps, this.props));
              this.firstCycle = false;
              return this.renderedEle;
            }

            this.propsChanged = !shallowEqual(this.propsBeforeRender, this.props);

            if (this.storeChanged || this.propsChanged && stateMapperDependsOnProps) {
              stateMapperChanged = this.updateStateProps();
            }

            if (this.propsChanged && dispatchMapperDependsOnProps) {
              dispatchMapperChanged = this.updateDispatchProps();
            }

            if (this.propsChanged || stateMapperChanged || dispatchMapperChanged) {
              this.renderedEle = _react.default.createElement(componentToConnectToStore, mergeObjs(this.stateProps, this.dispatchProps, this.props));
              return this.renderedEle;
            }

            return this.renderedEle;
          }
        }]);

        return WrapperComponent;
      }(_react.default.Component)
    );
  };
}

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ });
});
//# sourceMappingURL=react-jeux.js.map