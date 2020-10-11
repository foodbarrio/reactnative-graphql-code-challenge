"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Admin", adminSchema);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvYWRtaW4udHMiXSwibmFtZXMiOlsiU2NoZW1hIiwibW9uZ29vc2UiLCJhZG1pblNjaGVtYSIsImVtYWlsIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwicGFzc3dvcmQiLCJ0aW1lc3RhbXBzIiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBLElBQU1BLE1BQVcsR0FBR0MscUJBQVNELE1BQTdCO0FBRUEsSUFBTUUsV0FBVyxHQUFHLElBQUlGLE1BQUosQ0FDbEI7QUFDRUcsRUFBQUEsS0FBSyxFQUFFO0FBQ0xDLElBQUFBLElBQUksRUFBRUMsTUFERDtBQUVMQyxJQUFBQSxRQUFRLEVBQUU7QUFGTCxHQURUO0FBS0VDLEVBQUFBLFFBQVEsRUFBRTtBQUNSSCxJQUFBQSxJQUFJLEVBQUVDLE1BREU7QUFFUkMsSUFBQUEsUUFBUSxFQUFFO0FBRkY7QUFMWixDQURrQixFQVdsQjtBQUFFRSxFQUFBQSxVQUFVLEVBQUU7QUFBZCxDQVhrQixDQUFwQjs7ZUFjZVAscUJBQVNRLEtBQVQsQ0FBZSxPQUFmLEVBQXdCUCxXQUF4QixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5jb25zdCBTY2hlbWE6IGFueSA9IG1vbmdvb3NlLlNjaGVtYTtcblxuY29uc3QgYWRtaW5TY2hlbWEgPSBuZXcgU2NoZW1hKFxuICB7XG4gICAgZW1haWw6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgcGFzc3dvcmQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gIH0sXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbChcIkFkbWluXCIsIGFkbWluU2NoZW1hKTtcbiJdfQ==