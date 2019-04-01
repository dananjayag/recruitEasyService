'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCandidates = undefined;

var getCandidates = exports.getCandidates = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var candidates;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _candidate2.default.find();

                    case 3:
                        candidates = _context.sent;

                        if (!!candidates) {
                            res.status(200).send({ candidates: candidates });
                        }
                        next();
                        _context.next = 11;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        next();

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[0, 8]]);
    }));

    return function getCandidates(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var _candidate = require('../models/candidate');

var _candidate2 = _interopRequireDefault(_candidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }