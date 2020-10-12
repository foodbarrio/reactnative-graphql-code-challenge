"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAppointment = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var d = _typeof((0, _moment["default"])("4/30/2016"));

var createAppointment = function createAppointment(req, res, next) {
  var date = req.body.date;
};

exports.createAppointment = createAppointment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9hcHBvaW50bWVudC50cyJdLCJuYW1lcyI6WyJkIiwiY3JlYXRlQXBwb2ludG1lbnQiLCJyZXEiLCJyZXMiLCJuZXh0IiwiZGF0ZSIsImJvZHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQTs7Ozs7O0FBQ0EsSUFBTUEsQ0FBQyxXQUFVLHdCQUFPLFdBQVAsQ0FBVixDQUFQOztBQUNPLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVgsRUFBb0I7QUFDbkQsTUFBTUMsSUFBcUIsR0FBR0gsR0FBRyxDQUFDSSxJQUFKLENBQVNELElBQXZDO0FBQ0QsQ0FGTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCBBZG1pbiBmcm9tIFwiLi4vbW9kZWxzL2FkbWluXCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnRcIjtcbmNvbnN0IGQgPSB0eXBlb2YgbW9tZW50KFwiNC8zMC8yMDE2XCIpO1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUFwcG9pbnRtZW50ID0gKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGNvbnN0IGRhdGU6IERhdGVDb25zdHJ1Y3RvciA9IHJlcS5ib2R5LmRhdGU7XG59O1xuIl19