import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import PostsList from './PostsList';
import Spinner from './Spinner';
import { useSuspenseInfiniteGetPosts } from '../react-query/queries';

function PostsListSuspense() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useSuspenseInfiniteGetPosts({ limit: 10, page: 1 });

  const posts = data.pages.flatMap((page) => page.posts);

  const scrolledElementRef = useRef(null);

  useEffect(() => {
    scrolledElementRef.current = document.querySelector('main');
  }, []);

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    root: scrolledElementRef.current,
    rootMargin: '0px 0px 600px 0px',
    skip: isFetchingNextPage,
    threshold: 0,
  });

  return (
    <>
      <PostsList posts={posts} />
      {isSuccess && hasNextPage && (
        <div style={styles.buttonContainer}>
          <button
            disabled={isFetchingNextPage}
            onClick={fetchNextPage}
            ref={ref}
            style={styles.toggleButton}
          >
            Load More
          </button>
          {isFetchingNextPage && <Spinner />}
        </div>
      )}
    </>
  );
}

const styles = {
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  toggleButton: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '4px 8px',
  },
};

export { PostsListSuspense };
