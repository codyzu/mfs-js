import process from 'node:process';
import app from './server.js';

app.listen(process.env.PORT ?? 3001);
