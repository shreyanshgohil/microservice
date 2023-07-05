import React from 'react';
import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

const App = () => {
  console.log('first');
  return (
    <div>
      <h1>List of posts</h1>
      <CreatePost />
      <PostList />
    </div>
  );
};

export default App;
