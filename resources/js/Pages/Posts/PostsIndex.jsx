import { useEffect, useState } from 'react';
import PostsTable from '@/Components/Posts/PostsTable.jsx';
import Pagination from '@/Components/Pagination/Pagination.jsx';
import CategoryFilter from '@/Components/Categories/CategoryFilter.jsx';

const INITIAL_QUERY = {
  page: 1,
  order_field: 'id',
  order_direction: 'desc'
};

const PostsIndex = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [queryParams, setQueryParams] = useState(INITIAL_QUERY);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      const params = new URLSearchParams(queryParams);

      const { data: { data, meta } } = await axios.get(`/api/posts?${params}`);

      setPosts(data);
      setMeta(meta);
    }

    fetchPosts();
  }, [queryParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: { data } } = await axios.get('/api/categories');

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

  const handleOrderChange = (field) => {
    let direction = 'asc';

    if (field === queryParams.order_field) {
      direction = queryParams.order_direction === 'asc' ? 'desc' : 'asc'
    }

    setQueryParams((prevState) => ({
      ...prevState,
      order_field: field,
      order_direction: direction
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
        <PostsTable
          posts={posts}
          queryParams={queryParams}
          handleOrderChange={handleOrderChange}
        />
        <Pagination
          meta={meta}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PostsIndex;
