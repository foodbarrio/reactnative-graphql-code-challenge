"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isAuth = _interopRequireDefault(require("../middlewares/isAuth"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var CommentMutations = {
  createComment: function createComment(parent, _ref, context, info) {
    var content = _ref.content,
        postId = _ref.postId;
    var userId = (0, _isAuth["default"])(context.req, context.res);
    return _Comment["default"].create({
      content: content,
      postId: postId,
      userId: userId
    });
  },
  deleteComment: function () {
    var _deleteComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref2, context, info) {
      var id, userId, comment;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref2.id;
              userId = (0, _isAuth["default"])(context.req, context.res);
              _context.next = 4;
              return _Comment["default"].findOne({
                where: {
                  id: id,
                  userId: userId
                }
              });

            case 4:
              comment = _context.sent;

              if (comment) {
                _context.next = 8;
                break;
              }

              context.res.status(500).json({
                message: "Internal server error"
              });
              throw new Error("");

            case 8:
              _context.next = 10;
              return _Comment["default"].destroy({
                where: {
                  userId: userId,
                  id: id
                }
              });

            case 10:
              return _context.abrupt("return", comment);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function deleteComment(_x, _x2, _x3, _x4) {
      return _deleteComment.apply(this, arguments);
    }

    return deleteComment;
  }(),
  editComment: function () {
    var _editComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref3, context, info) {
      var id, content, userId, comment;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              id = _ref3.id, content = _ref3.content;
              userId = (0, _isAuth["default"])(context.req, context.res);
              _context2.next = 4;
              return _Comment["default"].findOne({
                where: {
                  id: id,
                  userId: userId
                }
              });

            case 4:
              comment = _context2.sent;

              if (comment) {
                _context2.next = 8;
                break;
              }

              context.res.status(500).json({
                message: "Internal server error"
              });
              throw new Error("");

            case 8:
              if (content) {
                comment.content = content;
              }

              comment.save();
              return _context2.abrupt("return", comment);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function editComment(_x5, _x6, _x7, _x8) {
      return _editComment.apply(this, arguments);
    }

    return editComment;
  }()
};
var _default = CommentMutations;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tdXRhdGlvbnMvQ29tbWVudE11dGF0aW9ucy50cyJdLCJuYW1lcyI6WyJDb21tZW50TXV0YXRpb25zIiwiY3JlYXRlQ29tbWVudCIsInBhcmVudCIsImNvbnRleHQiLCJpbmZvIiwiY29udGVudCIsInBvc3RJZCIsInVzZXJJZCIsInJlcSIsInJlcyIsIkNvbW1lbnQiLCJjcmVhdGUiLCJkZWxldGVDb21tZW50IiwiaWQiLCJmaW5kT25lIiwid2hlcmUiLCJjb21tZW50Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJFcnJvciIsImRlc3Ryb3kiLCJlZGl0Q29tbWVudCIsInNhdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQSxJQUFNQSxnQkFBZ0IsR0FBRztBQUN2QkMsRUFBQUEsYUFBYSxFQUFFLHVCQUFDQyxNQUFELFFBQThCQyxPQUE5QixFQUF1Q0MsSUFBdkMsRUFBZ0Q7QUFBQSxRQUFyQ0MsT0FBcUMsUUFBckNBLE9BQXFDO0FBQUEsUUFBNUJDLE1BQTRCLFFBQTVCQSxNQUE0QjtBQUM3RCxRQUFNQyxNQUFNLEdBQUcsd0JBQU9KLE9BQU8sQ0FBQ0ssR0FBZixFQUFvQkwsT0FBTyxDQUFDTSxHQUE1QixDQUFmO0FBQ0EsV0FBT0Msb0JBQVFDLE1BQVIsQ0FBZTtBQUFFTixNQUFBQSxPQUFPLEVBQVBBLE9BQUY7QUFBV0MsTUFBQUEsTUFBTSxFQUFOQSxNQUFYO0FBQW1CQyxNQUFBQSxNQUFNLEVBQU5BO0FBQW5CLEtBQWYsQ0FBUDtBQUNELEdBSnNCO0FBS3ZCSyxFQUFBQSxhQUFhO0FBQUEsdUdBQUUsaUJBQU9WLE1BQVAsU0FBdUJDLE9BQXZCLEVBQWdDQyxJQUFoQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBaUJTLGNBQUFBLEVBQWpCLFNBQWlCQSxFQUFqQjtBQUNQTixjQUFBQSxNQURPLEdBQ0Usd0JBQU9KLE9BQU8sQ0FBQ0ssR0FBZixFQUFvQkwsT0FBTyxDQUFDTSxHQUE1QixDQURGO0FBQUE7QUFBQSxxQkFFU0Msb0JBQVFJLE9BQVIsQ0FBZ0I7QUFBRUMsZ0JBQUFBLEtBQUssRUFBRTtBQUFFRixrQkFBQUEsRUFBRSxFQUFGQSxFQUFGO0FBQU1OLGtCQUFBQSxNQUFNLEVBQU5BO0FBQU47QUFBVCxlQUFoQixDQUZUOztBQUFBO0FBRVBTLGNBQUFBLE9BRk87O0FBQUEsa0JBR1JBLE9BSFE7QUFBQTtBQUFBO0FBQUE7O0FBSVhiLGNBQUFBLE9BQU8sQ0FBQ00sR0FBUixDQUFZUSxNQUFaLENBQW1CLEdBQW5CLEVBQXdCQyxJQUF4QixDQUE2QjtBQUFFQyxnQkFBQUEsT0FBTyxFQUFFO0FBQVgsZUFBN0I7QUFKVyxvQkFLTCxJQUFJQyxLQUFKLENBQVUsRUFBVixDQUxLOztBQUFBO0FBQUE7QUFBQSxxQkFPUFYsb0JBQVFXLE9BQVIsQ0FBZ0I7QUFBRU4sZ0JBQUFBLEtBQUssRUFBRTtBQUFFUixrQkFBQUEsTUFBTSxFQUFOQSxNQUFGO0FBQVVNLGtCQUFBQSxFQUFFLEVBQUZBO0FBQVY7QUFBVCxlQUFoQixDQVBPOztBQUFBO0FBQUEsK0NBUU5HLE9BUk07O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBRjs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxLQUxVO0FBZXZCTSxFQUFBQSxXQUFXO0FBQUEscUdBQUUsa0JBQU9wQixNQUFQLFNBQWdDQyxPQUFoQyxFQUF5Q0MsSUFBekM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQWlCUyxjQUFBQSxFQUFqQixTQUFpQkEsRUFBakIsRUFBcUJSLE9BQXJCLFNBQXFCQSxPQUFyQjtBQUNMRSxjQUFBQSxNQURLLEdBQ0ksd0JBQU9KLE9BQU8sQ0FBQ0ssR0FBZixFQUFvQkwsT0FBTyxDQUFDTSxHQUE1QixDQURKO0FBQUE7QUFBQSxxQkFFZ0JDLG9CQUFRSSxPQUFSLENBQWdCO0FBQUVDLGdCQUFBQSxLQUFLLEVBQUU7QUFBRUYsa0JBQUFBLEVBQUUsRUFBRkEsRUFBRjtBQUFNTixrQkFBQUEsTUFBTSxFQUFOQTtBQUFOO0FBQVQsZUFBaEIsQ0FGaEI7O0FBQUE7QUFFTFMsY0FBQUEsT0FGSzs7QUFBQSxrQkFHTkEsT0FITTtBQUFBO0FBQUE7QUFBQTs7QUFJVGIsY0FBQUEsT0FBTyxDQUFDTSxHQUFSLENBQVlRLE1BQVosQ0FBbUIsR0FBbkIsRUFBd0JDLElBQXhCLENBQTZCO0FBQUVDLGdCQUFBQSxPQUFPLEVBQUU7QUFBWCxlQUE3QjtBQUpTLG9CQUtILElBQUlDLEtBQUosQ0FBVSxFQUFWLENBTEc7O0FBQUE7QUFPWCxrQkFBSWYsT0FBSixFQUFhO0FBQ1hXLGdCQUFBQSxPQUFPLENBQUNYLE9BQVIsR0FBa0JBLE9BQWxCO0FBQ0Q7O0FBQ0RXLGNBQUFBLE9BQU8sQ0FBQ08sSUFBUjtBQVZXLGdEQVdKUCxPQVhJOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQUY7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFmWSxDQUF6QjtlQThCZWhCLGdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGlzQXV0aCBmcm9tIFwiLi4vbWlkZGxld2FyZXMvaXNBdXRoXCI7XG5pbXBvcnQgQ29tbWVudCBmcm9tIFwiLi4vbW9kZWxzL0NvbW1lbnRcIjtcblxuY29uc3QgQ29tbWVudE11dGF0aW9ucyA9IHtcbiAgY3JlYXRlQ29tbWVudDogKHBhcmVudCwgeyBjb250ZW50LCBwb3N0SWQgfSwgY29udGV4dCwgaW5mbykgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IGlzQXV0aChjb250ZXh0LnJlcSwgY29udGV4dC5yZXMpO1xuICAgIHJldHVybiBDb21tZW50LmNyZWF0ZSh7IGNvbnRlbnQsIHBvc3RJZCwgdXNlcklkIH0pO1xuICB9LFxuICBkZWxldGVDb21tZW50OiBhc3luYyAocGFyZW50LCB7IGlkIH0sIGNvbnRleHQsIGluZm8pID0+IHtcbiAgICBjb25zdCB1c2VySWQgPSBpc0F1dGgoY29udGV4dC5yZXEsIGNvbnRleHQucmVzKTtcbiAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgQ29tbWVudC5maW5kT25lKHsgd2hlcmU6IHsgaWQsIHVzZXJJZCB9IH0pO1xuICAgIGlmICghY29tbWVudCkge1xuICAgICAgY29udGV4dC5yZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSk7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJcIik7XG4gICAgfVxuICAgIGF3YWl0IENvbW1lbnQuZGVzdHJveSh7IHdoZXJlOiB7IHVzZXJJZCwgaWQgfSB9KTtcbiAgICByZXR1cm4gY29tbWVudDtcbiAgfSxcbiAgZWRpdENvbW1lbnQ6IGFzeW5jIChwYXJlbnQsIHsgaWQsIGNvbnRlbnQgfSwgY29udGV4dCwgaW5mbykgPT4ge1xuICAgIGNvbnN0IHVzZXJJZCA9IGlzQXV0aChjb250ZXh0LnJlcSwgY29udGV4dC5yZXMpO1xuICAgIGNvbnN0IGNvbW1lbnQ6IGFueSA9IGF3YWl0IENvbW1lbnQuZmluZE9uZSh7IHdoZXJlOiB7IGlkLCB1c2VySWQgfSB9KTtcbiAgICBpZiAoIWNvbW1lbnQpIHtcbiAgICAgIGNvbnRleHQucmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIkludGVybmFsIHNlcnZlciBlcnJvclwiIH0pO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgIH1cbiAgICBpZiAoY29udGVudCkge1xuICAgICAgY29tbWVudC5jb250ZW50ID0gY29udGVudDtcbiAgICB9XG4gICAgY29tbWVudC5zYXZlKCk7XG4gICAgcmV0dXJuIGNvbW1lbnQ7XG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tZW50TXV0YXRpb25zO1xuIl19