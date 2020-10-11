"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(require("../sequelize"));

var User = _sequelize2["default"].define("user", {
  username: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVXNlci50cyJdLCJuYW1lcyI6WyJVc2VyIiwic2VxdWVsaXplIiwiZGVmaW5lIiwidXNlcm5hbWUiLCJ0eXBlIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwiYWxsb3dOdWxsIiwidW5pcXVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLHVCQUFVQyxNQUFWLENBQWlCLE1BQWpCLEVBQXlCO0FBQ3BDQyxFQUFBQSxRQUFRLEVBQUU7QUFDUkMsSUFBQUEsSUFBSSxFQUFFQyxxQkFBVUMsTUFEUjtBQUVSQyxJQUFBQSxTQUFTLEVBQUUsS0FGSDtBQUdSQyxJQUFBQSxNQUFNLEVBQUU7QUFIQTtBQUQwQixDQUF6QixDQUFiOztlQVFlUixJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVR5cGVzLCBTZXF1ZWxpemUgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5cbmltcG9ydCBzZXF1ZWxpemUgZnJvbSBcIi4uL3NlcXVlbGl6ZVwiO1xuXG5jb25zdCBVc2VyID0gc2VxdWVsaXplLmRlZmluZShcInVzZXJcIiwge1xuICB1c2VybmFtZToge1xuICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgICB1bmlxdWU6IHRydWUsXG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbiJdfQ==