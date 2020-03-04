const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const customEnv = require('custom-env');

const mainRouter = require('./routes');
const { handleNotFound, handleServerError } = require('../controllers/error.controllers');

customEnv.env(true, path.resolve(__dirname, '..', '..', 'env'));

const app = express();

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', mainRouter);
app.use(handleNotFound);
app.use(handleServerError);

module.exports = app;
