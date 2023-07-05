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
  comments.push({ id: commentId, comment, status: 'pending' });
  commentsByPostId[id] = comments;

  await axios
    .post('http://event-bus-srv:4005/events', {
      type: 'CommentCreated',
      data: { id: commentId, comment, postId: id, status: 'pending' },
    })
    .catch((err) => console.log(err));

  res.status(201).send(comments);
});

app.post('/events', async (req, res, next) => {
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { id, comment, status, postId } = data;
    const postComments = commentsByPostId[postId];
    const commentIndex = postComments.findIndex(
      (singleElement) => singleElement.id === id
    );
    commentsByPostId[postId][commentIndex] = { id, status, comment };
    await axios
      .post('http://event-bus-srv:4005/events', {
        type: 'CommentUpdated',
        data: { id: id, comment, postId, status },
      })
      .catch((err) => console.log(err));
  }
  res.status(201).send('Event received');
});

app.listen(4001);
