/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function () {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function () {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/**
 * Contains the Web site visitor tracking information model.
 */





const WebsiteVisitorSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
    date: { type: Date, default: () => Date.now() },
    ip: { type: String },
    userAgent: { type: String },
    sessionId: { type: String }
});

module.exports = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('WebsiteVisitor', WebsiteVisitorSchema);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)(module)))

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uuid_v1__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_uuid_v1___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_uuid_v1__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_winston__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_winston___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_winston__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_RSVP__ = __webpack_require__(10);
/**
 * Implements the server API.
 */











// Setup the web server handlers
const ServerAPI = __WEBPACK_IMPORTED_MODULE_1_express___default()();

// Ensure we can parse JSON-encoded requests
ServerAPI.use(__WEBPACK_IMPORTED_MODULE_0_body_parser___default.a.json());

// Help for the web service
ServerAPI.all('/', function (req, res) {
    res.status(400).json({
        name: 'Kal and Jocelyn\'s wedding website API',
        version: process.env.npm_package_version,
        availableAPIs: {
            rsvp: {
                help: 'Log an RSVP for a couple'
            }
        }
    });
});

// The 'rsvp' command
ServerAPI.post('/rsvp', function (req, res) {
    const requestId = __WEBPACK_IMPORTED_MODULE_3_uuid_v1___default()();
    __WEBPACK_IMPORTED_MODULE_4_winston___default.a.log('debug', 'rsvp request', requestId, req.body);

    var guestRSVPDocument = {
        rsvpId: requestId,
        guest: req.body.guest,
        willAttend: req.body.willAttend
    };

    if (req.body.guestPlusOne) {
        guestRSVPDocument.guestPlusOne = req.body.guestPlusOne;
    }

    new __WEBPACK_IMPORTED_MODULE_5__models_RSVP__["default"](guestRSVPDocument).save(function (err) {
        var code = 200;
        var responseJson = {
            requestId: requestId
        };

        if (err) {
            __WEBPACK_IMPORTED_MODULE_4_winston___default.a.log('info', 'mongodb write failed', requestId, req.body, err);
            code = 500;
            responseJson.error = 'Failed to persist reservation to database';
        }

        res.status(code).json(responseJson);

        __WEBPACK_IMPORTED_MODULE_4_winston___default.a.log('debug', 'rsvp response', requestId, responseJson);
    });
});

/* harmony default export */ __webpack_exports__["a"] = (ServerAPI);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_async__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cookie_parser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_universal_analytics__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_universal_analytics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_universal_analytics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_winston__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_winston___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_winston__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__server_api__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_WebsiteVisitor__ = __webpack_require__(4);
/**
 * Main entry point for the express server.
 */













// Avoid mongoose Promise deprecation warning
__WEBPACK_IMPORTED_MODULE_3_mongoose___default.a.Promise = global.Promise;

// Web server port
const webAppPort = process.env.PORT || 8000;

// MongoDB connection string
const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding';

// Logging level
__WEBPACK_IMPORTED_MODULE_5_winston___default.a.level = process.env.LOG_LEVEL || 'debug';

// The Web server chain
const WebApp = __WEBPACK_IMPORTED_MODULE_2_express___default()();
WebApp.set('trust proxy', true);

// Execute the initialization sequence
__WEBPACK_IMPORTED_MODULE_0_async___default.a.waterfall([function setupMongoDBConnection(callback) {
    __WEBPACK_IMPORTED_MODULE_3_mongoose___default.a.connect(mongodbUri, function (err, res) {
        if (err) {
            __WEBPACK_IMPORTED_MODULE_5_winston___default.a.log('error', 'Failed to connect to mongodb', mongodbUri, err);
            callback(err);
        } else {
            __WEBPACK_IMPORTED_MODULE_5_winston___default.a.log('debug', 'Successfully connected to mongodb', mongodbUri, res);
            callback(null);
        }
    });
}, function setupMongoDBUserTracking(callback) {
    WebApp.use('/', __WEBPACK_IMPORTED_MODULE_1_cookie_parser___default()(), function (req, res, next) {
        if (req.path === '/') {
            new __WEBPACK_IMPORTED_MODULE_7__models_WebsiteVisitor__["default"]({
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                sessionId: req.cookies['_ga']
            }).save(err => {
                if (err) {
                    __WEBPACK_IMPORTED_MODULE_5_winston___default.a.log('info', 'Failed to write MongoDB user tracking data due to', JSON.stringify(err));
                }
            });
        }

        next('route');
    });

    callback(null);
}, function setupGoogleAnalytics(callback) {
    if (!process.env.GOOGLE_ANALYTICS_ACCOUNT_ID) {
        callback(null);
        return;
    }

    __WEBPACK_IMPORTED_MODULE_5_winston___default.a.log('info', 'Google analytics configuration detected. Enabling analytics.');

    WebApp.use('/', __WEBPACK_IMPORTED_MODULE_4_universal_analytics___default.a.middleware(process.env.GOOGLE_ANALYTICS_ACCOUNT_ID, { cookieName: '_ga' }), function (req, res, next) {
        if (req.path === '/') {
            const visitor = req.visitor;
            const uaData = {
                ds: 'web',
                dp: '/',
                uip: req.ip,
                ua: req.headers['user-agent']
            };

            visitor.pageview(uaData, err => {
                if (err) {
                    __WEBPACK_IMPORTED_MODULE_5_winston___default.a.log('info', 'Failed to post Google analytics data due to', JSON.stringify(err), visitor, JSON.stringify(uaData));
                }
            });
        }

        next('route');
    });

    callback(null);
}, function startWebServer(callback) {
    WebApp.use('/api', __WEBPACK_IMPORTED_MODULE_6__server_api__["a" /* default */]);
    WebApp.use(__WEBPACK_IMPORTED_MODULE_2_express___default.a.static('static'));

    var server = WebApp.listen(webAppPort, () => {
        __WEBPACK_IMPORTED_MODULE_5_winston___default.a.log('info', 'Web server listening on port', webAppPort);
        callback(null);
    }).on('error', function onListenError(err) {
        __WEBPACK_IMPORTED_MODULE_5_winston___default.a.log('error', 'Web server failed to listen on port', webAppPort, err);
        callback(err);
    });
}], function final(err, result) {});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/**
 * Contains the RSVP information model.
 */





const GuestSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
    name: { type: String, required: true },
    email: String,
    meal: String,
    dietaryRestrictions: String,
    cocktailEvening: String,
    hangoverBrunch: String
});

const RSVPSchema = new __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
    rsvpId: { type: String, required: true },
    date: { type: Date, default: () => Date.now() },
    guest: { type: GuestSchema, required: true },
    willAttend: { type: Boolean, required: true },
    guestPlusOne: GuestSchema
});

module.exports = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('RSVP', RSVPSchema);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("uuid/v1");

/***/ })
/******/ ]);