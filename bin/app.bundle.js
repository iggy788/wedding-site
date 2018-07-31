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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Contains the Web site visitor tracking information model.
 */



var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebsiteVisitorSchema = new _mongoose2.default.Schema({
    date: { type: Date, default: function _default() {
            return Date.now();
        } },
    ip: { type: String },
    userAgent: { type: String },
    sessionId: { type: String }
});

module.exports = _mongoose2.default.model('WebsiteVisitor', WebsiteVisitorSchema);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Implements the server API.
 */



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bodyParser = __webpack_require__(10);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _v = __webpack_require__(11);

var _v2 = _interopRequireDefault(_v);

var _winston = __webpack_require__(2);

var _winston2 = _interopRequireDefault(_winston);

var _RSVP = __webpack_require__(9);

var _RSVP2 = _interopRequireDefault(_RSVP);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup the web server handlers
var ServerAPI = (0, _express2.default)();

// Ensure we can parse JSON-encoded requests
ServerAPI.use(_bodyParser2.default.json());

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
    var requestId = (0, _v2.default)();
    _winston2.default.log('debug', 'rsvp request', requestId, req.body);

    var guestRSVPDocument = {
        rsvpId: requestId,
        guest: req.body.guest,
        willAttend: req.body.willAttend
    };

    if (req.body.guestPlusOne) {
        guestRSVPDocument.guestPlusOne = req.body.guestPlusOne;
    }

    new _RSVP2.default(guestRSVPDocument).save(function (err) {
        var code = 200;
        var responseJson = {
            requestId: requestId
        };

        if (err) {
            _winston2.default.log('info', 'mongodb write failed', requestId, req.body, err);
            code = 500;
            responseJson.error = 'Failed to persist reservation to database';
        }

        res.status(code).json(responseJson);

        _winston2.default.log('debug', 'rsvp response', requestId, responseJson);
    });
});

exports.default = ServerAPI;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("universal-analytics");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Main entry point for the express server.
 */



var _async = __webpack_require__(5);

var _async2 = _interopRequireDefault(_async);

var _cookieParser = __webpack_require__(6);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _universalAnalytics = __webpack_require__(7);

var _universalAnalytics2 = _interopRequireDefault(_universalAnalytics);

var _winston = __webpack_require__(2);

var _winston2 = _interopRequireDefault(_winston);

var _serverApi = __webpack_require__(4);

var _serverApi2 = _interopRequireDefault(_serverApi);

var _WebsiteVisitor = __webpack_require__(3);

var _WebsiteVisitor2 = _interopRequireDefault(_WebsiteVisitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Avoid mongoose Promise deprecation warning
_mongoose2.default.Promise = global.Promise;

// Web server port
var webAppPort = process.env.PORT || 8000;

// MongoDB connection string
var mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding';

// Logging level
_winston2.default.level = process.env.LOG_LEVEL || 'debug';

// The Web server chain
var WebApp = (0, _express2.default)();
WebApp.set('trust proxy', true);

// Execute the initialization sequence
_async2.default.waterfall([function setupMongoDBConnection(callback) {
    _mongoose2.default.connect(mongodbUri, function (err, res) {
        if (err) {
            _winston2.default.log('error', 'Failed to connect to mongodb', mongodbUri, err);
            callback(err);
        } else {
            _winston2.default.log('debug', 'Successfully connected to mongodb', mongodbUri, res);
            callback(null);
        }
    });
}, function setupMongoDBUserTracking(callback) {
    WebApp.use('/', (0, _cookieParser2.default)(), function (req, res, next) {
        if (req.path === '/') {
            new _WebsiteVisitor2.default({
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                sessionId: req.cookies['_ga']
            }).save(function (err) {
                if (err) {
                    _winston2.default.log('info', 'Failed to write MongoDB user tracking data due to', JSON.stringify(err));
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

    _winston2.default.log('info', 'Google analytics configuration detected. Enabling analytics.');

    WebApp.use('/', _universalAnalytics2.default.middleware(process.env.GOOGLE_ANALYTICS_ACCOUNT_ID, { cookieName: '_ga' }), function (req, res, next) {
        if (req.path === '/') {
            var visitor = req.visitor;
            var uaData = {
                ds: 'web',
                dp: '/',
                uip: req.ip,
                ua: req.headers['user-agent']
            };

            visitor.pageview(uaData, function (err) {
                if (err) {
                    _winston2.default.log('info', 'Failed to post Google analytics data due to', JSON.stringify(err), visitor, JSON.stringify(uaData));
                }
            });
        }

        next('route');
    });

    callback(null);
}, function startWebServer(callback) {
    WebApp.use('/api', _serverApi2.default);
    WebApp.use(_express2.default.static('static'));

    var server = WebApp.listen(webAppPort, function () {
        _winston2.default.log('info', 'Web server listening on port', webAppPort);
        callback(null);
    }).on('error', function onListenError(err) {
        _winston2.default.log('error', 'Web server failed to listen on port', webAppPort, err);
        callback(err);
    });
}], function final(err, result) {});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Contains the RSVP information model.
 */



var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GuestSchema = new _mongoose2.default.Schema({
    name: { type: String, required: true },
    email: String,
    meal: String,
    dietaryRestrictions: String,
    cocktailEvening: String,
    hangoverBrunch: String
});

var RSVPSchema = new _mongoose2.default.Schema({
    rsvpId: { type: String, required: true },
    date: { type: Date, default: function _default() {
            return Date.now();
        } },
    guest: { type: GuestSchema, required: true },
    willAttend: { type: Boolean, required: true },
    guestPlusOne: GuestSchema
});

module.exports = _mongoose2.default.model('RSVP', RSVPSchema);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("uuid/v1");

/***/ })
/******/ ]);