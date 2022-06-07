const process = require('process');

module.exports =
  process.env.DATABASE_URL ||
  'postgres://postgres:postgres@localhost:5433/postgres';
