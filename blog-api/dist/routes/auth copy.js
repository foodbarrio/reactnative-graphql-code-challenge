"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/loginAdmin", _auth.login);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXV0aCBjb3B5LnRzIl0sIm5hbWVzIjpbInJvdXRlciIsImV4cHJlc3MiLCJSb3V0ZXIiLCJwb3N0IiwibG9naW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBLElBQU1BLE1BQU0sR0FBR0Msb0JBQVFDLE1BQVIsRUFBZjs7QUFFQUYsTUFBTSxDQUFDRyxJQUFQLENBQVksYUFBWixFQUEyQkMsV0FBM0I7ZUFFZUosTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgeyBsb2dpbiB9IGZyb20gXCIuLi9jb250cm9sbGVycy9hdXRoXCI7XG5cbmNvbnN0IHJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XG5cbnJvdXRlci5wb3N0KFwiL2xvZ2luQWRtaW5cIiwgbG9naW4pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXX0=