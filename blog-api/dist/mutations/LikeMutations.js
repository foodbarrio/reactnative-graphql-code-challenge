"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isAuth = _interopRequireDefault(require("../middlewares/isAuth"));

var _Like = _interopRequireDefault(require("../models/Like"));

var LikeMutations = {
  like: function like(parent, _ref, context, info) {
    var postId = _ref.postId,
        commentId = _ref.commentId;
    var userId = (0, _isAuth["default"])(context.req, context.res);

    if (postId && commentId) {
      context.res.status(500).json({
        message: "Internal server error"
      });
      throw new Error("");
    }

    return _Like["default"].create({
      postId: postId,
      commentId: commentId,
      userId: userId
    });
  },
  unLike: function () {
    var _unLike = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref2, context, info) {
      var id, userId, like;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref2.id;
              userId = (0, _isAuth["default"])(context.req, context.res);
              _context.next = 4;
              return _Like["default"].findOne({
                where: {
                  id: id,
                  userId: userId
                }
              });

            case 4:
              like = _context.sent;

              if (like) {
                _context.next = 8;
                break;
              }

              context.res.status(500).json({
                message: "Internal server error"
              });
              throw new Error("");

            case 8:
              _context.next = 10;
              return _Like["default"].destroy({
                where: {
                  userId: userId,
                  id: id
                }
              });

            case 10:
              return _context.abrupt("return", like);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function unLike(_x, _x2, _x3, _x4) {
      return _unLike.apply(this, arguments);
    }

    return unLike;
  }()
};
var _default = LikeMutations;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tdXRhdGlvbnMvTGlrZU11dGF0aW9ucy50cyJdLCJuYW1lcyI6WyJMaWtlTXV0YXRpb25zIiwibGlrZSIsInBhcmVudCIsImNvbnRleHQiLCJpbmZvIiwicG9zdElkIiwiY29tbWVudElkIiwidXNlcklkIiwicmVxIiwicmVzIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJFcnJvciIsIkxpa2UiLCJjcmVhdGUiLCJ1bkxpa2UiLCJpZCIsImZpbmRPbmUiLCJ3aGVyZSIsImRlc3Ryb3kiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQSxJQUFNQSxhQUFhLEdBQUc7QUFDcEJDLEVBQUFBLElBQUksRUFBRSxjQUFDQyxNQUFELFFBQWdDQyxPQUFoQyxFQUF5Q0MsSUFBekMsRUFBa0Q7QUFBQSxRQUF2Q0MsTUFBdUMsUUFBdkNBLE1BQXVDO0FBQUEsUUFBL0JDLFNBQStCLFFBQS9CQSxTQUErQjtBQUN0RCxRQUFNQyxNQUFNLEdBQUcsd0JBQU9KLE9BQU8sQ0FBQ0ssR0FBZixFQUFvQkwsT0FBTyxDQUFDTSxHQUE1QixDQUFmOztBQUNBLFFBQUlKLE1BQU0sSUFBSUMsU0FBZCxFQUF5QjtBQUN2QkgsTUFBQUEsT0FBTyxDQUFDTSxHQUFSLENBQVlDLE1BQVosQ0FBbUIsR0FBbkIsRUFBd0JDLElBQXhCLENBQTZCO0FBQUVDLFFBQUFBLE9BQU8sRUFBRTtBQUFYLE9BQTdCO0FBQ0EsWUFBTSxJQUFJQyxLQUFKLENBQVUsRUFBVixDQUFOO0FBQ0Q7O0FBQ0QsV0FBT0MsaUJBQUtDLE1BQUwsQ0FBWTtBQUFFVixNQUFBQSxNQUFNLEVBQU5BLE1BQUY7QUFBVUMsTUFBQUEsU0FBUyxFQUFUQSxTQUFWO0FBQXFCQyxNQUFBQSxNQUFNLEVBQU5BO0FBQXJCLEtBQVosQ0FBUDtBQUNELEdBUm1CO0FBU3BCUyxFQUFBQSxNQUFNO0FBQUEsZ0dBQUUsaUJBQU9kLE1BQVAsU0FBdUJDLE9BQXZCLEVBQWdDQyxJQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUJhLGNBQUFBLEVBQWpCLFNBQWlCQSxFQUFqQjtBQUNBVixjQUFBQSxNQURBLEdBQ1Msd0JBQU9KLE9BQU8sQ0FBQ0ssR0FBZixFQUFvQkwsT0FBTyxDQUFDTSxHQUE1QixDQURUO0FBQUE7QUFBQSxxQkFFYUssaUJBQUtJLE9BQUwsQ0FBYTtBQUFFQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUVGLGtCQUFBQSxFQUFFLEVBQUZBLEVBQUY7QUFBTVYsa0JBQUFBLE1BQU0sRUFBTkE7QUFBTjtBQUFULGVBQWIsQ0FGYjs7QUFBQTtBQUVBTixjQUFBQSxJQUZBOztBQUFBLGtCQUdEQSxJQUhDO0FBQUE7QUFBQTtBQUFBOztBQUlKRSxjQUFBQSxPQUFPLENBQUNNLEdBQVIsQ0FBWUMsTUFBWixDQUFtQixHQUFuQixFQUF3QkMsSUFBeEIsQ0FBNkI7QUFBRUMsZ0JBQUFBLE9BQU8sRUFBRTtBQUFYLGVBQTdCO0FBSkksb0JBS0UsSUFBSUMsS0FBSixDQUFVLEVBQVYsQ0FMRjs7QUFBQTtBQUFBO0FBQUEscUJBT0FDLGlCQUFLTSxPQUFMLENBQWE7QUFBRUQsZ0JBQUFBLEtBQUssRUFBRTtBQUFFWixrQkFBQUEsTUFBTSxFQUFOQSxNQUFGO0FBQVVVLGtCQUFBQSxFQUFFLEVBQUZBO0FBQVY7QUFBVCxlQUFiLENBUEE7O0FBQUE7QUFBQSwrQ0FRQ2hCLElBUkQ7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQVRjLENBQXRCO2VBcUJlRCxhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzQXV0aCBmcm9tIFwiLi4vbWlkZGxld2FyZXMvaXNBdXRoXCI7XG5pbXBvcnQgTGlrZSBmcm9tIFwiLi4vbW9kZWxzL0xpa2VcIjtcblxuY29uc3QgTGlrZU11dGF0aW9ucyA9IHtcbiAgbGlrZTogKHBhcmVudCwgeyBwb3N0SWQsIGNvbW1lbnRJZCB9LCBjb250ZXh0LCBpbmZvKSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gaXNBdXRoKGNvbnRleHQucmVxLCBjb250ZXh0LnJlcyk7XG4gICAgaWYgKHBvc3RJZCAmJiBjb21tZW50SWQpIHtcbiAgICAgIGNvbnRleHQucmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIkludGVybmFsIHNlcnZlciBlcnJvclwiIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgIH1cbiAgICByZXR1cm4gTGlrZS5jcmVhdGUoeyBwb3N0SWQsIGNvbW1lbnRJZCwgdXNlcklkIH0pO1xuICB9LFxuICB1bkxpa2U6IGFzeW5jIChwYXJlbnQsIHsgaWQgfSwgY29udGV4dCwgaW5mbykgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IGlzQXV0aChjb250ZXh0LnJlcSwgY29udGV4dC5yZXMpO1xuICAgIGNvbnN0IGxpa2UgPSBhd2FpdCBMaWtlLmZpbmRPbmUoeyB3aGVyZTogeyBpZCwgdXNlcklkIH0gfSk7XG4gICAgaWYgKCFsaWtlKSB7XG4gICAgICBjb250ZXh0LnJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiKTtcbiAgICB9XG4gICAgYXdhaXQgTGlrZS5kZXN0cm95KHsgd2hlcmU6IHsgdXNlcklkLCBpZCB9IH0pO1xuICAgIHJldHVybiBsaWtlO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGlrZU11dGF0aW9ucztcbiJdfQ==