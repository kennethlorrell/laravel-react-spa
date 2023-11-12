import { useEffect, useState } from 'react';
import Post from '@/Components/Posts/Post.jsx';

const PostsIndex = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const { data } = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
      <div className="min-w-full align-middle">
        <table className="table">
          <thead className="table-header">
          <tr>
            <th>
              <span>ID</span>
            </th>
            <th>
              <span>Title</span>
            </th>
            <th>
              <span>Content</span>
            </th>
            <th>
              <span>Created at</span>
            </th>
          </tr>
          </thead>
          <tbody className="table-body">
            {
              posts.map((post) => (
                <Post key={post.id} post={post} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PostsIndex;
