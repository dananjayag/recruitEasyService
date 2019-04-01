'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.schema = undefined;
exports.validateCandidate = validateCandidate;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var candidateSchema = new _mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    created_by: {
        type: _mongoose2.default.SchemaTypes.ObjectId,
        ref: 'Recruiter'
    }
});

var schema = exports.schema = {
    name: _joi2.default.string().required().min(3).max(50),
    phone: _joi2.default.number().required().min(10),
    email: _joi2.default.string().email().required().min(6).max(100)
};

function validateCandidate(candidate, schema) {
    return _joi2.default.validate(candidate, schema);
}

var Candidate = _mongoose2.default.model('Candidate', candidateSchema);

exports.default = Candidate;