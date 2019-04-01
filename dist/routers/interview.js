'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _interview = require('../controllers/interview');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = _express2.default.Router();

Router.get('/:id', _interview.getInterview);

Router.post('/', _interview.createInterview);

Router.put('/:id', _interview.updateInterview);

Router.post('/scheduleInterview', _interview.scheduleInterview);
//Router.delete('/:id', deleteInterview)

exports.default = Router;
module.exports = exports['default'];