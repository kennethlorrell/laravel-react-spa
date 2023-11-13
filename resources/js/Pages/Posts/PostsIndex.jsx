import { useEffect, useState } from 'react';
import Post from '@/Components/Posts/Post.jsx';
import Pagination from '@/Components/Posts/Pagination.jsx';

const PostsIndex = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts?' + new URLSearchParams({ page }));
      const json = await response.json();

      setPosts(json.data);
      setMeta(json.meta);
    }

    fetchPosts(page);
  }, [page]);

  const handlePageChange = (url) => {
    const fullUrl = new URL(url);
    const newPage = fullUrl.searchParams.get('page');

    setPage(newPage);
  }

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
        <Pagination
          meta={meta}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PostsIndex;
