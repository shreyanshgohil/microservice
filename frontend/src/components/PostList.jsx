import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchAllPostHandler = async () => {
    const response = await axios.get('http://localhost:4000/posts');
    setPosts(response.data);
  };
  useEffect(() => {
    fetchAllPostHandler();
  }, []);
  return (
    <div>
      <h1>Post list</h1>
      {Object.values(posts).map((singlePostObj, index) => {
        return (
          <div key={index}>
            <div>
              <p>{singlePostObj.title}</p>
            </div>
            <CreateComment id={singlePostObj.id} />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
