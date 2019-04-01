'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.putSchema = exports.postSchema = undefined;
exports.validateRecruiter = validateRecruiter;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recruiterSchema = new _mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100000
    },
    company: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    level: {
        type: String,
        enum: ['Bronze I', 'Bronze II', 'Bronze III', 'Bronze IV', 'Bronze V', 'Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Silver V', 'Gold I', 'Gold II', 'Gold III', 'Gold IV', 'Gold V', 'Diamond I', 'Diamond II', 'Diamond III', 'Diamond IV', 'Diamond V', 'Platinum I', 'Platinum II', 'Platinum III', 'Platinum IV', 'Platinum V', 'Master I', 'Master II', 'Master III', 'Master IV', 'Master V'],
        default: 'Bronze I'
    }

});

var postSchema = exports.postSchema = {

    name: _joi2.default.string().required().min(3).max(50),
    phone: _joi2.default.number().required().min(10),
    email: _joi2.default.string().email().required().min(6).max(100),
    company: _joi2.default.string().required().min(3).max(30),
    password: _joi2.default.string().required().min(8).max(1000)

};

var putSchema = exports.putSchema = {
    name: _joi2.default.string().required().min(3).max(50),
    phone: _joi2.default.number().required().min(10),
    company: _joi2.default.string().required().min(3).max(30)
};

function validateRecruiter(recruiter, schema) {
    return _joi2.default.validate(recruiter, schema);
}

var Recruiter = _mongoose2.default.model('Recruiter', recruiterSchema);

exports.default = Recruiter;