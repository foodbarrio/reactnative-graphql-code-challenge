"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(require("../sequelize"));

var Comment = _sequelize2["default"].define("comment", {
  content: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
});

var _default = Comment;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQ29tbWVudC50cyJdLCJuYW1lcyI6WyJDb21tZW50Iiwic2VxdWVsaXplIiwiZGVmaW5lIiwiY29udGVudCIsInR5cGUiLCJEYXRhVHlwZXMiLCJTVFJJTkciLCJhbGxvd051bGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBLElBQU1BLE9BQU8sR0FBR0MsdUJBQVVDLE1BQVYsQ0FBaUIsU0FBakIsRUFBNEI7QUFDMUNDLEVBQUFBLE9BQU8sRUFBRTtBQUNQQyxJQUFBQSxJQUFJLEVBQUVDLHFCQUFVQyxNQURUO0FBRVBDLElBQUFBLFNBQVMsRUFBRTtBQUZKO0FBRGlDLENBQTVCLENBQWhCOztlQU9lUCxPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0IHNlcXVlbGl6ZSBmcm9tIFwiLi4vc2VxdWVsaXplXCI7XG5cbmNvbnN0IENvbW1lbnQgPSBzZXF1ZWxpemUuZGVmaW5lKFwiY29tbWVudFwiLCB7XG4gIGNvbnRlbnQ6IHtcbiAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGFsbG93TnVsbDogZmFsc2UsXG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudDtcbiJdfQ==