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
  body: {
    color: '#555',
    fontSize: '0.85rem',
    lineHeight: '1.4',
    margin: 0,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  postCard: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    padding: '8px 12px',
  },
  title: {
    color: '#222',
    fontSize: '1rem',
    margin: '0 0 4px 0',
    textTransform: 'capitalize',
  },
};

export default PostsList;
