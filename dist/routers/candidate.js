'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _candidate = require('../models/candidate');

var _candidate2 = _interopRequireDefault(_candidate);

var _interview = require('../models/interview');

var _interview2 = _interopRequireDefault(_interview);

var _auth = require('../middlewares/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = _express2.default.Router();

Router.get('/', _auth.authMiddleware, function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$query$search, search, candidates, _candidates;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _req$query$search = req.query.search, search = _req$query$search === undefined ? "" : _req$query$search;
                        _context.prev = 1;

                        if (!(!!req.locals && !!req.locals.user && search)) {
                            _context.next = 9;
                            break;
                        }

                        _context.next = 5;
                        return _candidate2.default.find({ email: { $regex: '.*' + search + '.*' } });

                    case 5:
                        candidates = _context.sent;

                        res.status(200).send(candidates);
                        _context.next = 13;
                        break;

                    case 9:
                        _context.next = 11;
                        return _interview2.default.find({ created_by: req.locals.user.id }).select("candidate").populate("candidate").exec();

                    case 11:
                        _candidates = _context.sent;

                        res.status(200).send(_candidates);

                    case 13:
                        _context.next = 18;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](1);

                        res.status(500).send({ err: _context.t0 });

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, null, [[1, 15]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

Router.get('/:id', _auth.authMiddleware, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var candidate;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _candidate2.default.findOne({ _id: req.params.id });

                    case 3:
                        candidate = _context2.sent;

                        if (candidate) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send({ error: "Candidate doesn't exist" }));

                    case 6:
                        res.status(200).send(candidate);
                        _context2.next = 12;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](0);

                        res.status(400).send({ error: "Invalid Id" });

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, null, [[0, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

Router.post('/', _auth.authMiddleware, function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var _validateCandidate, error, iscandidateExist, body, candidate, user;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        // Validating request
                        _validateCandidate = (0, _candidate.validateCandidate)(req.body, _candidate.schema), error = _validateCandidate.error;

                        if (!error) {
                            _context3.next = 3;
                            break;
                        }

                        return _context3.abrupt('return', res.status(400).send({ "error_message": error.details[0].message }));

                    case 3:
                        _context3.next = 5;
                        return _candidate2.default.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });

                    case 5:
                        iscandidateExist = _context3.sent;

                        if (!iscandidateExist) {
                            _context3.next = 8;
                            break;
                        }

                        return _context3.abrupt('return', res.status(409).send({ "error_message": "candidate already exist" }));

                    case 8:

                        //storing in DB
                        body = _lodash2.default.pick(req.body, ['name', 'phone', 'email']);

                        body.created_by = req.locals.user.id;
                        candidate = new _candidate2.default(body);
                        _context3.prev = 11;
                        _context3.next = 14;
                        return candidate.save();

                    case 14:
                        user = _context3.sent;

                        res.status(200).send(user);
                        _context3.next = 21;
                        break;

                    case 18:
                        _context3.prev = 18;
                        _context3.t0 = _context3['catch'](11);

                        res.status(400).send({ err: _context3.t0 });

                    case 21:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, null, [[11, 18]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

Router.put('/:id', _auth.authMiddleware, function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var candidate, body, _validateCandidate2, error, updatedCandidate;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _candidate2.default.findOne({ _id: req.params.id });

                    case 2:
                        candidate = _context4.sent;

                        if (candidate) {
                            _context4.next = 5;
                            break;
                        }

                        return _context4.abrupt('return', res.status(400).send({ "error_message": "Invalid Id" }));

                    case 5:
                        body = _lodash2.default.pick(req.body, ["name", "email", "phone"]);
                        _validateCandidate2 = (0, _candidate.validateCandidate)(body, _candidate.schema), error = _validateCandidate2.error;

                        if (!error) {
                            _context4.next = 9;
                            break;
                        }

                        return _context4.abrupt('return', res.status(400).send({ "error_message": error.details[0].message }));

                    case 9:
                        _context4.prev = 9;
                        _context4.next = 12;
                        return _candidate2.default.findOneAndUpdate({ $and: [{ _id: req.params.id }, { created_by: req.locals.user.id }] }, { name: body.name, phone: body.phone, email: body.email }, { new: true }).select({ password: 0 });

                    case 12:
                        updatedCandidate = _context4.sent;

                        res.status(201).send(updatedCandidate);
                        _context4.next = 20;
                        break;

                    case 16:
                        _context4.prev = 16;
                        _context4.t0 = _context4['catch'](9);

                        console.log(_context4.t0);
                        res.status(409).send(_context4.t0);

                    case 20:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, null, [[9, 16]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

exports.default = Router;
module.exports = exports['default'];