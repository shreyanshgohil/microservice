import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';
const app = express();
app.use(express.json());
app.use(cors());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentCreated') {
    const status = data.comment.includes('orange') ? 'rejected' : 'accepted';
    await axios
      .post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: {
          id: data.id,
          comment: data.comment,
          status,
          postId: data.postId,
        },
      })
      .catch((err) => console.log(err));
  }
});

app.listen(4003);
