import { useGetComments } from '../react-query/queries';

function Comments({ id }) {
  const { data: comments = [], isLoading, isSuccess } = useGetComments(id);

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
  body: {
    color: '#374151',
    fontSize: '0.95rem',
    margin: 0,
    whiteSpace: 'pre-line',
  },
  email: {
    color: '#6b7280',
    fontSize: '0.8rem',
    marginTop: '2px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8px',
  },
  item: {
    backgroundColor: '#f9fafb',
    border: '1px solid #f3f4f6',
    borderRadius: '12px',
    padding: '20px',
    transition: 'all 0.2s ease',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  loadingText: {
    color: '#9ca3af',
    fontStyle: 'italic',
    padding: '20px',
    textAlign: 'center',
  },
  name: {
    color: '#111827',
    fontSize: '0.95rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  section: {
    marginTop: '20px',
  },
  title: {
    alignItems: 'center',
    color: '#111827',
    display: 'flex',
    fontSize: '1.5rem',
    fontWeight: '700',
    gap: '8px',
    marginBottom: '20px',
  },
};

export default Comments;
