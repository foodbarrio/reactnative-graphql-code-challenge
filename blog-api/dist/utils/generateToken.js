"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var generateToken = function generateToken(userId) {
  return _jsonwebtoken["default"].sign({
    userId: userId
  }, process.env.JWT_SECRET, {
    expiresIn: "2 days"
  });
};

var _default = generateToken;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9nZW5lcmF0ZVRva2VuLnRzIl0sIm5hbWVzIjpbImdlbmVyYXRlVG9rZW4iLCJ1c2VySWQiLCJqd3QiLCJzaWduIiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJleHBpcmVzSW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUVBLElBQU1BLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0MsTUFBRCxFQUFZO0FBQ2hDLFNBQU9DLHlCQUFJQyxJQUFKLENBQVM7QUFBRUYsSUFBQUEsTUFBTSxFQUFOQTtBQUFGLEdBQVQsRUFBcUJHLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxVQUFqQyxFQUE2QztBQUNsREMsSUFBQUEsU0FBUyxFQUFFO0FBRHVDLEdBQTdDLENBQVA7QUFHRCxDQUpEOztlQUtlUCxhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5cbmNvbnN0IGdlbmVyYXRlVG9rZW4gPSAodXNlcklkKSA9PiB7XG4gIHJldHVybiBqd3Quc2lnbih7IHVzZXJJZCB9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVULCB7XG4gICAgZXhwaXJlc0luOiBcIjIgZGF5c1wiLFxuICB9KTtcbn07XG5leHBvcnQgZGVmYXVsdCBnZW5lcmF0ZVRva2VuO1xuIl19