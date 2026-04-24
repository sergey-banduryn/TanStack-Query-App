import { useState } from 'react';
import { useSearchParams } from 'react-router';
import Pagination from './Pagination';
import PostsList from './PostsList';
import { useScrollToTopOnPageChange } from '../hooks/useScrollToTop';
import { useResetAllPosts } from '../react-query/common';
import { useGetPosts } from '../react-query/queries';

function Posts() {
  const [enabled, setEnabled] = useState(true);
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  const resetAllPosts = useResetAllPosts();
  useScrollToTopOnPageChange(page);

  const {
    data = {},
    isLoading,
    isPlaceholderData,
    refetch,
  } = useGetPosts({
    enabled,
    limit,
    page,
  });

  const { meta = {}, posts = [] } = data;

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
      <div style={{ opacity: isPlaceholderData ? 0.5 : 1, zIndex: 1 }}>
        <PostsList posts={posts} />
      </div>
      <Pagination meta={meta} />
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
