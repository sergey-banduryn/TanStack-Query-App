import { Suspense } from 'react';
import PostsList from './PostsList';
import { useSuspenseGetPosts } from '../react-query/queries';
import { useResetAllPosts } from '../react-query/common';

function PostsSuspense() {
  const resetAllPosts = useResetAllPosts();

  return (
    <>
      <div style={styles.controls}>
        <button style={styles.toggleButton} onClick={resetAllPosts}>
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

function PostsListSuspense() {
  const { data: posts } = useSuspenseGetPosts();

  return <PostsList posts={posts} />;
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

export default PostsSuspense;
