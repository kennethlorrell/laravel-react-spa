import { Link } from 'react-router-dom';

const PostsRow = ({ post, handlePostDelete }) => (
  <tr>
    <td>{ post.id }</td>
    <td>{ post.title }</td>
    <td>{ post.content }</td>
    <td>{ post.category?.name }</td>
    <td>{ post.created_at }</td>
    <td>
      <div className="flex justify-center align-middle">
        <Link
          to={`/posts/edit/${post.id}`}
          className="px-3 py-1 bg-green-500 rounded-full text-white font-bold mr-2"
        >
          Edit
        </Link>
        <button
          value={post.id}
          onClick={handlePostDelete}
          type="button"
          className="px-3 py-1 bg-red-500 rounded-full text-white font-bold"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default PostsRow;
