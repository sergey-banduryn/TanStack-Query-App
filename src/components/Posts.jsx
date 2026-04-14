import { useState } from 'react';
import PostsList from './PostsList';
import { useResetAllPosts } from '../react-query/common';
import { useGetPosts } from '../react-query/queries';

function Posts() {
  const [enabled, setEnabled] = useState(true);
  const resetAllPosts = useResetAllPosts();
  const { data: posts = [], refetch, isLoading } = useGetPosts(enabled);

  return (
    <>
      <div style={styles.controls}>
        <button
          style={styles.toggleButton}
          onClick={() => setEnabled(!enabled)}
        >
          {enabled ? 'enabled' : 'disabled'}
        </button>
        <button style={styles.toggleButton} onClick={() => refetch()}>
          Refetch
        </button>
        <button style={styles.toggleButton} onClick={resetAllPosts}>
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
  toggleButton: {
    padding: '4px 8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
  },
  heading: {
    marginBottom: '20px',
  },
};

export default Posts;
