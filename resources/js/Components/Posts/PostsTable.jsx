import PostsRow from '@/Components/Posts/PostsRow.jsx';
import SortButton from '@/Components/Common/SortButton.jsx';

const PostsTable = ({ posts, queryParams, handleOrderChange }) => (
  <table className="table">
    <thead className="table-header">
    <tr>
      <th>
        <div>
          <span>ID</span>
          <SortButton
            newField='id'
            oldField={queryParams.order_field}
            direction={queryParams.order_direction}
            handleOrderChange={handleOrderChange}
          />
        </div>
      </th>
      <th>
        <div>
          <span>Title</span>
          <SortButton
            newField='title'
            oldField={queryParams.order_field}
            direction={queryParams.order_direction}
            handleOrderChange={handleOrderChange}
          />
        </div>
      </th>
      <th>
        <div>
          <span>Content</span>
        </div>
      </th>
      <th>
        <div>
          <span>Category</span>
        </div>
      </th>
      <th>
        <div>
          <span>Created at</span>
        </div>
      </th>
      <th></th>
    </tr>
    </thead>
    <tbody className="table-body">
    {
      posts.map((post) => (
        <PostsRow key={post.id} post={post} />
      ))
    }
    </tbody>
  </table>
);

export default PostsTable;
