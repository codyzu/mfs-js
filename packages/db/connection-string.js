import process from 'node:process';

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres:postgres@127.0.0.1:5433/postgres';

export default connectionString;
