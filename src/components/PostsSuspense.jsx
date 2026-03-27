import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { postKeys } from '../react-query/queryKeys';
import PostsList from './PostsList';
import { getPosts } from '../api';

function PostsSuspense() {
  const queryClient = useQueryClient();

  const handleReset = () => {
    queryClient.resetQueries(postKeys.all);
  };

  return (
    <>
      <div style={styles.controls}>
        <button style={styles.toggleButton} onClick={handleReset}>
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
  const { data: posts } = useSuspenseQuery({
    queryKey: postKeys.all,
    queryFn: getPosts,
  });

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
