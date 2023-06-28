import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};
app.get('/posts', (req, res, next) => {
  res.send(posts);
});

app.post('/posts', async (req, res, next) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  const singlePost = {
    id,
    title,
  };
  posts[id] = singlePost;
  await axios
    .post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: singlePost,
    })
    .catch((err) => console.log(err));
  res.status(201).send(singlePost);
});

app.post('/events', async (req, res, next) => {
  console.log('Event received', req.body.type);
  res.status(201).send('Event receive');
});

app.listen(4000, () => {
  console.log('Hello from the v50');
  console.log('Post started at port 4000');
});
