const Post = ({ post }) => {
  return (
    <tr>
      <td>{ post.id }</td>
      <td>{ post.title }</td>
      <td>{ post.content }</td>
      <td>{ post.created_at }</td>
    </tr>
  );
};

export default Post;
