import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { postKeys } from '../react-query/queryKeys';
import PostsList from './PostsList';
import { getPosts } from '../api';

function Posts() {
  const [enabled, setEnabled] = useState(true);
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: postKeys.all,
    queryFn: getPosts,
    enabled: enabled,
  });

  const handleReset = () => {
    queryClient.resetQueries(postKeys.all);
  };

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
        <button style={styles.toggleButton} onClick={handleReset}>
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
