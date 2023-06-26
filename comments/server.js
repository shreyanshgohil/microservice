import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';
const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const postComments = commentsByPostId[id] || [];
  res.status(200).send(postComments);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, comment });
  commentsByPostId[id] = comments;

  await axios
    .post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: { id: commentId, comment, postId: id },
    })
    .catch((err) => console.log(err));

  res.status(201).send(comments);
});

app.post('/events', async (req, res, next) => {
  console.log('Event received', req.body.type);
  res.status(201).send('Event receive');
});

app.listen(4001);
