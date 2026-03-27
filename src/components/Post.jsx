import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { postKeys } from '../react-query/queryKeys';
import Comments from './Comments';
import { getPost } from '../api';

function Post() {
  let { id } = useParams();

  const queryClient = useQueryClient();

  const { data: post = {} } = useQuery({
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
      <article key={post.id} style={styles.postCard}>
        <h2 style={styles.title}>{post.title}</h2>
        <p style={styles.body}>{post.body}</p>
      </article>
      <Comments id={id} />
    </>
  );
}

const styles = {
  postCard: {
    border: '1px solid #eee',
    borderRadius: '4px',
    padding: '8px 12px',
    backgroundColor: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  title: {
    fontSize: '1rem',
    margin: '0 0 4px 0',
    color: '#222',
    textTransform: 'capitalize',
  },
  body: {
    fontSize: '0.85rem',
    margin: 0,
    color: '#555',
    lineHeight: '1.4',
  },
};

export default Post;
