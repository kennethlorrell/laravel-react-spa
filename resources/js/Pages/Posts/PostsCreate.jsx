import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '@/Components/Common/ErrorMessage.jsx';

const PostsCreate = () => {
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: { data } } = await axios.get('/api/categories');

      setCategories(data);
    }

    fetchCategories();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    setIsLoading(true);

    try {
      await axios.post('/api/posts', {
        title,
        content,
        category_id: categoryId
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      setErrors(err.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label
          htmlFor="title"
          className="block font-medium text-sm text-gray-700"
        >
          Title
        </label>
        <input
          required
          value={title}
          onChange={handleTitleChange}
          id="title"
          type="text"
          className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <ErrorMessage
          errors={errors}
          field='title'
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="content"
          className="block font-medium text-sm text-gray-700"
        >
          Content
        </label>
        <textarea
          required
          value={content}
          onChange={handleContentChange}
          id="content"
          className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <ErrorMessage
          errors={errors}
          field='content'
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="category"
          className="block font-medium text-sm text-gray-700"
        >
          Category
        </label>
        <select
          required
          value={categoryId}
          onChange={handleCategoryChange}
          id="category"
          className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select category</option>
          {
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))
          }
        </select>
        <ErrorMessage
          errors={errors}
          field='category_id'
        />
      </div>
      <div className="mt-4">
        <button type="submit" className="flex items-center px-3 py-2 bg-blue-600 text-white rounded" disabled={isLoading}>
          <svg role="status" className={`w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 inline ${isLoading ? '' : 'hidden'}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span>Save</span>
        </button>
      </div>
    </form>
  );
};

export default PostsCreate;