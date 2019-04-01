'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateJwtToken = generateJwtToken;
exports.validateToken = validateToken;
exports.sanitizeToken = sanitizeToken;

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var jwtSecret = _config2.default.get("jwtsecret");

function generateJwtToken(payload) {
    var _this = this;

    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
            var token;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return _jsonwebtoken2.default.sign(payload, jwtSecret, { algorithm: 'HS256' });

                        case 3:
                            token = _context.sent;

                            if (token) {
                                resolve({ token: token });
                            } else {
                                reject(err);
                            }
                            _context.next = 10;
                            break;

                        case 7:
                            _context.prev = 7;
                            _context.t0 = _context['catch'](0);

                            reject(_context.t0);

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 7]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
}

function validateToken(token) {
    var _this2 = this;

    return new Promise(function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _jsonwebtoken2.default.verify(token, jwtSecret, function (err, decoded) {
                                if (!err) {
                                    resolve(decoded);
                                } else {
                                    reject(null);
                                }
                            });

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }());
}

function sanitizeToken(token) {
    /*
       @@token should start with key 'Authorization'
    */
    if (!!token && token.indexOf('Authorization') >= 0) {
        var splitArray = token.trim().split(' ');
        if (!!splitArray[splitArray.length - 1]) {
            return splitArray[splitArray.length - 1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}