import PostsList from './PostsList';
import Spinner from './Spinner';
import { useResetAllPosts } from '../react-query/common';
import { useSomePosts } from '../react-query/queries';

const ids = ['1', '2', '3', '4', '5'];

function SomePosts() {
  const resetAllPosts = useResetAllPosts();
  const { isLoading, posts } = useSomePosts(ids);

  return (
    <>
      <div style={styles.controls}>
        <button onClick={resetAllPosts} style={styles.toggleButton}>
          Reset
        </button>
      </div>
      <h1 style={styles.heading}>Recent Posts {isLoading && <Spinner />}</h1>
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
    alignItems: 'center',
    display: 'flex',
    gap: '10px',
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

export default SomePosts;
