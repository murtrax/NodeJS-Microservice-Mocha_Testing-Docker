const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const jsonPatchRouter = require('./routes/jsonPatch.js');
const thumbnailRouter = require('./routes/thumbnail.js');

const verifyUser = require('./middleware/verifyUser');

const app = express();
app.use(express.json());

if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/user', userRouter);
app.use('/api/jsonPatch', verifyUser, jsonPatchRouter);
app.use('/api/thumbnail', verifyUser, thumbnailRouter);
module.exports = app;
