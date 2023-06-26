import cors from 'cors';
import express from 'express';
const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', async (req, res, next) => {
  res.status(200).send(posts);
});

app.post('/events', async (req, res, next) => {
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (type === 'CommentCreated') {
    const { id, comment, postId } = data;
    posts[postId] = {
      ...posts[postId],
      comments: [...posts[postId].comments, { comment, id }],
    };
  }
  res.status(201).send('Event receive');
});

app.listen(4002, () => {
  console.log('On port 4002');
});
