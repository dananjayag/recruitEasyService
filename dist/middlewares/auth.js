'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.authMiddleware = undefined;

var authMiddleware = exports.authMiddleware = function () {
   var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, decodedToken;
      return regeneratorRuntime.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  if (req.headers.authorization) {
                     _context.next = 4;
                     break;
                  }

                  return _context.abrupt('return', res.status(403).json({ error: 'Invalid token' }));

               case 4:
                  token = (0, _jwt.sanitizeToken)(req.headers.authorization);

                  if (!token) {
                     _context.next = 18;
                     break;
                  }

                  _context.prev = 6;
                  _context.next = 9;
                  return (0, _jwt.validateToken)(token);

               case 9:
                  decodedToken = _context.sent;

                  if (!!decodedToken) {
                     req.locals = {};
                     req.locals.user = decodedToken;
                     next();
                  }
                  _context.next = 16;
                  break;

               case 13:
                  _context.prev = 13;
                  _context.t0 = _context['catch'](6);
                  return _context.abrupt('return', res.status(403).json({ error: 'Invalid token' }));

               case 16:
                  _context.next = 19;
                  break;

               case 18:
                  return _context.abrupt('return', res.status(403).json({ error: 'Invalid token' }));

               case 19:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, null, [[6, 13]]);
   }));

   return function authMiddleware(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
   };
}();

var _jwt = require('../utility/jwt');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }