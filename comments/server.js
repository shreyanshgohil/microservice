import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const postComments = commentsByPostId[id] || [];
  res.status(200).send(postComments);
});

app.post('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const commentId = randomBytes(4).toString('hex');
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, comment });
  commentsByPostId[id] = comments;
  res.status(201).send(comments);
});

app.listen(4001);
