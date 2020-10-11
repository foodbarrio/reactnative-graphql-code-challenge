"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(require("../sequelize"));

var Like = _sequelize2["default"].define("like", {
  commentId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  },
  postId: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: true
  }
});

var _default = Like;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvTGlrZS50cyJdLCJuYW1lcyI6WyJMaWtlIiwic2VxdWVsaXplIiwiZGVmaW5lIiwiY29tbWVudElkIiwidHlwZSIsIkRhdGFUeXBlcyIsIklOVEVHRVIiLCJhbGxvd051bGwiLCJwb3N0SWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVBLElBQU1BLElBQUksR0FBR0MsdUJBQVVDLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUI7QUFDcENDLEVBQUFBLFNBQVMsRUFBRTtBQUNUQyxJQUFBQSxJQUFJLEVBQUVDLHFCQUFVQyxPQURQO0FBRVRDLElBQUFBLFNBQVMsRUFBRTtBQUZGLEdBRHlCO0FBS3BDQyxFQUFBQSxNQUFNLEVBQUU7QUFDTkosSUFBQUEsSUFBSSxFQUFFQyxxQkFBVUMsT0FEVjtBQUVOQyxJQUFBQSxTQUFTLEVBQUU7QUFGTDtBQUw0QixDQUF6QixDQUFiOztlQVdlUCxJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YVR5cGVzIH0gZnJvbSBcInNlcXVlbGl6ZVwiO1xuaW1wb3J0IHNlcXVlbGl6ZSBmcm9tIFwiLi4vc2VxdWVsaXplXCI7XG5cbmNvbnN0IExpa2UgPSBzZXF1ZWxpemUuZGVmaW5lKFwibGlrZVwiLCB7XG4gIGNvbW1lbnRJZDoge1xuICAgIHR5cGU6IERhdGFUeXBlcy5JTlRFR0VSLFxuICAgIGFsbG93TnVsbDogdHJ1ZSxcbiAgfSxcbiAgcG9zdElkOiB7XG4gICAgdHlwZTogRGF0YVR5cGVzLklOVEVHRVIsXG4gICAgYWxsb3dOdWxsOiB0cnVlLFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IExpa2U7XG4iXX0=