import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/events', (req, res) => {
  const event = req.body;
  axios
    .post('http://post-clusterip-srv:4000/events', event)
    .catch((err) => console.log(err));
  // axios
  //   .post('http://localhost:4001/events', event)
  //   .catch((err) => console.log(err));
  // axios
  //   .post('http://localhost:4002/events', event)
  //   .catch((err) => console.log(err));
  // axios
  //   .post('http://localhost:4003/events', event)
  //   .catch((err) => console.log(err));
  res.status(200).send({ status: 'ok' });
});

app.listen(4005, () => {
  console.log('service bus starts on 4005');
});
