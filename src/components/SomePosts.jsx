import Spinner from './Spinner';
import PostsList from './PostsList';
import { useSomePosts } from '../react-query/queries';
import { useResetAllPosts } from '../react-query/common';

const ids = ['1', '2', '3', '4', '5'];

function SomePosts() {
  const resetAllPosts = useResetAllPosts();
  const { posts, isLoading } = useSomePosts(ids);

  return (
    <>
      <div style={styles.controls}>
        <button style={styles.toggleButton} onClick={resetAllPosts}>
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
