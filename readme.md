# TanStack Query (React Query) CRUD App

This is a demonstration CRUD application for managing posts, built using **TanStack Query (React Query)** for efficient server state management, **React Router** for routing, **MirageJS** as a mock backend, and **CSS Grid** for a responsive layout.

This guide explains the key TanStack Query concepts and architectural patterns implemented in this project.

---

## Table of Contents
1. [Application Overview and Stack](#1-application-overview-and-stack)
2. [Query Organization & Keys Factory](#2-query-organization--keys-factory)
3. [Key Query Status Properties (isError, isFetching, isSuccess)](#3-key-query-status-properties-iserror-isfetching-issuccess)
4. [Optimizing Cache: initialData vs placeholderData](#4-optimizing-cache-initialdata-vs-placeholderdata)
5. [Clearing Cache on Logout (resetQueries)](#5-clearing-cache-on-logout-resetqueries)
6. [Creating Posts: Invalidate Queries (invalidateQueries)](#6-creating-posts-invalidate-queries-invalidatequeries)
7. [Updating Posts: Query Cancellation, Optimistic Updates, and Selective Refetching](#7-updating-posts-query-cancellation-optimistic-updates-and-selective-refetching)
8. [Deleting Posts: Updating Cache Locally with setQueryData](#8-deleting-posts-updating-cache-locally-with-setquerydata)
9. [List Cache vs. Detail Cache (Cache Consistency)](#9-list-cache-vs-detail-cache-cache-consistency)
10. [Mutation Handlers: mutate vs mutateAsync](#10-mutation-handlers-mutate-vs-mutateasync)
11. [Declarative Loading with Suspense and Infinite Scrolling](#11-declarative-loading-with-suspense-and-infinite-scrolling)
12. [Dynamic Parallel Queries: useQueries](#12-dynamic-parallel-queries-usequeries)

---

## 1. Application Overview and Stack

This project is a CRUD application demonstrating:
- A list of posts with infinite scroll, utilizing React Suspense and Intersection Observer.
- Detailed view of a post and its comments.
- Creation, editing (with optimistic updates), and deletion of posts.
- MirageJS integration (`src/server/server.js`) to mock a REST API with a simulated network delay of 1000ms.
- Clean CSS Grid layout for structured post card rendering.

---

## 2. Query Organization & Keys Factory

To structure cache keys and avoid typos, the project uses the **Keys Factory** pattern. All keys and query options are declared in [queryOptions.js](./src/react-query/queryOptions.js).

### Keys Factory (`postKeys`)
Centralizes all cache key patterns:
```javascript
const postKeys = {
  all: ['posts'],
  lists: () => [...postKeys.all, 'list'],
  list: (params) => [...postKeys.lists(), params],
  details: () => [...postKeys.all, 'detail'],
  detail: (postId) => [...postKeys.details(), postId],
  comments: (postId) => [...postKeys.detail(postId), 'comments'],
  infiniteList: () => [...postKeys.all, 'infiniteList'],
};
```

### Query Options Factory (`postOptions`)
Binds keys and query functions (`queryFn`) using TanStack Query's helper `queryOptions`:
```javascript
const postOptions = {
  detail: (id) =>
    queryOptions({
      queryKey: postKeys.detail(id),
      queryFn: () => getPost(id),
    }),
  list: (params) =>
    queryOptions({
      queryKey: postKeys.list(params),
      queryFn: () => getPosts(params),
    }),
  // ...
};
```

---

## 3. Key Query Status Properties (isError, isFetching, isSuccess)

The post details component [Post.jsx](./src/components/Post.jsx) demonstrates the use of key boolean flags representing a query's lifecycle:

```javascript
const { data: post, isError, isFetching, isSuccess } = useGetPost(id);
```

- **`isFetching`**: Indicates if a network request is currently in progress. This is crucial for showing background refresh indicators while the app displays cached data.
- **`isError`**: Evaluates to `true` if the query function throws an error. Used for error boundary rendering or inline alerts.
- **`isSuccess`**: Evaluates to `true` when the query successfully resolves and data is ready in `data`.

---

## 4. Optimizing Cache: initialData vs placeholderData

To improve user experience when navigating from a list page to a details page, the application implements preview data.

### `initialData`
- Seeded directly into the query cache.
- Useful for Server-Side Rendering (SSR) / SEO optimizations when complete, up-to-date data is already available at render time.
- The cache entry is marked as populated and fresh/stale based on `staleTime`.

### `placeholderData`
- **Does not persist in the cache**.
- Acts as a temporary UI placeholder (e.g., a loading skeleton or previous list view) while the background query fetches real data.
- In [queries.js](./src/react-query/queries.js), `useGetPost` looks up the post in the cached lists to show a preview immediately:

```javascript
placeholderData: () => {
  const allQueries = queryClient.getQueriesData({
    queryKey: postOptions.lists().queryKey,
  });

  // Try to find the post inside existing lists cache
  for (const [key, data] of allQueries) {
    const post = data?.posts?.find((p) => p.id === id);
    if (post) return post;
  }
  return null;
}
```

For list pagination, `placeholderData: keepPreviousData` (imported from `@tanstack/react-query`) is used to keep displaying the previous page's data while the new page loads, avoiding jarring UI jumps.

---

## 5. Clearing Cache on Logout (resetQueries)

When a user logs out, it is essential to wipe sensitive information from the cache. 

Using `queryClient.resetQueries` deletes cached data and resets queries to their initial states:
```javascript
function useResetAllPosts() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.resetQueries({ queryKey: postOptions.all().queryKey });
}
```
This resets all queries starting with the `['posts']` cache key prefix.

---

## 6. Creating Posts: Invalidate Queries (invalidateQueries)

In [mutations.js](./src/react-query/mutations.js#L5-L14), creating a post invalidates lists queries to trigger a refetch of stale list data:

```javascript
function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // Mark all lists as stale and trigger automatic refetch
      queryClient.invalidateQueries({ queryKey: postOptions.lists().queryKey });
    },
  });
}
```

---

## 7. Updating Posts: Query Cancellation, Optimistic Updates, and Selective Refetching

The update mutation `useUpdatePost` implements an **Optimistic Update** flow:

1. **`cancelQueries`**: Outgoing detail requests for the specific post are cancelled to avoid overwriting our optimistic data with older server responses.
2. **Context Snapshotting**: In `onMutate`, the current post data is fetched from the cache and returned as context to perform a rollback if the server update fails.
3. **`setQueryData`**: Write the new data directly to the post detail cache entry.
4. **`onSettled` / Selective Refetching**: Once the mutation settles, we invalidate the detail page query. We also loop through all list queries and trigger a refetch for only the specific lists containing this post (`exact: true`), conserving network resources.

```javascript
onSettled: () => {
  // Invalidate detail cache
  queryClient.invalidateQueries({
    queryKey: postOptions.detail(id).queryKey,
  });

  // Selectively refetch only lists containing this post
  const allQueries = queryClient.getQueriesData({
    queryKey: postOptions.lists().queryKey,
  });

  for (const [key, data] of allQueries) {
    const post = data?.posts?.find((p) => p.id === id);
    if (post) {
      queryClient.refetchQueries({
        exact: true,
        queryKey: key,
      });
    }
  }
}
```

---

## 8. Deleting Posts: Updating Cache Locally with setQueryData

When deleting a post, rather than invalidating every list query (which forces unnecessary network requests), we directly update the list cache using `queryClient.setQueryData`.

In `useDeletePost`:
```javascript
onSuccess: () => {
  // Completely remove the details cache of the deleted post
  queryClient.removeQueries({ queryKey: postOptions.detail(id).queryKey });

  // Update lists locally by filtering out the deleted post
  const allQueries = queryClient.getQueriesData({
    queryKey: postOptions.lists().queryKey,
  });

  for (const [key, data] of allQueries) {
    const post = data?.posts?.find((p) => p.id === id);
    if (post) {
      queryClient.setQueryData(key, (old) => ({
        ...old,
        posts: old.posts.filter((p) => p.id !== id),
      }));
    }
  }
}
```

---

## 9. List Cache vs. Detail Cache (Cache Consistency)

> [!WARNING]
> The list cache (`['posts', 'list', ...]`) and the detail cache (`['posts', 'detail', id]`) are **two independent cache entries** in the TanStack Query store.

Updating a list item via `setQueryData(postKeys.all, ...)` will:
- Update the list query cache.
- **Not** update the detailed cache entry for that post (`['posts', 'detail', '1']`), which will still hold the old post object.

**Solution:**
Ensure mutations update or remove both entries:
1. Detail cache: `postOptions.detail(id)` (using `removeQueries` or `setQueryData`).
2. List cache: Querying `getQueriesData` with `postOptions.lists()` prefix and selectively modifying or refetching each entry.

---

## 10. Mutation Handlers: mutate vs mutateAsync

The application showcases both methods of handling mutation results:

### Option A. `mutation.mutate` (Declarative Callback Flow)
Invokes the mutation and triggers handlers defined directly in `useMutation` (`onSuccess`, `onError`, `onSettled`). It is the standard approach since errors do not trigger unhandled exceptions in components.

### Option B. `mutation.mutateAsync` (Promise-based Flow)
Returns a Promise that resolves or rejects with the network call. This allows components to use standard `try...catch` blocks for chaining events or programmatically redirecting routes.

Used in [CreatePost.jsx](./src/components/CreatePost.jsx#L14-L26):
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  id++;

  try {
    // Await the request promise
    await mutation.mutateAsync({ body, id, title, userId });
    setTitle('');
    setBody('');
    notify('Post created successfully');
  } catch (error) {
    // Catch request errors and notify user
    notify(error.message);
  }
};
```

---

## 11. Declarative Loading with Suspense and Infinite Scrolling

The application leverages React's built-in **Suspense** boundaries for smooth data loading.

### React Suspense
In [PostsSuspense.jsx](./src/components/PostsSuspense.jsx), the infinite list component is wrapped inside a `<Suspense>` component:
```javascript
<Suspense fallback={<div>Loading...</div>}>
  <PostsListSuspense />
</Suspense>
```

### Infinite Scrolling
In [PostsListSuspense.jsx](./src/components/PostsListSuspense.jsx), `useSuspenseInfiniteGetPosts` executes the infinite list loading logic. We track visibility of the "Load More" button using `react-intersection-observer` to query the next page automatically:

```javascript
const { ref } = useInView({
  onChange: (inView) => {
    // If the element is visible, page exists, and no active request is running:
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  },
  rootMargin: '0px 0px 600px 0px', // Fetch next page 600px before reaching the bottom
  skip: isFetchingNextPage,
});
```

---

## 12. Dynamic Parallel Queries: useQueries

When loading multiple individual posts based on an array of IDs, utilizing `useQuery` in a loop violates the rules of React hooks.

Instead, the application uses `useQueries` with a `combine` function to bundle dynamic requests. Implemented as `useSomePosts` in `queries.js`:

```javascript
function useSomePosts(ids) {
  return useQueries({
    combine: (results) => {
      // Consolidate loading states and successful results
      return {
        isLoading: results.some((res) => res.isLoading),
        posts: results.filter((res) => res.isSuccess).map((res) => res.data),
      };
    },
    queries: ids.map((id) => {
      const options = postOptions.detail(id);
      return {
        ...options,
        queryFn: async (context) => {
          // Simulate simulated load delay based on ID
          await new Promise((r) => setTimeout(r, id * 1000));
          return options.queryFn(context);
        },
      };
    }),
  });
}
```
The **`combine`** function processes the query array results into a single `{ isLoading, posts }` object, making data rendering straightforward in [SomePosts.jsx](./src/components/SomePosts.jsx).
