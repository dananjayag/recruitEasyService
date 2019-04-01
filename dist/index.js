'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _database = require('./db/database');

var _database2 = _interopRequireDefault(_database);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _joiObjectid = require('joi-objectid');

var _joiObjectid2 = _interopRequireDefault(_joiObjectid);

var _recruiter = require('./routers/recruiter');

var _recruiter2 = _interopRequireDefault(_recruiter);

var _jobs = require('./routers/jobs');

var _jobs2 = _interopRequireDefault(_jobs);

var _auth = require('./routers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _candidate = require('./routers/candidate');

var _candidate2 = _interopRequireDefault(_candidate);

var _interview = require('./routers/interview');

var _interview2 = _interopRequireDefault(_interview);

var _error = require('./middlewares/error');

var _auth3 = require('./middlewares/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_joi2.default.objectId = (0, _joiObjectid2.default)(_joi2.default);

var PORT = process.env.PORT || 3001;
var app = (0, _express2.default)();
process.on('unhandledRejection', function (err) {
    console.log("Something went wrong ", err);
    process.exit(1);
});
process.on('uncaughtException', function (err) {
    console.log("Something went wrong ", err);
    process.exit(1);
});
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use('/api/v1/auth', _auth2.default);
app.use('/api/v1/recruiter', _auth3.authMiddleware, _recruiter2.default);
app.use('/api/v1/candidate', _auth3.authMiddleware, _candidate2.default);
app.use('/api/v1/interview', _auth3.authMiddleware, _interview2.default);
app.use('/api/v1/job', _auth3.authMiddleware, _jobs2.default);
app.use(_error.errorMiddleWare);

app.listen(PORT, function () {
    console.log("Started Server in port number 3000");
});