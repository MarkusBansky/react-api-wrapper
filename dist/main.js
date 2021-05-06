/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 607:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.F = void 0;
var toImmerable_1 = __webpack_require__(600);
var keys_1 = __webpack_require__(761);
var axios_1 = __webpack_require__(376);
var immer_1 = __webpack_require__(584);
var ReactApiWrapper;
(function (ReactApiWrapper) {
    var WrappingClass = /** @class */ (function () {
        function WrappingClass() {
        }
        return WrappingClass;
    }());
    ReactApiWrapper.WrappingClass = WrappingClass;
    var WrappingStatic = /** @class */ (function () {
        function WrappingStatic() {
            this.messages = toImmerable_1.default({});
            this.loadings = toImmerable_1.default({});
        }
        return WrappingStatic;
    }());
    ReactApiWrapper.WrappingStatic = WrappingStatic;
    function wrapWithReactApi(wrappingClass) {
        var wrappingClassObject = new wrappingClass();
        var properties = Object.keys(wrappingClassObject);
        var wrappedClass = {
            props: function (state) {
                var mappedState = toImmerable_1.default(new WrappingStatic());
                properties.forEach(function (p) { return (mappedState[p] = state[p]); });
                return mappedState;
            },
            dispatch: function () { },
            reducer: function (s) { return s; },
        };
        wrappedClass.dispatch = function (dispatch) {
            var fs = {};
            properties.forEach(function (propertyKey) {
                var apiUrl = Reflect.getMetadata(keys_1.apiUrlKey, wrappingClassObject, propertyKey);
                var apiMethod = Reflect.getMetadata(keys_1.apiMethodKey, wrappingClassObject, propertyKey);
                var apiRequestOptions = {
                    method: apiMethod,
                    url: apiUrl,
                };
                fs[propertyKey + 'Dispatch'] = function () {
                    axios_1.default(apiRequestOptions)
                        .then(function (value) {
                        return dispatch({
                            type: 'SUCCESS_' + propertyKey,
                            response: value,
                        });
                    })
                        .catch(function (reason) {
                        return dispatch({
                            type: 'FAIL_' + propertyKey,
                            error: reason,
                        });
                    });
                    return {
                        type: 'REQUEST_' + propertyKey,
                    };
                };
            });
            return fs;
        };
        wrappedClass.reducer = function (state, action) {
            return immer_1.default(state, function (draft) {
                properties.forEach(function (propertyKey) {
                    var _a;
                    switch (action.type) {
                        case 'REQUEST_' + propertyKey:
                            draft.loadings[propertyKey] = true;
                            draft.messages[propertyKey] = null;
                            break;
                        case 'SUCCESS_' + propertyKey:
                            draft.loadings[propertyKey] = false;
                            draft[propertyKey] = toImmerable_1.default((_a = action.response) === null || _a === void 0 ? void 0 : _a.data);
                            break;
                        case 'FAIL_' + propertyKey:
                            draft.loadings[propertyKey] = false;
                            draft.messages[propertyKey] = {
                                type: 'ERROR',
                                message: action.error,
                            };
                            break;
                    }
                });
            });
        };
        return wrappedClass;
    }
    ReactApiWrapper.wrapWithReactApi = wrapWithReactApi;
})(ReactApiWrapper = exports.F || (exports.F = {}));


/***/ }),

/***/ 761:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.apiUrlKey = exports.apiMethodKey = void 0;
exports.apiMethodKey = Symbol('apiMethod');
exports.apiUrlKey = Symbol('apiUrl');


/***/ }),

/***/ 600:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var immer_1 = __webpack_require__(584);
function toImmerable(obj) {
    var _a;
    return __assign((_a = {}, _a[immer_1.immerable] = true, _a), obj);
}
exports.default = toImmerable;


/***/ }),

/***/ 376:
/***/ ((module) => {

module.exports = require("axios");;

/***/ }),

/***/ 584:
/***/ ((module) => {

module.exports = require("immer");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map