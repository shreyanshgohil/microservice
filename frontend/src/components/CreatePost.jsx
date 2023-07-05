import { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState('');

  //   For form input change
  const inputChangeHandler = (event) => {
    const { value } = event.target;
    setPostTitle(value);
  };
  //   For add the post
  const addPostHandler = async () => {
    await axios.post('http://posts.com/posts/create', { title: postTitle });
    setPostTitle('');
  };
  //   For form submit handler
  const formSubmitHandler = (event) => {
    event.preventDefault();
  };

  //   For fetch all the post

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="post-title">Hello worlddddddddddd</label>
        <input type="text" onChange={inputChangeHandler} />
        <button onClick={addPostHandler}>Add post </button>
      </form>
    </div>
  );
};

export default CreatePost;
