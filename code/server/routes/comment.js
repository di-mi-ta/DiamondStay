const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const commentRouter = express.Router();
commentRouter.use(bodyParser.json());

const Controllers  = require('../controllers');
const CommentCtrl = Controllers.CommentCtrl;

commentRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200);})
.get(cors.cors, CommentCtrl.getComments)
.post(cors.corsWithOptions, CommentCtrl.postComment)

commentRouter.route('/:commentId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, CommentCtrl.getCommentById)

.put(cors.corsWithOptions, CommentCtrl.updateComment)
.delete(cors.corsWithOptions, CommentCtrl.deleteComment);

module.exports = commentRouter;