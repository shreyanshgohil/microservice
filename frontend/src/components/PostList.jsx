import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchAllPostHandler = async () => {
    const response = await axios.get('http://posts.com/posts');
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
            <CreateComment
              id={singlePostObj.id}
              comments={singlePostObj.comments}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
