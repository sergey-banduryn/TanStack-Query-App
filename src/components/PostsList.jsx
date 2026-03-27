import { Link } from 'react-router';

function PostsList({ posts = [] }) {
  const sortedPosts = posts.toSorted((a, b) => b.id - a.id);

  return (
    <div style={styles.list}>
      {sortedPosts.map((post) => (
        <Link key={post.id} to={`/Posts/${post.id}`}>
          <article style={styles.postCard}>
            <h2 style={styles.title}>{post.title}</h2>
            <p style={styles.body}>{post.body}</p>
          </article>
        </Link>
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
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

export default PostsList;
