'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _recruiters2 = require('../models/recruiters');

var _recruiters3 = _interopRequireDefault(_recruiters2);

var _password = require('../utility/password');

var _crypto = require('crypto');

var _url = require('url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Router = _express2.default.Router();

Router.get('/', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _recruiters;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _recruiters3.default.find().select({ password: 0 }).sort("name");

                    case 3:
                        _recruiters = _context.sent;

                        res.status(200).send(_recruiters);
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        res.status(500).send(recruiters);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

Router.get('/:id', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var recruiter;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _recruiters3.default.findOne({ _id: req.params.id }).select({ password: 0 });

                    case 3:
                        recruiter = _context2.sent;

                        if (recruiter) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send({ error: "User doesn't exist" }));

                    case 6:
                        res.status(200).send(recruiter);
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
        }, _callee2, undefined, [[0, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

Router.post('/', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var _validateRecruiter, error, isrecruiterExist, user, recruiter, _user, response;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        // Validating request
                        _validateRecruiter = (0, _recruiters2.validateRecruiter)(req.body, _recruiters2.postSchema), error = _validateRecruiter.error;

                        if (!error) {
                            _context3.next = 3;
                            break;
                        }

                        return _context3.abrupt('return', res.status(400).send({ "error_message": error.details[0].message }));

                    case 3:
                        _context3.next = 5;
                        return _recruiters3.default.findOne({ email: req.body.email });

                    case 5:
                        isrecruiterExist = _context3.sent;

                        if (!isrecruiterExist) {
                            _context3.next = 8;
                            break;
                        }

                        return _context3.abrupt('return', res.status(409).send({ "error_message": "user already exist" }));

                    case 8:
                        _context3.next = 10;
                        return (0, _password.hashPassword)(req.body);

                    case 10:
                        user = _context3.sent;
                        recruiter = new _recruiters3.default(user);
                        _context3.prev = 12;
                        _context3.next = 15;
                        return recruiter.save();

                    case 15:
                        _user = _context3.sent;
                        response = {
                            _id: _user._id,
                            name: _user.name,
                            email: _user.email,
                            company: _user.company,
                            phone: _user.phone
                        };

                        res.status(200).send(response);
                        _context3.next = 23;
                        break;

                    case 20:
                        _context3.prev = 20;
                        _context3.t0 = _context3['catch'](12);

                        res.status(400).send({ err: _context3.t0 });

                    case 23:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[12, 20]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

Router.put('/:id', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var recruiter, body, _validateRecruiter2, error, updatedRecruiter;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.next = 2;
                        return _recruiters3.default.findOne({ _id: req.params.id });

                    case 2:
                        recruiter = _context4.sent;

                        if (recruiter) {
                            _context4.next = 5;
                            break;
                        }

                        return _context4.abrupt('return', res.status(400).send({ "error_message": "Invalid Id" }));

                    case 5:
                        body = _lodash2.default.pick(req.body, ["name", "company", "phone"]);
                        _validateRecruiter2 = (0, _recruiters2.validateRecruiter)(body, _recruiters2.putSchema), error = _validateRecruiter2.error;

                        if (!error) {
                            _context4.next = 9;
                            break;
                        }

                        return _context4.abrupt('return', res.status(400).send({ "error_message": error.details[0].message }));

                    case 9:
                        _context4.prev = 9;
                        _context4.next = 12;
                        return _recruiters3.default.findOneAndUpdate({ _id: req.params.id }, { name: body.name, company: body.company, phone: body.phone }, { new: true }).select({ password: 0 });

                    case 12:
                        updatedRecruiter = _context4.sent;

                        res.status(201).send(updatedRecruiter);
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
        }, _callee4, undefined, [[9, 16]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

Router.delete('/:id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var recruiter;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return _recruiters3.default.findOneAndDelete(req.params.id);

                    case 2:
                        recruiter = _context5.sent;

                        if (recruiter) {
                            _context5.next = 5;
                            break;
                        }

                        return _context5.abrupt('return', res.status(400).send({ "error_message": "Invalid Id" }));

                    case 5:
                        res.status(202).send(recruiter);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}());

exports.default = Router;
module.exports = exports['default'];