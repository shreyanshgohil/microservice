import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
app.get('/posts', (req, res, next) => {
  res.send(posts);
});

app.post('/posts', (req, res, next) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const singlePost = {
    id,
    title,
  };
  posts[id] = singlePost;
  res.status(201).send(singlePost);
});

app.listen(4000, () => {
  console.log('Post started at port 4000');
});
