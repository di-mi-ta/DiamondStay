const express = require('express');
const usersRouter = require('./routes/users');
const homePostRouter = require('./routes/homePostRouter');
const hostPromoRouter = require('./routes/hostPromoRouter');
const systemPromoRouter = require('./routes/systemPromoRouter');

const app = express();
require('./initialize')(app);

app.use('/users', usersRouter);
app.use('/homeposts', homePostRouter);
app.use('/host-promotions', hostPromoRouter);
app.use('/system-promotions', systemPromoRouter)
app.use('/messages', require('./routes/messages'));

// Path unmatched any of the routes -> reject
app.use(function (req, res, next) {
  res.status(404).json({
    error: 'Bad request',
  });
});

module.exports = app;
