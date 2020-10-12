"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _sequelize2 = _interopRequireDefault(require("../sequelize"));

var Post = _sequelize2["default"].define("post", {
  title: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
});

var _default = Post;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvUG9zdC50cyJdLCJuYW1lcyI6WyJQb3N0Iiwic2VxdWVsaXplIiwiZGVmaW5lIiwidGl0bGUiLCJ0eXBlIiwiRGF0YVR5cGVzIiwiU1RSSU5HIiwiYWxsb3dOdWxsIiwiY29udGVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsSUFBTUEsSUFBSSxHQUFHQyx1QkFBVUMsTUFBVixDQUFpQixNQUFqQixFQUF5QjtBQUNwQ0MsRUFBQUEsS0FBSyxFQUFFO0FBQ0xDLElBQUFBLElBQUksRUFBRUMscUJBQVVDLE1BRFg7QUFFTEMsSUFBQUEsU0FBUyxFQUFFO0FBRk4sR0FENkI7QUFLcENDLEVBQUFBLE9BQU8sRUFBRTtBQUNQSixJQUFBQSxJQUFJLEVBQUVDLHFCQUFVQyxNQURUO0FBRVBDLElBQUFBLFNBQVMsRUFBRTtBQUZKO0FBTDJCLENBQXpCLENBQWI7O2VBV2VQLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgc2VxdWVsaXplIGZyb20gXCIuLi9zZXF1ZWxpemVcIjtcblxuY29uc3QgUG9zdCA9IHNlcXVlbGl6ZS5kZWZpbmUoXCJwb3N0XCIsIHtcbiAgdGl0bGU6IHtcbiAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGFsbG93TnVsbDogZmFsc2UsXG4gIH0sXG4gIGNvbnRlbnQ6IHtcbiAgICB0eXBlOiBEYXRhVHlwZXMuU1RSSU5HLFxuICAgIGFsbG93TnVsbDogZmFsc2UsXG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgUG9zdDtcbiJdfQ==