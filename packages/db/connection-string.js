import process from 'node:process';

const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres:postgres@localhost:5433/postgres';

export default connectionString;
