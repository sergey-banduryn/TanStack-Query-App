import { useQueries, useQueryClient } from '@tanstack/react-query';
import Spinner from './Spinner';
import { postKeys } from '../react-query/queryKeys';
import PostsList from './PostsList';
import { getPost } from '../api';

const ids = ['1', '2', '3', '4', '5'];

function SomePosts() {
  const queryClient = useQueryClient();

  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: postKeys.detail(id),
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, id * 1000));
        return getPost(id);
      },
    })),
    combine: (results) => {
      return {
        posts: results.filter((res) => res.isSuccess).map((res) => res.data),
        isLoading: results.some((res) => res.isLoading),
      };
    },
  });

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
      <h1 style={styles.heading}>
        Recent Posts {results.isLoading && <Spinner />}
      </h1>
      <PostsList posts={results.posts} />
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
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
};

export default SomePosts;
