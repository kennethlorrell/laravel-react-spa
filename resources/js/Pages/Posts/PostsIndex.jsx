import { useEffect, useState } from 'react';
import Post from '@/Components/Posts/Post.jsx';
import Pagination from '@/Components/Pagination/Pagination.jsx';
import CategoryFilter from '@/Components/Categories/CategoryFilter.jsx';

const INITIAL_QUERY = {
  page: 1
};

const PostsIndex = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [queryParams, setQueryParams] = useState(INITIAL_QUERY);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts?' + new URLSearchParams(queryParams));
      const json = await response.json();

      setPosts(json.data);
      setMeta(json.meta);
    }

    fetchPosts();
  }, [queryParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const { data } = await response.json();

      setCategories(data);
    }

    fetchCategories();
  }, []);

  const handlePageChange = (url) => {
    const fullUrl = new URL(url);
    const newPage = fullUrl.searchParams.get('page');

    setQueryParams((prevState) => ({
      ...prevState,
      page: newPage
    }));
  }

  const handleCategorySelect = (e) => {
    e.preventDefault();

    setQueryParams((prevState) => ({
      ...prevState,
      page: 1,
      category_id: e.target.value
    }));
  }

  return (
    <div className="overflow-hidden overflow-x-auto p-6 bg-white border-gray-200">
      <div className="min-w-full align-middle">
        <CategoryFilter
          categories={categories}
          handleCategorySelect={handleCategorySelect}
        />
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
              <span>Category</span>
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
