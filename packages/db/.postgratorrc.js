const parse = require('pg-connection-string')

const pgConfig = parse(require('./connection-string'))

module.exports = {
  "migrationPattern": "migrations/*",
  "driver": "pg",
  // postgrator expects username (not user)
  username: pgConfig.user,
  ...pgConfig
}
