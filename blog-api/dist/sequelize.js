"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var sequelize = new _sequelize.Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "postgres"
});
var _default = sequelize;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXF1ZWxpemUudHMiXSwibmFtZXMiOlsic2VxdWVsaXplIiwiU2VxdWVsaXplIiwiaG9zdCIsImRpYWxlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxTQUFTLEdBQUcsSUFBSUMsb0JBQUosQ0FBYyxVQUFkLEVBQTBCLE1BQTFCLEVBQWtDLFVBQWxDLEVBQThDO0FBQzlEQyxFQUFBQSxJQUFJLEVBQUUsV0FEd0Q7QUFFOURDLEVBQUFBLE9BQU8sRUFBRTtBQUZxRCxDQUE5QyxDQUFsQjtlQUtlSCxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VxdWVsaXplIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKFwiZGF0YWJhc2VcIiwgXCJ1c2VyXCIsIFwicGFzc3dvcmRcIiwge1xuICBob3N0OiBcImxvY2FsaG9zdFwiLFxuICBkaWFsZWN0OiBcInBvc3RncmVzXCIsXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgc2VxdWVsaXplO1xuIl19