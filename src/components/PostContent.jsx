import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { deletePost } from '../api';
import { postKeys } from '../react-query/queryKeys';

function PostContent({ post, onEdit }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: postKeys.detail(post.id) });
      queryClient.setQueryData(postKeys.all, (oldData) => {
        if (!oldData) return [];
        return oldData.filter((p) => p.id !== post.id);
      });
      navigate(-1);
    },
  });

  return (
    <>
      <div style={styles.header}>
        <h2 style={styles.title}>{post.title}</h2>
        <div style={styles.actions}>
          <button onClick={onEdit} style={styles.editBtn}>
            Edit
          </button>
          <button
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
            style={styles.deleteBtn}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      <p style={styles.body}>{post.body}</p>
    </>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  actions: {
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    backgroundColor: '#f3f4f6',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default PostContent;
