import process from 'node:process';
import app from './server.js';

app.listen(process.env.port ?? 3001);
