import process from 'node:process';
import app from './server.js';
import dev from './src/dev.js';

const port = process.env.PORT ?? 3001;

if (dev) {
  // Listen to the default (localhost) in dev
  app.listen({port});
} else {
  // Listen to all interfaces in production
  app.listen({port, host: '0.0.0.0'});
}
