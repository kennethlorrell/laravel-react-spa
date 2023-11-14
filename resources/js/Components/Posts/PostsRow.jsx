import { Link } from 'react-router-dom';

const PostsRow = ({ post }) => (
  <tr>
    <td>{ post.id }</td>
    <td>{ post.title }</td>
    <td>{ post.content }</td>
    <td>{ post.category?.name }</td>
    <td>{ post.created_at }</td>
    <td><Link to={`/posts/edit/${post.id}`}>Edit</Link></td>
  </tr>
);

export default PostsRow;
