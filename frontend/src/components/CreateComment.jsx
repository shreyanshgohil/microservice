import axios from 'axios';
import { useState } from 'react';
const CreateComment = ({ id, comments }) => {
  const [comment, setComment] = useState('');
  const inputChangeHandler = (event) => {
    setComment(event.target.value);
  };
  const addCommentHandler = async () => {
    await axios.post(`http://posts.com/posts/${id}/comments`, {
      comment: comment,
    });
  };

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
