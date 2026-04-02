import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import { postKeys } from '../react-query/queryKeys';
import Comments from './Comments';
import { getPost, deletePost } from '../api';

function Post() {
  let { id } = useParams();
  const navigate = useNavigate();
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

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.setQueryData(postKeys.all, (oldData) => {
        if (!oldData) return [];
        return oldData.filter((p) => String(p.id) !== String(id));
      });
      navigate(-1);
    },
  });

  return (
    <>
      <article key={post.id} style={styles.postCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>{post.title}</h2>
          <button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            style={styles.deleteBtn}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
        <p style={styles.body}>{post.body}</p>
      </article>
      <Comments id={id} />
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  title: {
    fontSize: '1.5rem',
    margin: 0,
    color: '#111',
    textTransform: 'capitalize',
    fontWeight: '700',
  },
  deleteBtn: {
    backgroundColor: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  body: {
    fontSize: '1rem',
    margin: 0,
    color: '#444',
    lineHeight: '1.6',
  },
};

export default Post;
