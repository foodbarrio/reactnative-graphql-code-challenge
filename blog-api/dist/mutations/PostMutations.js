"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _schema = require("./../schema");

var _isAuth = _interopRequireDefault(require("../middlewares/isAuth"));

var _Post = _interopRequireDefault(require("../models/Post"));

var PostMutations = {
  createPost: function createPost(parent, _ref, ctx, info) {
    var title = _ref.title,
        content = _ref.content;
    var userId = (0, _isAuth["default"])(ctx.req, ctx.res);
    ctx.pubsub.publish(_schema.POST_ADDED, {
      postAdded: {
        title: title,
        content: content
      }
    });
    return _Post["default"].create({
      title: title,
      content: content,
      userId: userId
    });
  },
  deletePost: function () {
    var _deletePost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref2, context, info) {
      var id, userId, post;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref2.id;
              userId = (0, _isAuth["default"])(context.req, context.res);
              _context.next = 4;
              return _Post["default"].findOne({
                where: {
                  id: id,
                  userId: userId
                }
              });

            case 4:
              post = _context.sent;

              if (post) {
                _context.next = 8;
                break;
              }

              context.res.status(500).json({
                message: "Internal server error"
              });
              throw new Error("");

            case 8:
              _context.next = 10;
              return _Post["default"].destroy({
                where: {
                  userId: userId,
                  id: id
                }
              });

            case 10:
              return _context.abrupt("return", post);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function deletePost(_x, _x2, _x3, _x4) {
      return _deletePost.apply(this, arguments);
    }

    return deletePost;
  }(),
  editPost: function () {
    var _editPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref3, context, info) {
      var id, title, content, userId, post;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = _ref3.id, title = _ref3.title, content = _ref3.content;
              userId = (0, _isAuth["default"])(context.req, context.res);
              _context2.next = 4;
              return _Post["default"].findOne({
                where: {
                  id: id,
                  userId: userId
                }
              });

            case 4:
              post = _context2.sent;

              if (post) {
                _context2.next = 8;
                break;
              }

              context.res.status(500).json({
                message: "Internal server error"
              });
              throw new Error("");

            case 8:
              if (title) {
                post.title = title;
              }

              if (content) {
                post.content = content;
              }

              post.save();
              return _context2.abrupt("return", post);

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function editPost(_x5, _x6, _x7, _x8) {
      return _editPost.apply(this, arguments);
    }

    return editPost;
  }()
};
var _default = PostMutations;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tdXRhdGlvbnMvUG9zdE11dGF0aW9ucy50cyJdLCJuYW1lcyI6WyJQb3N0TXV0YXRpb25zIiwiY3JlYXRlUG9zdCIsInBhcmVudCIsImN0eCIsImluZm8iLCJ0aXRsZSIsImNvbnRlbnQiLCJ1c2VySWQiLCJyZXEiLCJyZXMiLCJwdWJzdWIiLCJwdWJsaXNoIiwiUE9TVF9BRERFRCIsInBvc3RBZGRlZCIsIlBvc3QiLCJjcmVhdGUiLCJkZWxldGVQb3N0IiwiY29udGV4dCIsImlkIiwiZmluZE9uZSIsIndoZXJlIiwicG9zdCIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiRXJyb3IiLCJkZXN0cm95IiwiZWRpdFBvc3QiLCJzYXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRUEsSUFBTUEsYUFBYSxHQUFHO0FBQ3BCQyxFQUFBQSxVQUFVLEVBQUUsb0JBQUNDLE1BQUQsUUFBNkJDLEdBQTdCLEVBQWtDQyxJQUFsQyxFQUEyQztBQUFBLFFBQWhDQyxLQUFnQyxRQUFoQ0EsS0FBZ0M7QUFBQSxRQUF6QkMsT0FBeUIsUUFBekJBLE9BQXlCO0FBQ3JELFFBQU1DLE1BQU0sR0FBRyx3QkFBT0osR0FBRyxDQUFDSyxHQUFYLEVBQWdCTCxHQUFHLENBQUNNLEdBQXBCLENBQWY7QUFDQU4sSUFBQUEsR0FBRyxDQUFDTyxNQUFKLENBQVdDLE9BQVgsQ0FBbUJDLGtCQUFuQixFQUErQjtBQUFFQyxNQUFBQSxTQUFTLEVBQUU7QUFBRVIsUUFBQUEsS0FBSyxFQUFMQSxLQUFGO0FBQVNDLFFBQUFBLE9BQU8sRUFBUEE7QUFBVDtBQUFiLEtBQS9CO0FBQ0EsV0FBT1EsaUJBQUtDLE1BQUwsQ0FBWTtBQUFFVixNQUFBQSxLQUFLLEVBQUxBLEtBQUY7QUFBU0MsTUFBQUEsT0FBTyxFQUFQQSxPQUFUO0FBQWtCQyxNQUFBQSxNQUFNLEVBQU5BO0FBQWxCLEtBQVosQ0FBUDtBQUNELEdBTG1CO0FBTXBCUyxFQUFBQSxVQUFVO0FBQUEsb0dBQUUsaUJBQU9kLE1BQVAsU0FBdUJlLE9BQXZCLEVBQWdDYixJQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUJjLGNBQUFBLEVBQWpCLFNBQWlCQSxFQUFqQjtBQUNKWCxjQUFBQSxNQURJLEdBQ0ssd0JBQU9VLE9BQU8sQ0FBQ1QsR0FBZixFQUFvQlMsT0FBTyxDQUFDUixHQUE1QixDQURMO0FBQUE7QUFBQSxxQkFFU0ssaUJBQUtLLE9BQUwsQ0FBYTtBQUFFQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUVGLGtCQUFBQSxFQUFFLEVBQUZBLEVBQUY7QUFBTVgsa0JBQUFBLE1BQU0sRUFBTkE7QUFBTjtBQUFULGVBQWIsQ0FGVDs7QUFBQTtBQUVKYyxjQUFBQSxJQUZJOztBQUFBLGtCQUdMQSxJQUhLO0FBQUE7QUFBQTtBQUFBOztBQUlSSixjQUFBQSxPQUFPLENBQUNSLEdBQVIsQ0FBWWEsTUFBWixDQUFtQixHQUFuQixFQUF3QkMsSUFBeEIsQ0FBNkI7QUFBRUMsZ0JBQUFBLE9BQU8sRUFBRTtBQUFYLGVBQTdCO0FBSlEsb0JBS0YsSUFBSUMsS0FBSixDQUFVLEVBQVYsQ0FMRTs7QUFBQTtBQUFBO0FBQUEscUJBT0pYLGlCQUFLWSxPQUFMLENBQWE7QUFBRU4sZ0JBQUFBLEtBQUssRUFBRTtBQUFFYixrQkFBQUEsTUFBTSxFQUFOQSxNQUFGO0FBQVVXLGtCQUFBQSxFQUFFLEVBQUZBO0FBQVY7QUFBVCxlQUFiLENBUEk7O0FBQUE7QUFBQSwrQ0FRSEcsSUFSRzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFGOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLEtBTlU7QUFnQnBCTSxFQUFBQSxRQUFRO0FBQUEsa0dBQUUsa0JBQU96QixNQUFQLFNBQXVDZSxPQUF2QyxFQUFnRGIsSUFBaEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlCYyxjQUFBQSxFQUFqQixTQUFpQkEsRUFBakIsRUFBcUJiLEtBQXJCLFNBQXFCQSxLQUFyQixFQUE0QkMsT0FBNUIsU0FBNEJBLE9BQTVCO0FBQ0ZDLGNBQUFBLE1BREUsR0FDTyx3QkFBT1UsT0FBTyxDQUFDVCxHQUFmLEVBQW9CUyxPQUFPLENBQUNSLEdBQTVCLENBRFA7QUFBQTtBQUFBLHFCQUVnQkssaUJBQUtLLE9BQUwsQ0FBYTtBQUFFQyxnQkFBQUEsS0FBSyxFQUFFO0FBQUVGLGtCQUFBQSxFQUFFLEVBQUZBLEVBQUY7QUFBTVgsa0JBQUFBLE1BQU0sRUFBTkE7QUFBTjtBQUFULGVBQWIsQ0FGaEI7O0FBQUE7QUFFRmMsY0FBQUEsSUFGRTs7QUFBQSxrQkFHSEEsSUFIRztBQUFBO0FBQUE7QUFBQTs7QUFJTkosY0FBQUEsT0FBTyxDQUFDUixHQUFSLENBQVlhLE1BQVosQ0FBbUIsR0FBbkIsRUFBd0JDLElBQXhCLENBQTZCO0FBQUVDLGdCQUFBQSxPQUFPLEVBQUU7QUFBWCxlQUE3QjtBQUpNLG9CQUtBLElBQUlDLEtBQUosQ0FBVSxFQUFWLENBTEE7O0FBQUE7QUFPUixrQkFBSXBCLEtBQUosRUFBVztBQUNUZ0IsZ0JBQUFBLElBQUksQ0FBQ2hCLEtBQUwsR0FBYUEsS0FBYjtBQUNEOztBQUNELGtCQUFJQyxPQUFKLEVBQWE7QUFDWGUsZ0JBQUFBLElBQUksQ0FBQ2YsT0FBTCxHQUFlQSxPQUFmO0FBQ0Q7O0FBQ0RlLGNBQUFBLElBQUksQ0FBQ08sSUFBTDtBQWJRLGdEQWNEUCxJQWRDOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFoQlksQ0FBdEI7ZUFrQ2VyQixhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUE9TVF9BRERFRCB9IGZyb20gXCIuLy4uL3NjaGVtYVwiO1xuaW1wb3J0IGlzQXV0aCBmcm9tIFwiLi4vbWlkZGxld2FyZXMvaXNBdXRoXCI7XG5pbXBvcnQgUG9zdCBmcm9tIFwiLi4vbW9kZWxzL1Bvc3RcIjtcblxuY29uc3QgUG9zdE11dGF0aW9ucyA9IHtcbiAgY3JlYXRlUG9zdDogKHBhcmVudCwgeyB0aXRsZSwgY29udGVudCB9LCBjdHgsIGluZm8pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBpc0F1dGgoY3R4LnJlcSwgY3R4LnJlcyk7XG4gICAgY3R4LnB1YnN1Yi5wdWJsaXNoKFBPU1RfQURERUQsIHsgcG9zdEFkZGVkOiB7IHRpdGxlLCBjb250ZW50IH0gfSk7XG4gICAgcmV0dXJuIFBvc3QuY3JlYXRlKHsgdGl0bGUsIGNvbnRlbnQsIHVzZXJJZCB9KTtcbiAgfSxcbiAgZGVsZXRlUG9zdDogYXN5bmMgKHBhcmVudCwgeyBpZCB9LCBjb250ZXh0LCBpbmZvKSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gaXNBdXRoKGNvbnRleHQucmVxLCBjb250ZXh0LnJlcyk7XG4gICAgY29uc3QgcG9zdCA9IGF3YWl0IFBvc3QuZmluZE9uZSh7IHdoZXJlOiB7IGlkLCB1c2VySWQgfSB9KTtcbiAgICBpZiAoIXBvc3QpIHtcbiAgICAgIGNvbnRleHQucmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIkludGVybmFsIHNlcnZlciBlcnJvclwiIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgIH1cbiAgICBhd2FpdCBQb3N0LmRlc3Ryb3koeyB3aGVyZTogeyB1c2VySWQsIGlkIH0gfSk7XG4gICAgcmV0dXJuIHBvc3Q7XG4gIH0sXG4gIGVkaXRQb3N0OiBhc3luYyAocGFyZW50LCB7IGlkLCB0aXRsZSwgY29udGVudCB9LCBjb250ZXh0LCBpbmZvKSA9PiB7XG4gICAgY29uc3QgdXNlcklkID0gaXNBdXRoKGNvbnRleHQucmVxLCBjb250ZXh0LnJlcyk7XG4gICAgY29uc3QgcG9zdDogYW55ID0gYXdhaXQgUG9zdC5maW5kT25lKHsgd2hlcmU6IHsgaWQsIHVzZXJJZCB9IH0pO1xuICAgIGlmICghcG9zdCkge1xuICAgICAgY29udGV4dC5yZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIik7XG4gICAgfVxuICAgIGlmICh0aXRsZSkge1xuICAgICAgcG9zdC50aXRsZSA9IHRpdGxlO1xuICAgIH1cbiAgICBpZiAoY29udGVudCkge1xuICAgICAgcG9zdC5jb250ZW50ID0gY29udGVudDtcbiAgICB9XG4gICAgcG9zdC5zYXZlKCk7XG4gICAgcmV0dXJuIHBvc3Q7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQb3N0TXV0YXRpb25zO1xuIl19