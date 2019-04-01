'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = undefined;
exports.validateJob = validateJob;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _interview = require('./interview');

var _interview2 = _interopRequireDefault(_interview);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jobSchema = new _mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    min_salary: {
        type: Number,
        default: 0
    },
    max_salary: {
        type: Number,
        default: 0
    },
    date_posted: {
        type: Date
    },
    hiring_organization: {
        type: String
    },
    job_location: {
        type: String
    },
    created_by: {
        type: _mongoose2.default.SchemaTypes.ObjectId,
        ref: 'Recruiter'
    },
    job_description: {
        type: String
    },
    company_url: {
        type: String
    }
});

var Jobs = _mongoose2.default.model('Jobs', jobSchema);

var schema = exports.schema = {
    title: _joi2.default.string().required(),
    hiring_organization: _joi2.default.string().required(),
    job_description: _joi2.default.string(),
    created_by: _joi2.default.string(),
    min_salary: _joi2.default.number(),
    max_salary: _joi2.default.number(),
    date_posted: _joi2.default.date(),
    company_url: _joi2.default.string(),
    job_location: _joi2.default.string()
};

function validateJob(job) {
    return _joi2.default.validate(job, schema);
}

exports.default = Jobs;