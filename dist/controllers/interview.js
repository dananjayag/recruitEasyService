'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scheduleInterview = exports.updateInterview = exports.createInterview = exports.getInterview = undefined;

var getInterview = exports.getInterview = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var _ref2, _ref2$user, user, interview;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _ref2 = req.locals || {}, _ref2$user = _ref2.user, user = _ref2$user === undefined ? {} : _ref2$user;
                        _context.prev = 1;
                        _context.next = 4;
                        return _interview2.default.findById({ _id: req.params.id }).populate('candidate');

                    case 4:
                        interview = _context.sent;

                        if (!!interview) {
                            res.status(200).send({ interview: interview });
                        }
                        next();
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](1);

                        next();

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, null, [[1, 9]]);
    }));

    return function getInterview(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var createInterview = exports.createInterview = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var _ref4, _ref4$user, user, id, _req$body, job, candidate, _req$body$currentSala, currentSalary, _req$body$expectedSal, expectedSalary, _req$body$status, status, interviewToCreate, _validateInterview, error, interview, response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _ref4 = req.locals || {}, _ref4$user = _ref4.user, user = _ref4$user === undefined ? {} : _ref4$user;
                        id = user.id;
                        _req$body = req.body, job = _req$body.job, candidate = _req$body.candidate, _req$body$currentSala = _req$body.currentSalary, currentSalary = _req$body$currentSala === undefined ? 1 : _req$body$currentSala, _req$body$expectedSal = _req$body.expectedSalary, expectedSalary = _req$body$expectedSal === undefined ? 1 : _req$body$expectedSal, _req$body$status = _req$body.status, status = _req$body$status === undefined ? "Contacted" : _req$body$status;
                        interviewToCreate = {
                            job: job,
                            candidate: candidate,
                            recruiter: id,
                            currentSalary: currentSalary,
                            expectedSalary: expectedSalary,
                            status: status
                        };
                        _validateInterview = (0, _interview.validateInterview)(interviewToCreate), error = _validateInterview.error;

                        if (!error) {
                            _context2.next = 7;
                            break;
                        }

                        return _context2.abrupt('return', res.status(400).send({ "error_message": error.details[0].message }));

                    case 7:
                        interview = new _interview2.default(interviewToCreate);
                        _context2.prev = 8;
                        _context2.next = 11;
                        return interview.save();

                    case 11:
                        response = _context2.sent;
                        _context2.next = 14;
                        return _interview2.default.findById({ _id: response._id }).populate('candidate');

                    case 14:
                        interview = _context2.sent;

                        res.status(200).send(interview);
                        next();
                        _context2.next = 23;
                        break;

                    case 19:
                        _context2.prev = 19;
                        _context2.t0 = _context2['catch'](8);

                        res.status(400).send({ err: _context2.t0 });
                        next();

                    case 23:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, null, [[8, 19]]);
    }));

    return function createInterview(_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var updateInterview = exports.updateInterview = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var _ref6, _ref6$user, user, id, _req$body2, _req$body2$currentSal, currentSalary, _req$body2$expectedSa, expectedSalary, status, interview;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _ref6 = req.locals || {}, _ref6$user = _ref6.user, user = _ref6$user === undefined ? {} : _ref6$user;
                        id = user.id;
                        _req$body2 = req.body, _req$body2$currentSal = _req$body2.currentSalary, currentSalary = _req$body2$currentSal === undefined ? 1 : _req$body2$currentSal, _req$body2$expectedSa = _req$body2.expectedSalary, expectedSalary = _req$body2$expectedSa === undefined ? 1 : _req$body2$expectedSa, status = _req$body2.status;
                        _context3.prev = 3;
                        _context3.next = 6;
                        return _interview2.default.findByIdAndUpdate({ _id: req.params.id }, { currentSalary: currentSalary, expectedSalary: expectedSalary, status: status });

                    case 6:
                        interview = _context3.sent;

                        if (!!interview) {
                            res.status(200).send(interview);
                        } else {
                            next();
                        }
                        _context3.next = 14;
                        break;

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3['catch'](3);

                        res.status(400).send({ err: _context3.t0 });
                        next();

                    case 14:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, null, [[3, 10]]);
    }));

    return function updateInterview(_x7, _x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}();

var scheduleInterview = exports.scheduleInterview = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
        var _ref8, _ref8$user, user, id, _req$body3, link, scheduledAt, interviewId, recruiter, interview, info;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _ref8 = req.locals || {}, _ref8$user = _ref8.user, user = _ref8$user === undefined ? {} : _ref8$user;
                        id = user.id;
                        _req$body3 = req.body, link = _req$body3.link, scheduledAt = _req$body3.scheduledAt, interviewId = _req$body3.interviewId;

                        console.log("sent Obj ", { link: link, scheduledAt: scheduledAt, interviewId: interviewId });
                        _context4.prev = 4;
                        _context4.next = 7;
                        return _recruiters2.default.findById({ _id: id });

                    case 7:
                        recruiter = _context4.sent;
                        _context4.next = 10;
                        return _interview2.default.findById({ _id: interviewId }).populate('candidate');

                    case 10:
                        interview = _context4.sent;
                        _context4.next = 13;
                        return (0, _mailer.sendEmail)({ cc: recruiter.email, candidateName: interview.candidate.email, to: interview.candidate.email, start: scheduledAt, organizer: recruiter.name, link: link });

                    case 13:
                        info = _context4.sent;

                        if (!!info) {
                            res.status(200).send({ info: info });
                        } else {
                            next();
                        }
                        _context4.next = 20;
                        break;

                    case 17:
                        _context4.prev = 17;
                        _context4.t0 = _context4['catch'](4);

                        next();

                    case 20:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, null, [[4, 17]]);
    }));

    return function scheduleInterview(_x10, _x11, _x12) {
        return _ref7.apply(this, arguments);
    };
}();

var _icalGenerator = require('ical-generator');

var _icalGenerator2 = _interopRequireDefault(_icalGenerator);

var _interview = require('../models/interview');

var _interview2 = _interopRequireDefault(_interview);

var _recruiters = require('../models/recruiters');

var _recruiters2 = _interopRequireDefault(_recruiters);

var _mailer = require('../utility/mailer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }