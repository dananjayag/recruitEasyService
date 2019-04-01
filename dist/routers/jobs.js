'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jobs = require('../controllers/jobs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

Router.get('/', _jobs.getJobs);

Router.get('/:id', _jobs.getJob);

Router.post('/', _jobs.createJob);

// Router.put('/:id', updateJob)

// Router.delete('/:id', deleteJob)

exports.default = Router;
module.exports = exports['default'];