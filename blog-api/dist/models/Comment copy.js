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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQ29tbWVudCBjb3B5LnRzIl0sIm5hbWVzIjpbIkNvbW1lbnQiLCJzZXF1ZWxpemUiLCJkZWZpbmUiLCJjb250ZW50IiwidHlwZSIsIkRhdGFUeXBlcyIsIlNUUklORyIsImFsbG93TnVsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQyx1QkFBVUMsTUFBVixDQUFpQixTQUFqQixFQUE0QjtBQUMxQ0MsRUFBQUEsT0FBTyxFQUFFO0FBQ1BDLElBQUFBLElBQUksRUFBRUMscUJBQVVDLE1BRFQ7QUFFUEMsSUFBQUEsU0FBUyxFQUFFO0FBRko7QUFEaUMsQ0FBNUIsQ0FBaEI7O2VBT2VQLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhVHlwZXMgfSBmcm9tIFwic2VxdWVsaXplXCI7XG5pbXBvcnQgc2VxdWVsaXplIGZyb20gXCIuLi9zZXF1ZWxpemVcIjtcblxuY29uc3QgQ29tbWVudCA9IHNlcXVlbGl6ZS5kZWZpbmUoXCJjb21tZW50XCIsIHtcbiAgY29udGVudDoge1xuICAgIHR5cGU6IERhdGFUeXBlcy5TVFJJTkcsXG4gICAgYWxsb3dOdWxsOiBmYWxzZSxcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDb21tZW50O1xuIl19