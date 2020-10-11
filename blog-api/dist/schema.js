"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = exports.typeDefs = exports.LIKE_ADDED = exports.COMMENT_ADDED = exports.POST_ADDED = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _generateToken = _interopRequireDefault(require("./utils/generateToken"));

var _User = _interopRequireDefault(require("./models/User"));

var _Post = _interopRequireDefault(require("./models/Post"));

var _Comment = _interopRequireDefault(require("./models/Comment"));

var _Like = _interopRequireDefault(require("./models/Like"));

var _sequelize = require("sequelize");

var _isAuth = _interopRequireDefault(require("./middlewares/isAuth"));

var _apolloServerExpress = require("apollo-server-express");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  scalar Date\n  union Liked = Post | Comment\n\n  type Subscription {\n    postAdded: Post\n    commentAdded(postId: ID!): Comment\n    likeAdded: Like\n  }\n\n  type AuthPayload {\n    token: String!\n    user: User!\n  }\n\n  type User {\n    id: ID!\n    username: String!\n  }\n\n  type Post {\n    id: ID!\n    author: User!\n    title: String!\n    likes: [Like]\n    content: String!\n    createdAt: Date!\n    comments: [Comment]\n  }\n\n  type Comment {\n    id: ID!\n    author: User!\n    content: String!\n    likes: [Like]\n    post: Post!\n    createdAt: Date!\n  }\n\n  type Like {\n    id: ID!\n    post: Post\n    comment: Comment\n    author: User!\n    createdAt: Date!\n  }\n\n  type Query {\n    currentUser: User!\n    likes(postId: ID, commentId: ID): [Like]\n    posts(search: String): [Post]\n    getPost(id: ID!): Post!\n    comments(postId: ID!): [Comment]\n  }\n\n  type Mutation {\n    createPost(title: String!, content: String!): Post!\n    editPost(id: ID!, content: String, title: String): Post!\n    deletePost(id: ID!): Post!\n\n    createComment(postId: ID!, content: String!): Comment!\n    editComment(id: ID!, content: String!): Comment!\n    deleteComment(id: ID!): Comment!\n\n    like(postId: ID, commentId: ID): Like!\n    unLike(postId: ID, commentId: ID): Like!\n\n    login(username: String!): AuthPayload!\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var _require = require("apollo-server-express"),
    gql = _require.gql,
    Kind = _require.Kind;

var _require2 = require("graphql"),
    GraphQLScalarType = _require2.GraphQLScalarType;

var POST_ADDED = "POST_ADDED";
exports.POST_ADDED = POST_ADDED;
var COMMENT_ADDED = "COMMENT_ADDED";
exports.COMMENT_ADDED = COMMENT_ADDED;
var LIKE_ADDED = "LIKE_ADDED";
exports.LIKE_ADDED = LIKE_ADDED;
var pubsub = new _apolloServerExpress.PubSub();
var typeDefs = gql(_templateObject());
exports.typeDefs = typeDefs;
var resolvers = {
  Query: {
    currentUser: function currentUser(parent, _ref, context, info) {
      var search = _ref.search;
      var userId = (0, _isAuth["default"])(context.req, context.res);
      return _User["default"].findByPk(userId);
    },
    posts: function posts(parent, _ref2, context, info) {
      var search = _ref2.search;

      if (search) {
        return _Post["default"].findAll({
          where: {
            title: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "".concat(search, "%"))
          },
          order: [["createdAt", "ASC"]]
        });
      }

      return _Post["default"].findAll();
    },
    getPost: function getPost(parent, _ref3, context, info) {
      var id = _ref3.id;
      return _Post["default"].findByPk(id);
    },
    likes: function likes(parent, _ref4, context, info) {
      var postId = _ref4.postId,
          commentId = _ref4.commentId;

      if (postId && commentId) {
        context.res.status(500).json({
          message: "internal server error"
        });
        throw new Error("");
      }

      if (postId) {
        return _Like["default"].findAll({
          where: {
            postId: postId
          }
        });
      }

      if (commentId) {
        return _Like["default"].findAll({
          where: {
            commentId: commentId
          }
        });
      }
    },
    comments: function comments(parent, _ref5, context, info) {
      var postId = _ref5.postId;

      if (!postId) {
        context.res.status(500).json({
          message: "internal server error"
        });
        throw new Error("");
      }

      return _Comment["default"].findAll({
        where: {
          postId: postId
        }
      });
    }
  },
  Mutation: {
    ///POST MUTATION
    createPost: function () {
      var _createPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref6, ctx, info) {
        var title, content, userId, post;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                title = _ref6.title, content = _ref6.content;
                userId = (0, _isAuth["default"])(ctx.req, ctx.res);
                console.log(userId);

                if (userId) {
                  _context.next = 6;
                  break;
                }

                console.log("YO");
                return _context.abrupt("return");

              case 6:
                _context.next = 8;
                return _Post["default"].create({
                  title: title,
                  content: content,
                  userId: userId
                });

              case 8:
                post = _context.sent;
                pubsub.publish(POST_ADDED, {
                  postAdded: post
                });
                return _context.abrupt("return", post);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createPost(_x, _x2, _x3, _x4) {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }(),
    deletePost: function () {
      var _deletePost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref7, context, info) {
        var id, userId, post;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = _ref7.id;
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
                _context2.next = 10;
                return _Post["default"].destroy({
                  where: {
                    userId: userId,
                    id: id
                  }
                });

              case 10:
                return _context2.abrupt("return", post);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function deletePost(_x5, _x6, _x7, _x8) {
        return _deletePost.apply(this, arguments);
      }

      return deletePost;
    }(),
    editPost: function () {
      var _editPost = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref8, context, info) {
        var id, title, content, userId, post;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref8.id, title = _ref8.title, content = _ref8.content;
                userId = (0, _isAuth["default"])(context.req, context.res);
                _context3.next = 4;
                return _Post["default"].findOne({
                  where: {
                    id: id,
                    userId: userId
                  }
                });

              case 4:
                post = _context3.sent;

                if (post) {
                  _context3.next = 8;
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
                return _context3.abrupt("return", post);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function editPost(_x9, _x10, _x11, _x12) {
        return _editPost.apply(this, arguments);
      }

      return editPost;
    }(),
    //COMMENTMUTATION
    createComment: function () {
      var _createComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, _ref9, context, info) {
        var content, postId, userId, comment;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                content = _ref9.content, postId = _ref9.postId;
                userId = (0, _isAuth["default"])(context.req, context.res);
                _context4.next = 4;
                return _Comment["default"].create({
                  content: content,
                  postId: postId,
                  userId: userId
                });

              case 4:
                comment = _context4.sent;
                pubsub.publish(COMMENT_ADDED, {
                  commentAdded: comment
                });
                return _context4.abrupt("return", comment);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createComment(_x13, _x14, _x15, _x16) {
        return _createComment.apply(this, arguments);
      }

      return createComment;
    }(),
    deleteComment: function () {
      var _deleteComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, _ref10, context, info) {
        var id, userId, comment;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = _ref10.id;
                userId = (0, _isAuth["default"])(context.req, context.res);
                _context5.next = 4;
                return _Comment["default"].findOne({
                  where: {
                    id: id,
                    userId: userId
                  }
                });

              case 4:
                comment = _context5.sent;

                if (comment) {
                  _context5.next = 8;
                  break;
                }

                context.res.status(500).json({
                  message: "Internal server error"
                });
                throw new Error("");

              case 8:
                _context5.next = 10;
                return _Comment["default"].destroy({
                  where: {
                    userId: userId,
                    id: id
                  }
                });

              case 10:
                return _context5.abrupt("return", comment);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteComment(_x17, _x18, _x19, _x20) {
        return _deleteComment.apply(this, arguments);
      }

      return deleteComment;
    }(),
    editComment: function () {
      var _editComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(parent, _ref11, context, info) {
        var id, content, userId, comment;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = _ref11.id, content = _ref11.content;
                userId = (0, _isAuth["default"])(context.req, context.res);
                _context6.next = 4;
                return _Comment["default"].findOne({
                  where: {
                    id: id,
                    userId: userId
                  }
                });

              case 4:
                comment = _context6.sent;

                if (comment) {
                  _context6.next = 8;
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
                return _context6.abrupt("return", comment);

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function editComment(_x21, _x22, _x23, _x24) {
        return _editComment.apply(this, arguments);
      }

      return editComment;
    }(),
    like: function () {
      var _like = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(parent, _ref12, context, info) {
        var postId, commentId, userId, like;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                postId = _ref12.postId, commentId = _ref12.commentId;
                userId = (0, _isAuth["default"])(context.req, context.res);

                if (!(postId && commentId)) {
                  _context7.next = 5;
                  break;
                }

                context.res.status(500).json({
                  message: "Internal server error"
                });
                throw new Error("");

              case 5:
                _context7.next = 7;
                return _Like["default"].create({
                  postId: postId,
                  commentId: commentId,
                  userId: userId
                });

              case 7:
                like = _context7.sent;
                pubsub.publish(LIKE_ADDED, {
                  commentAdded: like
                });
                return _context7.abrupt("return", like);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function like(_x25, _x26, _x27, _x28) {
        return _like.apply(this, arguments);
      }

      return like;
    }(),
    unLike: function () {
      var _unLike = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(parent, _ref13, context, info) {
        var postId, commentId, userId, like;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                postId = _ref13.postId, commentId = _ref13.commentId;
                userId = (0, _isAuth["default"])(context.req, context.res);

                if (!(postId && commentId)) {
                  _context8.next = 5;
                  break;
                }

                context.res.status(500).json({
                  message: "Internal server error"
                });
                throw new Error("");

              case 5:
                if (!postId) {
                  _context8.next = 13;
                  break;
                }

                _context8.next = 8;
                return _Like["default"].findAll({
                  where: {
                    userId: userId,
                    postId: postId
                  }
                });

              case 8:
                like = _context8.sent;
                _context8.next = 11;
                return _Like["default"].destroy({
                  where: {
                    userId: userId,
                    postId: postId
                  }
                });

              case 11:
                _context8.next = 18;
                break;

              case 13:
                _context8.next = 15;
                return _Like["default"].findAll({
                  where: {
                    userId: userId,
                    commentId: commentId
                  }
                });

              case 15:
                like = _context8.sent;
                _context8.next = 18;
                return _Like["default"].destroy({
                  where: {
                    userId: userId,
                    commentId: commentId
                  }
                });

              case 18:
                return _context8.abrupt("return", like[0]);

              case 19:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function unLike(_x29, _x30, _x31, _x32) {
        return _unLike.apply(this, arguments);
      }

      return unLike;
    }(),
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(parent, _ref14, ctx, info) {
        var username, user, token;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                username = _ref14.username;
                _context9.next = 3;
                return _User["default"].findOne({
                  where: {
                    username: username
                  }
                });

              case 3:
                user = _context9.sent;

                if (user) {
                  _context9.next = 8;
                  break;
                }

                _context9.next = 7;
                return _User["default"].create({
                  username: username
                });

              case 7:
                user = _context9.sent;

              case 8:
                token = (0, _generateToken["default"])(user.get("id"));
                return _context9.abrupt("return", {
                  token: token,
                  user: user
                });

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function login(_x33, _x34, _x35, _x36) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  },
  Subscription: {
    postAdded: {
      subscribe: function subscribe() {
        return pubsub.asyncIterator([POST_ADDED]);
      }
    },
    commentAdded: {
      subscribe: (0, _apolloServerExpress.withFilter)(function () {
        return pubsub.asyncIterator(COMMENT_ADDED);
      }, function (payload, variables) {
        return payload.commentAdded.dataValues.postId == variables.postId;
      })
    },
    likeAdded: {
      subscribe: pubsub.asyncIterator([LIKE_ADDED])
    }
  },
  Post: {
    likes: {
      resolve: function resolve(parent, args, _ref15, info) {
        var request = _ref15.request;
        return _Like["default"].findAll({
          where: {
            postId: parent.id
          }
        });
      }
    },
    comments: {
      resolve: function resolve(parent, args, _ref16, info) {
        var request = _ref16.request;
        return _Comment["default"].findAll({
          where: {
            postId: parent.id
          },
          order: [["createdAt", "DESC"]]
        });
      }
    },
    author: {
      resolve: function resolve(parent, args, _ref17, info) {
        var request = _ref17.request;
        return _User["default"].findByPk(parent.userId);
      }
    }
  },
  Comment: {
    likes: {
      resolve: function resolve(parent, args, _ref18, info) {
        var request = _ref18.request;
        return _Like["default"].findAll({
          where: {
            commentId: parent.id
          }
        });
      }
    },
    author: {
      resolve: function resolve(parent, args, _ref19, info) {
        var request = _ref19.request;
        return _User["default"].findByPk(parent.userId);
      }
    },
    post: {
      resolve: function resolve(parent, args, _ref20, info) {
        var request = _ref20.request;
        return _Post["default"].findByPk(parent.postId);
      }
    }
  },
  Like: {
    author: {
      resolve: function resolve(parent, args, _ref21, info) {
        var request = _ref21.request;
        return _User["default"].findByPk(parent.userId);
      }
    },
    post: {
      resolve: function resolve(parent, args, _ref22, info) {
        var request = _ref22.request;
        return _Post["default"].findByPk(parent.postId);
      }
    },
    comment: {
      resolve: function resolve(parent, args, _ref23, info) {
        var request = _ref23.request;
        return _Comment["default"].findByPk(parent.commentId);
      }
    }
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue: function parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize: function serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral: function parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }

      return null;
    }
  })
};
exports.resolvers = resolvers;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zY2hlbWEudHMiXSwibmFtZXMiOlsicmVxdWlyZSIsImdxbCIsIktpbmQiLCJHcmFwaFFMU2NhbGFyVHlwZSIsIlBPU1RfQURERUQiLCJDT01NRU5UX0FEREVEIiwiTElLRV9BRERFRCIsInB1YnN1YiIsIlB1YlN1YiIsInR5cGVEZWZzIiwicmVzb2x2ZXJzIiwiUXVlcnkiLCJjdXJyZW50VXNlciIsInBhcmVudCIsImNvbnRleHQiLCJpbmZvIiwic2VhcmNoIiwidXNlcklkIiwicmVxIiwicmVzIiwiVXNlciIsImZpbmRCeVBrIiwicG9zdHMiLCJQb3N0IiwiZmluZEFsbCIsIndoZXJlIiwidGl0bGUiLCJPcCIsImxpa2UiLCJvcmRlciIsImdldFBvc3QiLCJpZCIsImxpa2VzIiwicG9zdElkIiwiY29tbWVudElkIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJFcnJvciIsIkxpa2UiLCJjb21tZW50cyIsIkNvbW1lbnQiLCJNdXRhdGlvbiIsImNyZWF0ZVBvc3QiLCJjdHgiLCJjb250ZW50IiwiY29uc29sZSIsImxvZyIsImNyZWF0ZSIsInBvc3QiLCJwdWJsaXNoIiwicG9zdEFkZGVkIiwiZGVsZXRlUG9zdCIsImZpbmRPbmUiLCJkZXN0cm95IiwiZWRpdFBvc3QiLCJzYXZlIiwiY3JlYXRlQ29tbWVudCIsImNvbW1lbnQiLCJjb21tZW50QWRkZWQiLCJkZWxldGVDb21tZW50IiwiZWRpdENvbW1lbnQiLCJ1bkxpa2UiLCJsb2dpbiIsInVzZXJuYW1lIiwidXNlciIsInRva2VuIiwiZ2V0IiwiU3Vic2NyaXB0aW9uIiwic3Vic2NyaWJlIiwiYXN5bmNJdGVyYXRvciIsInBheWxvYWQiLCJ2YXJpYWJsZXMiLCJkYXRhVmFsdWVzIiwibGlrZUFkZGVkIiwicmVzb2x2ZSIsImFyZ3MiLCJyZXF1ZXN0IiwiYXV0aG9yIiwiRGF0ZSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInBhcnNlVmFsdWUiLCJ2YWx1ZSIsInNlcmlhbGl6ZSIsImdldFRp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QUFJNUUsaUJBQUosQ0FBc0I7QUFDMUI2RSxJQUFBQSxJQUFJLEVBQUUsTUFEb0I7QUFFMUJDLElBQUFBLFdBQVcsRUFBRSx5QkFGYTtBQUcxQkMsSUFBQUEsVUFIMEIsc0JBR2ZDLEtBSGUsRUFHUjtBQUNoQixhQUFPLElBQUlKLElBQUosQ0FBU0ksS0FBVCxDQUFQLENBRGdCLENBQ1E7QUFDekIsS0FMeUI7QUFNMUJDLElBQUFBLFNBTjBCLHFCQU1oQkQsS0FOZ0IsRUFNVDtBQUNmLGFBQU9BLEtBQUssQ0FBQ0UsT0FBTixFQUFQLENBRGUsQ0FDUztBQUN6QixLQVJ5QjtBQVMxQkMsSUFBQUEsWUFUMEIsd0JBU2JDLEdBVGEsRUFTUjtBQUNoQixVQUFJQSxHQUFHLENBQUNDLElBQUosS0FBYXRGLElBQUksQ0FBQ3VGLEdBQXRCLEVBQTJCO0FBQ3pCLGVBQU9DLFFBQVEsQ0FBQ0gsR0FBRyxDQUFDSixLQUFMLEVBQVksRUFBWixDQUFmLENBRHlCLENBQ087QUFDakM7O0FBQ0QsYUFBTyxJQUFQO0FBQ0Q7QUFkeUIsR0FBdEI7QUFyTmlCLENBQWxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGdlbmVyYXRlVG9rZW4gZnJvbSBcIi4vdXRpbHMvZ2VuZXJhdGVUb2tlblwiO1xuY29uc3QgeyBncWwsIEtpbmQgfSA9IHJlcXVpcmUoXCJhcG9sbG8tc2VydmVyLWV4cHJlc3NcIik7XG5jb25zdCB7IEdyYXBoUUxTY2FsYXJUeXBlIH0gPSByZXF1aXJlKFwiZ3JhcGhxbFwiKTtcbmltcG9ydCBVc2VyIGZyb20gXCIuL21vZGVscy9Vc2VyXCI7XG5pbXBvcnQgUG9zdCBmcm9tIFwiLi9tb2RlbHMvUG9zdFwiO1xuaW1wb3J0IENvbW1lbnQgZnJvbSBcIi4vbW9kZWxzL0NvbW1lbnRcIjtcbmltcG9ydCBMaWtlIGZyb20gXCIuL21vZGVscy9MaWtlXCI7XG5pbXBvcnQgeyBPcCB9IGZyb20gXCJzZXF1ZWxpemVcIjtcbmltcG9ydCBpc0F1dGggZnJvbSBcIi4vbWlkZGxld2FyZXMvaXNBdXRoXCI7XG5pbXBvcnQgeyBQdWJTdWIsIHdpdGhGaWx0ZXIgfSBmcm9tIFwiYXBvbGxvLXNlcnZlci1leHByZXNzXCI7XG5cbmV4cG9ydCBjb25zdCBQT1NUX0FEREVEID0gXCJQT1NUX0FEREVEXCI7XG5leHBvcnQgY29uc3QgQ09NTUVOVF9BRERFRCA9IFwiQ09NTUVOVF9BRERFRFwiO1xuZXhwb3J0IGNvbnN0IExJS0VfQURERUQgPSBcIkxJS0VfQURERURcIjtcblxuY29uc3QgcHVic3ViID0gbmV3IFB1YlN1YigpO1xuZXhwb3J0IGNvbnN0IHR5cGVEZWZzID0gZ3FsYFxuICBzY2FsYXIgRGF0ZVxuICB1bmlvbiBMaWtlZCA9IFBvc3QgfCBDb21tZW50XG5cbiAgdHlwZSBTdWJzY3JpcHRpb24ge1xuICAgIHBvc3RBZGRlZDogUG9zdFxuICAgIGNvbW1lbnRBZGRlZChwb3N0SWQ6IElEISk6IENvbW1lbnRcbiAgICBsaWtlQWRkZWQ6IExpa2VcbiAgfVxuXG4gIHR5cGUgQXV0aFBheWxvYWQge1xuICAgIHRva2VuOiBTdHJpbmchXG4gICAgdXNlcjogVXNlciFcbiAgfVxuXG4gIHR5cGUgVXNlciB7XG4gICAgaWQ6IElEIVxuICAgIHVzZXJuYW1lOiBTdHJpbmchXG4gIH1cblxuICB0eXBlIFBvc3Qge1xuICAgIGlkOiBJRCFcbiAgICBhdXRob3I6IFVzZXIhXG4gICAgdGl0bGU6IFN0cmluZyFcbiAgICBsaWtlczogW0xpa2VdXG4gICAgY29udGVudDogU3RyaW5nIVxuICAgIGNyZWF0ZWRBdDogRGF0ZSFcbiAgICBjb21tZW50czogW0NvbW1lbnRdXG4gIH1cblxuICB0eXBlIENvbW1lbnQge1xuICAgIGlkOiBJRCFcbiAgICBhdXRob3I6IFVzZXIhXG4gICAgY29udGVudDogU3RyaW5nIVxuICAgIGxpa2VzOiBbTGlrZV1cbiAgICBwb3N0OiBQb3N0IVxuICAgIGNyZWF0ZWRBdDogRGF0ZSFcbiAgfVxuXG4gIHR5cGUgTGlrZSB7XG4gICAgaWQ6IElEIVxuICAgIHBvc3Q6IFBvc3RcbiAgICBjb21tZW50OiBDb21tZW50XG4gICAgYXV0aG9yOiBVc2VyIVxuICAgIGNyZWF0ZWRBdDogRGF0ZSFcbiAgfVxuXG4gIHR5cGUgUXVlcnkge1xuICAgIGN1cnJlbnRVc2VyOiBVc2VyIVxuICAgIGxpa2VzKHBvc3RJZDogSUQsIGNvbW1lbnRJZDogSUQpOiBbTGlrZV1cbiAgICBwb3N0cyhzZWFyY2g6IFN0cmluZyk6IFtQb3N0XVxuICAgIGdldFBvc3QoaWQ6IElEISk6IFBvc3QhXG4gICAgY29tbWVudHMocG9zdElkOiBJRCEpOiBbQ29tbWVudF1cbiAgfVxuXG4gIHR5cGUgTXV0YXRpb24ge1xuICAgIGNyZWF0ZVBvc3QodGl0bGU6IFN0cmluZyEsIGNvbnRlbnQ6IFN0cmluZyEpOiBQb3N0IVxuICAgIGVkaXRQb3N0KGlkOiBJRCEsIGNvbnRlbnQ6IFN0cmluZywgdGl0bGU6IFN0cmluZyk6IFBvc3QhXG4gICAgZGVsZXRlUG9zdChpZDogSUQhKTogUG9zdCFcblxuICAgIGNyZWF0ZUNvbW1lbnQocG9zdElkOiBJRCEsIGNvbnRlbnQ6IFN0cmluZyEpOiBDb21tZW50IVxuICAgIGVkaXRDb21tZW50KGlkOiBJRCEsIGNvbnRlbnQ6IFN0cmluZyEpOiBDb21tZW50IVxuICAgIGRlbGV0ZUNvbW1lbnQoaWQ6IElEISk6IENvbW1lbnQhXG5cbiAgICBsaWtlKHBvc3RJZDogSUQsIGNvbW1lbnRJZDogSUQpOiBMaWtlIVxuICAgIHVuTGlrZShwb3N0SWQ6IElELCBjb21tZW50SWQ6IElEKTogTGlrZSFcblxuICAgIGxvZ2luKHVzZXJuYW1lOiBTdHJpbmchKTogQXV0aFBheWxvYWQhXG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XG4gIFF1ZXJ5OiB7XG4gICAgY3VycmVudFVzZXI6IChwYXJlbnQsIHsgc2VhcmNoIH0sIGNvbnRleHQsIGluZm8pID0+IHtcbiAgICAgIGNvbnN0IHVzZXJJZCA9IGlzQXV0aChjb250ZXh0LnJlcSwgY29udGV4dC5yZXMpO1xuICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5UGsodXNlcklkKTtcbiAgICB9LFxuICAgIHBvc3RzOiAocGFyZW50LCB7IHNlYXJjaCB9LCBjb250ZXh0LCBpbmZvKSA9PiB7XG4gICAgICBpZiAoc2VhcmNoKSB7XG4gICAgICAgIHJldHVybiBQb3N0LmZpbmRBbGwoe1xuICAgICAgICAgIHdoZXJlOiB7IHRpdGxlOiB7IFtPcC5saWtlXTogYCR7c2VhcmNofSVgIH0gfSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkFTQ1wiXV0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFBvc3QuZmluZEFsbCgpO1xuICAgIH0sXG4gICAgZ2V0UG9zdDogKHBhcmVudCwgeyBpZCB9LCBjb250ZXh0LCBpbmZvKSA9PiB7XG4gICAgICByZXR1cm4gUG9zdC5maW5kQnlQayhpZCk7XG4gICAgfSxcbiAgICBsaWtlczogKHBhcmVudCwgeyBwb3N0SWQsIGNvbW1lbnRJZCB9LCBjb250ZXh0LCBpbmZvKSA9PiB7XG4gICAgICBpZiAocG9zdElkICYmIGNvbW1lbnRJZCkge1xuICAgICAgICBjb250ZXh0LnJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgICAgfVxuICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICByZXR1cm4gTGlrZS5maW5kQWxsKHsgd2hlcmU6IHsgcG9zdElkIH0gfSk7XG4gICAgICB9XG4gICAgICBpZiAoY29tbWVudElkKSB7XG4gICAgICAgIHJldHVybiBMaWtlLmZpbmRBbGwoeyB3aGVyZTogeyBjb21tZW50SWQgfSB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbW1lbnRzOiAocGFyZW50LCB7IHBvc3RJZCB9LCBjb250ZXh0LCBpbmZvKSA9PiB7XG4gICAgICBpZiAoIXBvc3RJZCkge1xuICAgICAgICBjb250ZXh0LnJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIENvbW1lbnQuZmluZEFsbCh7IHdoZXJlOiB7IHBvc3RJZCB9IH0pO1xuICAgIH0sXG4gIH0sXG4gIE11dGF0aW9uOiB7XG4gICAgLy8vUE9TVCBNVVRBVElPTlxuICAgIGNyZWF0ZVBvc3Q6IGFzeW5jIChwYXJlbnQsIHsgdGl0bGUsIGNvbnRlbnQgfSwgY3R4LCBpbmZvKSA9PiB7XG4gICAgICBjb25zdCB1c2VySWQgPSBpc0F1dGgoY3R4LnJlcSwgY3R4LnJlcyk7XG4gICAgICBjb25zb2xlLmxvZyh1c2VySWQpO1xuICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJZT1wiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcG9zdCA9IGF3YWl0IFBvc3QuY3JlYXRlKHsgdGl0bGUsIGNvbnRlbnQsIHVzZXJJZCB9KTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKFBPU1RfQURERUQsIHsgcG9zdEFkZGVkOiBwb3N0IH0pO1xuICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgfSxcbiAgICBkZWxldGVQb3N0OiBhc3luYyAocGFyZW50LCB7IGlkIH0sIGNvbnRleHQsIGluZm8pID0+IHtcbiAgICAgIGNvbnN0IHVzZXJJZCA9IGlzQXV0aChjb250ZXh0LnJlcSwgY29udGV4dC5yZXMpO1xuICAgICAgY29uc3QgcG9zdCA9IGF3YWl0IFBvc3QuZmluZE9uZSh7IHdoZXJlOiB7IGlkLCB1c2VySWQgfSB9KTtcbiAgICAgIGlmICghcG9zdCkge1xuICAgICAgICBjb250ZXh0LnJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgICAgfVxuICAgICAgYXdhaXQgUG9zdC5kZXN0cm95KHsgd2hlcmU6IHsgdXNlcklkLCBpZCB9IH0pO1xuICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgfSxcbiAgICBlZGl0UG9zdDogYXN5bmMgKHBhcmVudCwgeyBpZCwgdGl0bGUsIGNvbnRlbnQgfSwgY29udGV4dCwgaW5mbykgPT4ge1xuICAgICAgY29uc3QgdXNlcklkID0gaXNBdXRoKGNvbnRleHQucmVxLCBjb250ZXh0LnJlcyk7XG4gICAgICBjb25zdCBwb3N0OiBhbnkgPSBhd2FpdCBQb3N0LmZpbmRPbmUoeyB3aGVyZTogeyBpZCwgdXNlcklkIH0gfSk7XG4gICAgICBpZiAoIXBvc3QpIHtcbiAgICAgICAgY29udGV4dC5yZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICBwb3N0LnRpdGxlID0gdGl0bGU7XG4gICAgICB9XG4gICAgICBpZiAoY29udGVudCkge1xuICAgICAgICBwb3N0LmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgfVxuICAgICAgcG9zdC5zYXZlKCk7XG4gICAgICByZXR1cm4gcG9zdDtcbiAgICB9LFxuICAgIC8vQ09NTUVOVE1VVEFUSU9OXG4gICAgY3JlYXRlQ29tbWVudDogYXN5bmMgKHBhcmVudCwgeyBjb250ZW50LCBwb3N0SWQgfSwgY29udGV4dCwgaW5mbykgPT4ge1xuICAgICAgY29uc3QgdXNlcklkID0gaXNBdXRoKGNvbnRleHQucmVxLCBjb250ZXh0LnJlcyk7XG4gICAgICBjb25zdCBjb21tZW50ID0gYXdhaXQgQ29tbWVudC5jcmVhdGUoeyBjb250ZW50LCBwb3N0SWQsIHVzZXJJZCB9KTtcbiAgICAgIHB1YnN1Yi5wdWJsaXNoKENPTU1FTlRfQURERUQsIHsgY29tbWVudEFkZGVkOiBjb21tZW50IH0pO1xuICAgICAgcmV0dXJuIGNvbW1lbnQ7XG4gICAgfSxcbiAgICBkZWxldGVDb21tZW50OiBhc3luYyAocGFyZW50LCB7IGlkIH0sIGNvbnRleHQsIGluZm8pID0+IHtcbiAgICAgIGNvbnN0IHVzZXJJZCA9IGlzQXV0aChjb250ZXh0LnJlcSwgY29udGV4dC5yZXMpO1xuICAgICAgY29uc3QgY29tbWVudCA9IGF3YWl0IENvbW1lbnQuZmluZE9uZSh7IHdoZXJlOiB7IGlkLCB1c2VySWQgfSB9KTtcbiAgICAgIGlmICghY29tbWVudCkge1xuICAgICAgICBjb250ZXh0LnJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgICAgfVxuICAgICAgYXdhaXQgQ29tbWVudC5kZXN0cm95KHsgd2hlcmU6IHsgdXNlcklkLCBpZCB9IH0pO1xuICAgICAgcmV0dXJuIGNvbW1lbnQ7XG4gICAgfSxcbiAgICBlZGl0Q29tbWVudDogYXN5bmMgKHBhcmVudCwgeyBpZCwgY29udGVudCB9LCBjb250ZXh0LCBpbmZvKSA9PiB7XG4gICAgICBjb25zdCB1c2VySWQgPSBpc0F1dGgoY29udGV4dC5yZXEsIGNvbnRleHQucmVzKTtcbiAgICAgIGNvbnN0IGNvbW1lbnQ6IGFueSA9IGF3YWl0IENvbW1lbnQuZmluZE9uZSh7IHdoZXJlOiB7IGlkLCB1c2VySWQgfSB9KTtcbiAgICAgIGlmICghY29tbWVudCkge1xuICAgICAgICBjb250ZXh0LnJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJJbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiB9KTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgY29tbWVudC5jb250ZW50ID0gY29udGVudDtcbiAgICAgIH1cbiAgICAgIGNvbW1lbnQuc2F2ZSgpO1xuICAgICAgcmV0dXJuIGNvbW1lbnQ7XG4gICAgfSxcbiAgICBsaWtlOiBhc3luYyAocGFyZW50LCB7IHBvc3RJZCwgY29tbWVudElkIH0sIGNvbnRleHQsIGluZm8pID0+IHtcbiAgICAgIGNvbnN0IHVzZXJJZCA9IGlzQXV0aChjb250ZXh0LnJlcSwgY29udGV4dC5yZXMpO1xuICAgICAgaWYgKHBvc3RJZCAmJiBjb21tZW50SWQpIHtcbiAgICAgICAgY29udGV4dC5yZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxpa2UgPSBhd2FpdCBMaWtlLmNyZWF0ZSh7IHBvc3RJZCwgY29tbWVudElkLCB1c2VySWQgfSk7XG4gICAgICBwdWJzdWIucHVibGlzaChMSUtFX0FEREVELCB7IGNvbW1lbnRBZGRlZDogbGlrZSB9KTtcbiAgICAgIHJldHVybiBsaWtlO1xuICAgIH0sXG4gICAgdW5MaWtlOiBhc3luYyAocGFyZW50LCB7IHBvc3RJZCwgY29tbWVudElkIH0sIGNvbnRleHQsIGluZm8pID0+IHtcbiAgICAgIGNvbnN0IHVzZXJJZCA9IGlzQXV0aChjb250ZXh0LnJlcSwgY29udGV4dC5yZXMpO1xuICAgICAgaWYgKHBvc3RJZCAmJiBjb21tZW50SWQpIHtcbiAgICAgICAgY29udGV4dC5yZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIgfSk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlwiKTtcbiAgICAgIH1cbiAgICAgIGxldCBsaWtlO1xuICAgICAgaWYgKHBvc3RJZCkge1xuICAgICAgICBsaWtlID0gYXdhaXQgTGlrZS5maW5kQWxsKHsgd2hlcmU6IHsgdXNlcklkLCBwb3N0SWQgfSB9KTtcbiAgICAgICAgYXdhaXQgTGlrZS5kZXN0cm95KHsgd2hlcmU6IHsgdXNlcklkLCBwb3N0SWQgfSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpa2UgPSBhd2FpdCBMaWtlLmZpbmRBbGwoeyB3aGVyZTogeyB1c2VySWQsIGNvbW1lbnRJZCB9IH0pO1xuICAgICAgICBhd2FpdCBMaWtlLmRlc3Ryb3koeyB3aGVyZTogeyB1c2VySWQsIGNvbW1lbnRJZCB9IH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxpa2VbMF07XG4gICAgfSxcbiAgICBsb2dpbjogYXN5bmMgKHBhcmVudCwgeyB1c2VybmFtZSB9LCBjdHgsIGluZm8pID0+IHtcbiAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgd2hlcmU6IHsgdXNlcm5hbWUgfSB9KTtcbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICB1c2VyID0gYXdhaXQgVXNlci5jcmVhdGUoeyB1c2VybmFtZSB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdG9rZW4gPSBnZW5lcmF0ZVRva2VuKHVzZXIuZ2V0KFwiaWRcIikpO1xuICAgICAgcmV0dXJuIHsgdG9rZW4sIHVzZXIgfTtcbiAgICB9LFxuICB9LFxuICBTdWJzY3JpcHRpb246IHtcbiAgICBwb3N0QWRkZWQ6IHtcbiAgICAgIHN1YnNjcmliZTogKCkgPT4gcHVic3ViLmFzeW5jSXRlcmF0b3IoW1BPU1RfQURERURdKSxcbiAgICB9LFxuICAgIGNvbW1lbnRBZGRlZDoge1xuICAgICAgc3Vic2NyaWJlOiB3aXRoRmlsdGVyKFxuICAgICAgICAoKSA9PiBwdWJzdWIuYXN5bmNJdGVyYXRvcihDT01NRU5UX0FEREVEKSxcbiAgICAgICAgKHBheWxvYWQsIHZhcmlhYmxlcykgPT4ge1xuICAgICAgICAgIHJldHVybiBwYXlsb2FkLmNvbW1lbnRBZGRlZC5kYXRhVmFsdWVzLnBvc3RJZCA9PSB2YXJpYWJsZXMucG9zdElkO1xuICAgICAgICB9XG4gICAgICApLFxuICAgIH0sXG4gICAgbGlrZUFkZGVkOiB7XG4gICAgICBzdWJzY3JpYmU6IHB1YnN1Yi5hc3luY0l0ZXJhdG9yKFtMSUtFX0FEREVEXSksXG4gICAgfSxcbiAgfSxcbiAgUG9zdDoge1xuICAgIGxpa2VzOiB7XG4gICAgICByZXNvbHZlOiAocGFyZW50LCBhcmdzLCB7IHJlcXVlc3QgfSwgaW5mbykgPT4ge1xuICAgICAgICByZXR1cm4gTGlrZS5maW5kQWxsKHsgd2hlcmU6IHsgcG9zdElkOiBwYXJlbnQuaWQgfSB9KTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjb21tZW50czoge1xuICAgICAgcmVzb2x2ZTogKHBhcmVudCwgYXJncywgeyByZXF1ZXN0IH0sIGluZm8pID0+IHtcbiAgICAgICAgcmV0dXJuIENvbW1lbnQuZmluZEFsbCh7XG4gICAgICAgICAgd2hlcmU6IHsgcG9zdElkOiBwYXJlbnQuaWQgfSxcbiAgICAgICAgICBvcmRlcjogW1tcImNyZWF0ZWRBdFwiLCBcIkRFU0NcIl1dLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhdXRob3I6IHtcbiAgICAgIHJlc29sdmU6IChwYXJlbnQsIGFyZ3MsIHsgcmVxdWVzdCB9LCBpbmZvKSA9PiB7XG4gICAgICAgIHJldHVybiBVc2VyLmZpbmRCeVBrKHBhcmVudC51c2VySWQpO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBDb21tZW50OiB7XG4gICAgbGlrZXM6IHtcbiAgICAgIHJlc29sdmU6IChwYXJlbnQsIGFyZ3MsIHsgcmVxdWVzdCB9LCBpbmZvKSA9PiB7XG4gICAgICAgIHJldHVybiBMaWtlLmZpbmRBbGwoeyB3aGVyZTogeyBjb21tZW50SWQ6IHBhcmVudC5pZCB9IH0pO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGF1dGhvcjoge1xuICAgICAgcmVzb2x2ZTogKHBhcmVudCwgYXJncywgeyByZXF1ZXN0IH0sIGluZm8pID0+IHtcbiAgICAgICAgcmV0dXJuIFVzZXIuZmluZEJ5UGsocGFyZW50LnVzZXJJZCk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgcG9zdDoge1xuICAgICAgcmVzb2x2ZTogKHBhcmVudCwgYXJncywgeyByZXF1ZXN0IH0sIGluZm8pID0+IHtcbiAgICAgICAgcmV0dXJuIFBvc3QuZmluZEJ5UGsocGFyZW50LnBvc3RJZCk7XG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIExpa2U6IHtcbiAgICBhdXRob3I6IHtcbiAgICAgIHJlc29sdmU6IChwYXJlbnQsIGFyZ3MsIHsgcmVxdWVzdCB9LCBpbmZvKSA9PiB7XG4gICAgICAgIHJldHVybiBVc2VyLmZpbmRCeVBrKHBhcmVudC51c2VySWQpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHBvc3Q6IHtcbiAgICAgIHJlc29sdmU6IChwYXJlbnQsIGFyZ3MsIHsgcmVxdWVzdCB9LCBpbmZvKSA9PiB7XG4gICAgICAgIHJldHVybiBQb3N0LmZpbmRCeVBrKHBhcmVudC5wb3N0SWQpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIGNvbW1lbnQ6IHtcbiAgICAgIHJlc29sdmU6IChwYXJlbnQsIGFyZ3MsIHsgcmVxdWVzdCB9LCBpbmZvKSA9PiB7XG4gICAgICAgIHJldHVybiBDb21tZW50LmZpbmRCeVBrKHBhcmVudC5jb21tZW50SWQpO1xuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBEYXRlOiBuZXcgR3JhcGhRTFNjYWxhclR5cGUoe1xuICAgIG5hbWU6IFwiRGF0ZVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkRhdGUgY3VzdG9tIHNjYWxhciB0eXBlXCIsXG4gICAgcGFyc2VWYWx1ZSh2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTsgLy8gdmFsdWUgZnJvbSB0aGUgY2xpZW50XG4gICAgfSxcbiAgICBzZXJpYWxpemUodmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5nZXRUaW1lKCk7IC8vIHZhbHVlIHNlbnQgdG8gdGhlIGNsaWVudFxuICAgIH0sXG4gICAgcGFyc2VMaXRlcmFsKGFzdCkge1xuICAgICAgaWYgKGFzdC5raW5kID09PSBLaW5kLklOVCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQoYXN0LnZhbHVlLCAxMCk7IC8vIGFzdCB2YWx1ZSBpcyBhbHdheXMgaW4gc3RyaW5nIGZvcm1hdFxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgfSksXG59O1xuIl19