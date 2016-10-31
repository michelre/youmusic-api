import express from 'express';

import { search, download } from './youtube-api';

const app = express();
const port = process.env.PORT || 3000;

app.get('/status', (req, res) => {
  res.send({ status: 'OK' });
});

app.get('/search', (req, res) => {
  search(req.query.q)
    .then(d => res.send(d));
});

app.get('/download/:id', (req, res) => {
  download(req.params.id)
    .then(downloadLink => res.send({ downloadLink }));
});

app.listen(port, () => console.log(`Server is listening on ${port}`));
