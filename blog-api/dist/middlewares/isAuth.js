"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isAuth = void 0;

var _apolloServerExpress = require("apollo-server-express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var isAuth = function isAuth(req, res) {
  var token;

  try {
    token = req.get("Authorization").split(" ")[1];
  } catch (err) {
    var error = new _apolloServerExpress.ApolloError("Not authenticated.", "401");
    error.statusCode = 401;
    res.status(401).json({
      message: error.message
    });
    throw error;
  }

  var decodedToken;

  try {
    decodedToken = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
  } catch (err) {
    var code = "500";
    var message = "internal server error";
    err.statusCode = 500;
    res.status(500).json({
      message: "internal server error"
    });
    throw new _apolloServerExpress.ApolloError(message, code);
  }

  if (!decodedToken) {
    var _error = new _apolloServerExpress.ApolloError("Not authenticated.", "401");

    res.status(401).json({
      message: _error.message
    });
    _error.statusCode = 401;
    throw _error;
  }

  return decodedToken.userId;
};

exports.isAuth = isAuth;
var _default = isAuth;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlcy9pc0F1dGgudHMiXSwibmFtZXMiOlsiaXNBdXRoIiwicmVxIiwicmVzIiwidG9rZW4iLCJnZXQiLCJzcGxpdCIsImVyciIsImVycm9yIiwiQXBvbGxvRXJyb3IiLCJzdGF0dXNDb2RlIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJkZWNvZGVkVG9rZW4iLCJqd3QiLCJ2ZXJpZnkiLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImNvZGUiLCJ1c2VySWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUVPLElBQU1BLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUNDLEdBQUQsRUFBTUMsR0FBTixFQUFjO0FBQ2xDLE1BQUlDLEtBQUo7O0FBQ0EsTUFBSTtBQUNGQSxJQUFBQSxLQUFLLEdBQUdGLEdBQUcsQ0FBQ0csR0FBSixDQUFRLGVBQVIsRUFBeUJDLEtBQXpCLENBQStCLEdBQS9CLEVBQW9DLENBQXBDLENBQVI7QUFDRCxHQUZELENBRUUsT0FBT0MsR0FBUCxFQUFZO0FBQ1osUUFBTUMsS0FBSyxHQUFHLElBQUlDLGdDQUFKLENBQWdCLG9CQUFoQixFQUFzQyxLQUF0QyxDQUFkO0FBQ0FELElBQUFBLEtBQUssQ0FBQ0UsVUFBTixHQUFtQixHQUFuQjtBQUNBUCxJQUFBQSxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxNQUFBQSxPQUFPLEVBQUVMLEtBQUssQ0FBQ0s7QUFBakIsS0FBckI7QUFDQSxVQUFNTCxLQUFOO0FBQ0Q7O0FBQ0QsTUFBSU0sWUFBSjs7QUFDQSxNQUFJO0FBQ0ZBLElBQUFBLFlBQVksR0FBR0MseUJBQUlDLE1BQUosQ0FBV1osS0FBWCxFQUFrQmEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLFVBQTlCLENBQWY7QUFDRCxHQUZELENBRUUsT0FBT1osR0FBUCxFQUFZO0FBQ1osUUFBTWEsSUFBSSxHQUFHLEtBQWI7QUFDQSxRQUFNUCxPQUFPLEdBQUcsdUJBQWhCO0FBQ0FOLElBQUFBLEdBQUcsQ0FBQ0csVUFBSixHQUFpQixHQUFqQjtBQUNBUCxJQUFBQSxHQUFHLENBQUNRLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQjtBQUFFQyxNQUFBQSxPQUFPLEVBQUU7QUFBWCxLQUFyQjtBQUNBLFVBQU0sSUFBSUosZ0NBQUosQ0FBZ0JJLE9BQWhCLEVBQXlCTyxJQUF6QixDQUFOO0FBQ0Q7O0FBQ0QsTUFBSSxDQUFDTixZQUFMLEVBQW1CO0FBQ2pCLFFBQU1OLE1BQUssR0FBRyxJQUFJQyxnQ0FBSixDQUFnQixvQkFBaEIsRUFBc0MsS0FBdEMsQ0FBZDs7QUFDQU4sSUFBQUEsR0FBRyxDQUFDUSxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUI7QUFBRUMsTUFBQUEsT0FBTyxFQUFFTCxNQUFLLENBQUNLO0FBQWpCLEtBQXJCO0FBQ0FMLElBQUFBLE1BQUssQ0FBQ0UsVUFBTixHQUFtQixHQUFuQjtBQUNBLFVBQU1GLE1BQU47QUFDRDs7QUFDRCxTQUFPTSxZQUFZLENBQUNPLE1BQXBCO0FBQ0QsQ0EzQk07OztlQTZCUXBCLE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcG9sbG9FcnJvciB9IGZyb20gXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIjtcbmltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xuXG5leHBvcnQgY29uc3QgaXNBdXRoID0gKHJlcSwgcmVzKSA9PiB7XG4gIGxldCB0b2tlbjtcbiAgdHJ5IHtcbiAgICB0b2tlbiA9IHJlcS5nZXQoXCJBdXRob3JpemF0aW9uXCIpLnNwbGl0KFwiIFwiKVsxXTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgQXBvbGxvRXJyb3IoXCJOb3QgYXV0aGVudGljYXRlZC5cIiwgXCI0MDFcIik7XG4gICAgZXJyb3Iuc3RhdHVzQ29kZSA9IDQwMTtcbiAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbiAgbGV0IGRlY29kZWRUb2tlbjtcbiAgdHJ5IHtcbiAgICBkZWNvZGVkVG9rZW4gPSBqd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc3QgY29kZSA9IFwiNTAwXCI7XG4gICAgY29uc3QgbWVzc2FnZSA9IFwiaW50ZXJuYWwgc2VydmVyIGVycm9yXCI7XG4gICAgZXJyLnN0YXR1c0NvZGUgPSA1MDA7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcImludGVybmFsIHNlcnZlciBlcnJvclwiIH0pO1xuICAgIHRocm93IG5ldyBBcG9sbG9FcnJvcihtZXNzYWdlLCBjb2RlKTtcbiAgfVxuICBpZiAoIWRlY29kZWRUb2tlbikge1xuICAgIGNvbnN0IGVycm9yID0gbmV3IEFwb2xsb0Vycm9yKFwiTm90IGF1dGhlbnRpY2F0ZWQuXCIsIFwiNDAxXCIpO1xuICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgICBlcnJvci5zdGF0dXNDb2RlID0gNDAxO1xuICAgIHRocm93IGVycm9yO1xuICB9XG4gIHJldHVybiBkZWNvZGVkVG9rZW4udXNlcklkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaXNBdXRoO1xuIl19