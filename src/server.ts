import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';

const app = express();

app.use(express.json());

app.listen(3333, async () => {
  console.log('⚡ Server started ⚡');
});
