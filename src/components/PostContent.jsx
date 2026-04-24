import { useNavigate } from 'react-router';
import { useNotification } from './Notification';
import { useDeletePost } from '../react-query/mutations';

function PostContent({ onEdit, post }) {
  const navigate = useNavigate();
  const deleteMutation = useDeletePost(post.id);
  const notify = useNotification();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      navigate(-1);
      notify('Post deleted successfully');
    } catch (error) {
      notify(error.message);
    }
  };

  return (
    <>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {post.id} {post.title}
        </h2>
        <div style={styles.actions}>
          <button onClick={onEdit} style={styles.editBtn}>
            Edit
          </button>
          <button
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
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
  actions: {
    display: 'flex',
    gap: '10px',
  },
  body: {
    color: '#444',
    fontSize: '1rem',
    lineHeight: '1.6',
    margin: 0,
  },
  deleteBtn: {
    backgroundColor: '#ff4d4f',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    padding: '8px 16px',
    transition: 'all 0.2s',
  },
  editBtn: {
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '6px',
    color: '#333',
    cursor: 'pointer',
    fontWeight: '600',
    padding: '8px 16px',
  },
  header: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  title: {
    color: '#111',
    fontSize: '1.5rem',
    fontWeight: '700',
    margin: 0,
    textTransform: 'capitalize',
  },
};

export default PostContent;
