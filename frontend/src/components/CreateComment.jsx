import { useState, useEffect } from 'react';
import axios from 'axios';
const CreateComment = ({ id }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const inputChangeHandler = (event) => {
    setComment(event.target.value);
  };
  const addCommentHandler = async () => {
    await axios.post(`http://localhost:4001/posts/${id}/comments`, {
      comment: comment,
    });
  };

  const fetchCommentsHandler = async () => {
    const response = await axios.get(
      `http://localhost:4001/posts/${id}/comments`
    );
    setComments(response.data);
  };

  useEffect(() => {
    fetchCommentsHandler();
  }, []);
  return (
    <div>
      <div>
        <ul>
          {comments.map((comment) => (
            <li>{comment.comment}</li>
          ))}
        </ul>
      </div>
      <input type="text" onChange={inputChangeHandler} />
      <button onClick={addCommentHandler}>Add comment</button>
    </div>
  );
};

export default CreateComment;
