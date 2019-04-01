'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;
exports.validateInterview = validateInterview;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var roundSchema = new _mongoose.Schema({
  round: {
    type: Number
  },
  interview: {
    type: _mongoose2.default.SchemaTypes.ObjectId,
    ref: 'Interview'
  },
  scheduledAt: {
    type: Date
  },
  type: {
    type: String
  },
  interviewerName: {
    type: String
  },
  interviewerEmail: {
    type: String
  },
  status: {
    type: String,
    enum: ['Over', 'Yet to be Done'],
    default: 'Yet to be Done'
  },
  comments: {
    type: String
  }
});

var Round = _mongoose2.default.model('Round', roundSchema);

var interviewSchema = new _mongoose.Schema({
  recruiter: {
    type: _mongoose2.default.SchemaTypes.ObjectId,
    ref: 'Recruiter'
  },
  candidate: {
    ref: 'Candidate',
    type: _mongoose2.default.Schema.Types.ObjectId
  },
  job: {
    type: _mongoose2.default.SchemaTypes.ObjectId,
    ref: 'Jobs'
  },
  currentSalary: {
    type: Number
  },
  expectedSalary: {
    type: Number
  },
  status: {
    type: String,
    enum: ["Contacted", "In_Progress", "Scheduled", "Scheduled_but_Not_Attended", "Not_Cleared_Interview", "Closed_By_Recruiter", "Accepted", "Rejected", "Joined", "Accepted_but_Not_Joined"],
    default: 'Contacted'
  },
  rounds: [Round.schema]
});

var Interview = _mongoose2.default.model('Interview', interviewSchema);

var schema = exports.schema = {
  job: _joi2.default.string().required(),
  recruiter: _joi2.default.string().required(),
  candidate: _joi2.default.string().required(),
  currentSalary: _joi2.default.number(),
  expectedSalary: _joi2.default.number(),
  status: _joi2.default.string()
};

function validateInterview(interview) {
  return _joi2.default.validate(interview, schema);
}

exports.default = Interview;