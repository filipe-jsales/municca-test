const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cors = require('cors');
const identificator = require('../middlewares/identificator.js');

const middlewares = express.Router();

middlewares.use(compression({ level: 9 }));
middlewares.use(helmet());
middlewares.use(morgan(process.env.MORGANLOGLEVEL || 'common'));
middlewares.use(cors());
middlewares.use(bodyParser.json({ limit: '100mb' }));
middlewares.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
middlewares.use(identificator);

module.exports = middlewares;
