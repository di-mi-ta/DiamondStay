const
    express = require('express'),
    auth = require('../authenticate'),
    bodyParser = require('body-parser'),
    corsAllowAll = require('./cors').allowAll;

const Controllers = require('../controllers'),
      CommentCtrl = Controllers.CommentCtrl;

const commentRouter = express.Router();

commentRouter
    .use(bodyParser.json())
    .use(corsAllowAll);

commentRouter.route('/')
  .get(CommentCtrl.getComments)
  .post(CommentCtrl.postComment)

commentRouter.route('/:commentId')
  .get(CommentCtrl.getCommentById)
  .put(CommentCtrl.updateComment)
  .delete(CommentCtrl.deleteComment);

module.exports = commentRouter;
