import parse from 'pg-connection-string';
import connectionString from './connection-string.js';

const pgConfig = parse(connectionString);

const config = {
  migrationPattern: 'migrations/*',
  driver: 'pg',
  // Postgrator expects username (not user)
  username: pgConfig.user,
  ...pgConfig,
};

export default config;
