import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { postKeys } from '../react-query/queryKeys';
import Comments from './Comments';
import { getPost } from '../api';
import EditPostForm from './EditPostForm';
import PostContent from './PostContent';

function Post() {
  let { id } = useParams();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const {
    data: post,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
    placeholderData: () => {
      const posts = queryClient.getQueryData(postKeys.all);
      const post = posts?.find((post) => post.id === id);
      return post;
    },
  });

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
