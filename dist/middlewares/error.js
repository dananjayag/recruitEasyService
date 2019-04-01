'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.errorMiddleWare = errorMiddleWare;
function errorMiddleWare(err, req, res, next) {
    if (!!err) {
        return res.status(500).send('HTTP_SERVER_ERROR');
    }
}