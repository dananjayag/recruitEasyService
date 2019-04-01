'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loginContoller = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _recruiters = require('../models/recruiters');

var _recruiters2 = _interopRequireDefault(_recruiters);

var _password = require('../utility/password');

var _jwt = require('../utility/jwt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var capitalize = function capitalize() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return str.toLowerCase();
};

var loginContoller = exports.loginContoller = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var body, recruiter, isValid, payload, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        body = _lodash2.default.pick(req.body, ['email', 'password']);
                        _context.prev = 1;
                        _context.next = 4;
                        return _recruiters2.default.findOne({ email: capitalize(body.email) });

                    case 4:
                        recruiter = _context.sent;

                        if (recruiter) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', res.status(401).send("Invalid email or password"));

                    case 7:
                        _context.next = 9;
                        return (0, _password.comparepassword)(recruiter.password, body.password);

                    case 9:
                        isValid = _context.sent;

                        if (!isValid) {
                            _context.next = 18;
                            break;
                        }

                        payload = { id: recruiter._id, email: recruiter.email };
                        _context.next = 14;
                        return (0, _jwt.generateJwtToken)(payload);

                    case 14:
                        token = _context.sent;

                        res.status(200).send(token);
                        _context.next = 19;
                        break;

                    case 18:
                        return _context.abrupt('return', res.status(401).send("Invalid email or password"));

                    case 19:
                        _context.next = 25;
                        break;

                    case 21:
                        _context.prev = 21;
                        _context.t0 = _context['catch'](1);

                        console.log(_context.t0);
                        return _context.abrupt('return', res.status(401).send("Invalid email or password"));

                    case 25:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 21]]);
    }));

    return function loginContoller(_x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();