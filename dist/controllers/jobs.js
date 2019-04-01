'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createJob = exports.getJob = exports.getJobs = undefined;

var getJobs = exports.getJobs = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _ref2, _ref2$user, user, jobs;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _ref2 = req.locals || {}, _ref2$user = _ref2.user, user = _ref2$user === undefined ? {} : _ref2$user;
                        _context.next = 4;
                        return _job2.default.find({ created_by: user.id }).sort({ date_posted: -1 }).exec();

                    case 4:
                        jobs = _context.sent;

                        res.status(200).send(jobs);
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
        }, _callee, null, [[0, 8]]);
    }));

    return function getJobs(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var getJob = exports.getJob = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        var _ref4, _ref4$user, user, job, interviews;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _ref4 = req.locals || {}, _ref4$user = _ref4.user, user = _ref4$user === undefined ? {} : _ref4$user;
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _job2.default.findOne({ _id: req.params.id, created_by: user.id });

                    case 4:
                        job = _context2.sent;
                        _context2.next = 7;
                        return _interview2.default.find({ 'job': job._id }).populate('candidate');

                    case 7:
                        interviews = _context2.sent;

                        if (!!job && !!interviews) {
                            res.status(200).send({ job: job, interviews: interviews });
                        }
                        next();
                        _context2.next = 15;
                        break;

                    case 12:
                        _context2.prev = 12;
                        _context2.t0 = _context2['catch'](1);

                        next();

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, null, [[1, 12]]);
    }));

    return function getJob(_x3, _x4, _x5) {
        return _ref3.apply(this, arguments);
    };
}();

var createJob = exports.createJob = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var _ref6, _ref6$user, user, id, _req$body, _req$body$title, title, _req$body$min_salary, min_salary, _req$body$max_salary, max_salary, _req$body$date_posted, date_posted, _req$body$hiring_orga, hiring_organization, _req$body$job_locatio, job_location, _req$body$job_descrip, job_description, company_url, jobToCreate, _validateJob, error, job;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _ref6 = req.locals || {}, _ref6$user = _ref6.user, user = _ref6$user === undefined ? {} : _ref6$user;
                        id = user.id;
                        _req$body = req.body, _req$body$title = _req$body.title, title = _req$body$title === undefined ? "" : _req$body$title, _req$body$min_salary = _req$body.min_salary, min_salary = _req$body$min_salary === undefined ? 1 : _req$body$min_salary, _req$body$max_salary = _req$body.max_salary, max_salary = _req$body$max_salary === undefined ? 1 : _req$body$max_salary, _req$body$date_posted = _req$body.date_posted, date_posted = _req$body$date_posted === undefined ? new Date() : _req$body$date_posted, _req$body$hiring_orga = _req$body.hiring_organization, hiring_organization = _req$body$hiring_orga === undefined ? "" : _req$body$hiring_orga, _req$body$job_locatio = _req$body.job_location, job_location = _req$body$job_locatio === undefined ? "" : _req$body$job_locatio, _req$body$job_descrip = _req$body.job_description, job_description = _req$body$job_descrip === undefined ? "" : _req$body$job_descrip, company_url = _req$body.company_url;
                        jobToCreate = {
                            title: title,
                            min_salary: min_salary,
                            max_salary: max_salary,
                            date_posted: date_posted,
                            hiring_organization: hiring_organization,
                            job_location: job_location,
                            job_description: job_description,
                            company_url: company_url,
                            created_by: id
                        };
                        _validateJob = (0, _job.validateJob)(req.body), error = _validateJob.error;

                        if (!error) {
                            _context3.next = 7;
                            break;
                        }

                        return _context3.abrupt('return', res.status(400).send({ "error_message": error.details[0].message }));

                    case 7:
                        job = new _job2.default(jobToCreate);
                        _context3.prev = 8;
                        _context3.next = 11;
                        return job.save();

                    case 11:
                        res.status(200).send(job);
                        _context3.next = 17;
                        break;

                    case 14:
                        _context3.prev = 14;
                        _context3.t0 = _context3['catch'](8);

                        res.status(400).send({ err: _context3.t0 });

                    case 17:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, null, [[8, 14]]);
    }));

    return function createJob(_x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
    };
}();

var _job = require('../models/job');

var _job2 = _interopRequireDefault(_job);

var _interview = require('../models/interview');

var _interview2 = _interopRequireDefault(_interview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }