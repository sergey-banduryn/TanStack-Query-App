import { useQuery } from '@tanstack/react-query';
import { postKeys } from '../react-query/queryKeys';
import { getComments } from '../api';

function Comments({ id }) {
  const {
    data: comments = [],
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: postKeys.comments(id),
    queryFn: () => getComments(id),
  });

  return (
    <section style={styles.section}>
      <h3 style={styles.title}>Comments</h3>
      {isLoading && <p style={styles.loadingText}>Loading comments...</p>}
      {isSuccess && comments.length === 0 && (
        <p style={styles.loadingText}>No comments yet</p>
      )}
      {isSuccess && comments.length > 0 && (
        <div style={styles.list}>
          {comments.map((comment) => (
            <div key={comment.id} style={styles.item}>
              <div style={styles.header}>
                <span style={styles.name}>{comment.name}</span>
                <span style={styles.email}>{comment.email}</span>
              </div>
              <p style={styles.body}>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    marginTop: '20px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#111827',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  item: {
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #f3f4f6',
    transition: 'all 0.2s ease',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8px',
  },
  name: {
    fontWeight: '600',
    fontSize: '0.95rem',
    color: '#111827',
    textTransform: 'capitalize',
  },
  email: {
    fontSize: '0.8rem',
    color: '#6b7280',
    marginTop: '2px',
  },
  body: {
    fontSize: '0.95rem',
    color: '#374151',
    margin: 0,
    whiteSpace: 'pre-line',
  },
  loadingText: {
    color: '#9ca3af',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: '20px',
  },
};

export default Comments;
