'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendEmail = undefined;

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _nodemailerSendgridTransport = require('nodemailer-sendgrid-transport');

var _nodemailerSendgridTransport2 = _interopRequireDefault(_nodemailerSendgridTransport);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _icalGenerator = require('ical-generator');

var _icalGenerator2 = _interopRequireDefault(_icalGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var options = {
  service: 'SendGrid',
  auth: {
    api_key: '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'
  }
};

var cal = (0, _icalGenerator2.default)({
  domain: 'sebbo.net',
  prodId: { company: 'superman-industries.com', product: 'ical-generator' },
  name: 'My Testfeed',
  timezone: 'Europe/Berlin'
});

var sendEmail = exports.sendEmail = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var cc = _ref.cc,
        to = _ref.to,
        start = _ref.start,
        organizer = _ref.organizer,
        link = _ref.link,
        candidateName = _ref.candidateName;
    var transporter, eventObj, event, path, mailOptions, info;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            console.log({ cc: cc, to: to, start: start, organizer: organizer, link: link });
            transporter = _nodemailer2.default.createTransport((0, _nodemailerSendgridTransport2.default)(options));
            eventObj = {
              start: (0, _moment2.default)(start).format(),
              end: (0, _moment2.default)(start).add(1, 'hour').format(),
              summary: 'Interview with ' + cc,
              organizer: organizer + ' <' + cc + '>',
              id: (0, _v2.default)(),
              method: 'request',
              location: '' + (link ? link : 'Call Organizer for exact location')
            };
            event = cal.createEvent(eventObj);
            path = __dirname + '/uploads/' + eventObj.id + '.ics';

            cal.saveSync(path);

            mailOptions = {
              from: 'no-reply@recruitsimple.com', // sender address
              to: [to, cc], // list of receivers
              subject: 'Interview Scheduled  with  ' + candidateName + '\u2714', // Subject line
              text: "Looking forward to meeting you", // plain text body 
              attachments: [{ path: path }]
            };
            _context.next = 10;
            return transporter.sendMail(mailOptions);

          case 10:
            info = _context.sent;
            return _context.abrupt('return', info);

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', _context.t0);

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 14]]);
  }));

  return function sendEmail(_x) {
    return _ref2.apply(this, arguments);
  };
}();