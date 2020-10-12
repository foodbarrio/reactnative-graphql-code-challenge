"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Schema = _mongoose["default"].Schema;
var appointmentSchema = new Schema({
  date: {
    type: _mongoose.Date,
    required: true
  },
  note: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectID,
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Appointment", appointmentSchema);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvYXBwb2ludG1lbnQudHMiXSwibmFtZXMiOlsiU2NoZW1hIiwibW9uZ29vc2UiLCJhcHBvaW50bWVudFNjaGVtYSIsImRhdGUiLCJ0eXBlIiwiRGF0ZSIsInJlcXVpcmVkIiwibm90ZSIsIlN0cmluZyIsInVzZXJJZCIsIlR5cGVzIiwiT2JqZWN0SUQiLCJyZWYiLCJ0aW1lc3RhbXBzIiwibW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxNQUFXLEdBQUdDLHFCQUFTRCxNQUE3QjtBQUVBLElBQU1FLGlCQUFpQixHQUFHLElBQUlGLE1BQUosQ0FDeEI7QUFDRUcsRUFBQUEsSUFBSSxFQUFFO0FBQ0pDLElBQUFBLElBQUksRUFBRUMsY0FERjtBQUVKQyxJQUFBQSxRQUFRLEVBQUU7QUFGTixHQURSO0FBS0VDLEVBQUFBLElBQUksRUFBRTtBQUNKSCxJQUFBQSxJQUFJLEVBQUVJLE1BREY7QUFFSkYsSUFBQUEsUUFBUSxFQUFFO0FBRk4sR0FMUjtBQVNFRyxFQUFBQSxNQUFNLEVBQUU7QUFDTkwsSUFBQUEsSUFBSSxFQUFFSixNQUFNLENBQUNVLEtBQVAsQ0FBYUMsUUFEYjtBQUVOQyxJQUFBQSxHQUFHLEVBQUUsTUFGQztBQUdOTixJQUFBQSxRQUFRLEVBQUU7QUFISjtBQVRWLENBRHdCLEVBZ0J4QjtBQUFFTyxFQUFBQSxVQUFVLEVBQUU7QUFBZCxDQWhCd0IsQ0FBMUI7O2VBbUJlWixxQkFBU2EsS0FBVCxDQUFlLGFBQWYsRUFBOEJaLGlCQUE5QixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlLCB7IERhdGUgfSBmcm9tIFwibW9uZ29vc2VcIjtcblxuY29uc3QgU2NoZW1hOiBhbnkgPSBtb25nb29zZS5TY2hlbWE7XG5cbmNvbnN0IGFwcG9pbnRtZW50U2NoZW1hID0gbmV3IFNjaGVtYShcbiAge1xuICAgIGRhdGU6IHtcbiAgICAgIHR5cGU6IERhdGUsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIG5vdGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIH0sXG4gICAgdXNlcklkOiB7XG4gICAgICB0eXBlOiBTY2hlbWEuVHlwZXMuT2JqZWN0SUQsXG4gICAgICByZWY6IFwiVXNlclwiLFxuICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgfSxcbiAgfSxcbiAgeyB0aW1lc3RhbXBzOiB0cnVlIH1cbik7XG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVsKFwiQXBwb2ludG1lbnRcIiwgYXBwb2ludG1lbnRTY2hlbWEpO1xuIl19