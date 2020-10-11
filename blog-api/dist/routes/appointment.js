"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _auth = require("../controllers/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/appointment", _auth.login);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXMvYXBwb2ludG1lbnQudHMiXSwibmFtZXMiOlsicm91dGVyIiwiZXhwcmVzcyIsIlJvdXRlciIsInBvc3QiLCJsb2dpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBRUEsSUFBTUEsTUFBTSxHQUFHQyxvQkFBUUMsTUFBUixFQUFmOztBQUVBRixNQUFNLENBQUNHLElBQVAsQ0FBWSxjQUFaLEVBQTRCQyxXQUE1QjtlQUVlSixNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcbmltcG9ydCB7IGxvZ2luIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXJzL2F1dGhcIjtcblxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxucm91dGVyLnBvc3QoXCIvYXBwb2ludG1lbnRcIiwgbG9naW4pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXX0=