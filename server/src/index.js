const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const debug = require('debug')('server');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const port = 3103;
require('dotenv').config();

const server = express();

mongoose.connect(
  process.env.DDBB_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
);

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));
require('./passport/passport.config');

const pizzasRouter = require('./routes/pizzasRouter');
const drinksRouter = require('./routes/drinksRouter');
const usersRouter = require('./routes/usersRouter');
const costumersRouter = require('./routes/costumersRouter');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

server.use('/', authRoutes);
server.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  userRoutes
);

server.use(
  '/api/pizzas',
  passport.authenticate('jwt', { session: false }),
  pizzasRouter
);

server.use(
  '/api/drinks',
  passport.authenticate('jwt', { session: false }),
  drinksRouter
);

server.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRouter
);

server.use(
  '/api/costumers',
  passport.authenticate('jwt', { session: false }),
  costumersRouter
);

server.listen(port,
  () => debug(`Server is running in ${chalk.yellow(`localhost:${port}`)}`));
