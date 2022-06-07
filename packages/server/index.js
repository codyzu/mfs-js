import process from 'node:process';
import app from './server.js';
import dev from './src/dev.js';

if (dev) {
  // Listen to the default (localhost) in dev
  app.listen(process.env.PORT ?? 3001);
} else {
  // Listen to all interfaces in production
  app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
