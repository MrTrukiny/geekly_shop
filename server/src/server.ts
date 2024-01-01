import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.get('/api/v1/products', (req, res) => res.json([]));
server.get('/api/v1/products/:id', (req, res) => res.json({}));

export default server;
