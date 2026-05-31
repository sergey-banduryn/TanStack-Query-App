import { Suspense } from 'react';
import { PostsListSuspense } from './PostsListSuspense';
import { useResetAllPosts } from '../react-query/common';

function PostsSuspense() {
  const resetAllPosts = useResetAllPosts();

  return (
    <>
      <div style={styles.controls}>
        <button onClick={resetAllPosts} style={styles.toggleButton}>
          Reset
        </button>
      </div>
      <h1 style={styles.heading}>Recent Posts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PostsListSuspense />
      </Suspense>
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

export default PostsSuspense;
