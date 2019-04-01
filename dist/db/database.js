'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Database = function () {
    function Database() {
        _classCallCheck(this, Database);

        this._construct();
    }

    _createClass(Database, [{
        key: '_construct',
        value: function _construct() {
            var dbConfigs = _config2.default.get("dbConfig");
            var uri = 'mongodb://' + dbConfigs.username + ':' + dbConfigs.password + '@' + dbConfigs.domain + ':' + dbConfigs.port + '/' + dbConfigs.dbname;
            _mongoose2.default.connect(uri, {
                connectTimeoutMS: 5000,
                useNewUrlParser: true
            }, function (err) {
                if (!err) {
                    console.log("Connected to DB");
                } else {
                    throw new Error(err.message);
                    process.exit(1);
                }
            });
        }
    }]);

    return Database;
}();

exports.default = new Database();
module.exports = exports['default'];