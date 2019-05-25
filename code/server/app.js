const express = require('express');
const usersRouter = require('./routes/users');
const homepostRouter = require('./routes/homepost');
const hostPromoRouter = require('./routes/hostPromo');
const systemPromoRouter = require('./routes/systemPromo');
const uploadFileRouter = require('./routes/upload');
const messageRouter = require('./routes/messages');
const commentRouter = require('./routes/comment');
const bookingRouter = require('./routes/booking');

const app = express();
require('./initialize')(app);

// for test
// const test = require('./make-test/create-homepost')

app.use(express.static('public'))
app.use('/users', usersRouter);
app.use('/homeposts', homepostRouter);
app.use('/host-promotions', hostPromoRouter);
app.use('/system-promotions', systemPromoRouter);
app.use('/messages', messageRouter);
app.use('/upload', uploadFileRouter);
app.use('/comments', commentRouter);
app.use('/booking', bookingRouter);

// Path unmatched any of the routes -> reject
app.use(function (req, res, next) {
  res.status(404).json({
    error: 'Bad request',
  });
});

module.exports = app;
