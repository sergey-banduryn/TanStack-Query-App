import { useState } from 'react';
import PostsList from './PostsList';
import { useResetAllPosts } from '../react-query/common';
import { useGetPosts } from '../react-query/queries';

function Posts() {
  const [enabled, setEnabled] = useState(true);
  const resetAllPosts = useResetAllPosts();
  const { data: posts = [], isLoading, refetch } = useGetPosts(enabled);

  return (
    <>
      <div style={styles.controls}>
        <button
          onClick={() => setEnabled(!enabled)}
          style={styles.toggleButton}
        >
          {enabled ? 'enabled' : 'disabled'}
        </button>
        <button onClick={() => refetch()} style={styles.toggleButton}>
          Refetch
        </button>
        <button onClick={resetAllPosts} style={styles.toggleButton}>
          Reset
        </button>
      </div>
      <h1 style={styles.heading}>Recent Posts</h1>
      {isLoading && <div>Loading...</div>}
      <PostsList posts={posts} />
    </>
  );
}

const styles = {
  controls: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  heading: {
    marginBottom: '20px',
  },
  toggleButton: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '4px 8px',
  },
};

export default Posts;
