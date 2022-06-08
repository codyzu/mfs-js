/* eslint-disable unicorn/prefer-module */
const parse = require('pg-connection-string');

// eslint-disable-next-line import/extensions
const pgConfig = parse(require('./connection-string'));

module.exports = {
  migrationPattern: 'migrations/*',
  driver: 'pg',
  // Postgrator expects username (not user)
  username: pgConfig.user,
  ...pgConfig,
};
