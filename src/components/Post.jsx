import { useState } from 'react';
import { useParams } from 'react-router';
import Comments from './Comments';
import EditPostForm from './EditPostForm';
import PostContent from './PostContent';
import { useGetPost } from '../react-query/queries';

function Post() {
  let { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const { data: post, isLoading, isSuccess } = useGetPost(id);

  return (
    <>
      <article style={styles.postCard}>
        {isLoading && <p>Loading post...</p>}
        {isSuccess && !post && <p>Post not found</p>}
        {isSuccess &&
          post &&
          (isEditing ? (
            <EditPostForm post={post} onCancel={() => setIsEditing(false)} />
          ) : (
            <>
              <PostContent post={post} onEdit={() => setIsEditing(true)} />
              <Comments id={id} />
            </>
          ))}
      </article>
    </>
  );
}

const styles = {
  postCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    marginBottom: '20px',
  },
};

export default Post;
