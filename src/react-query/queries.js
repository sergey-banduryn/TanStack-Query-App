import {
  keepPreviousData,
  useQueries,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { postOptions } from './queryOptions';

function useGetComments(id) {
  return useQuery(postOptions.comments(id));
}

function useGetPost(id) {
  const queryClient = useQueryClient();

  return useQuery({
    ...postOptions.detail(id),
    placeholderData: () => {
      const allQueries = queryClient.getQueriesData({
        queryKey: postOptions.lists().queryKey,
      });

      // eslint-disable-next-line no-unused-vars
      for (const [key, data] of allQueries) {
        const post = data?.posts?.find((p) => p.id === id);

        if (post) {
          return post;
        }
      }

      return null;
    },
  });
}

function useGetPosts({ enabled = true, limit, page }) {
  return useQuery({
    ...postOptions.list({ limit, page }),
    enabled,
    placeholderData: keepPreviousData,
  });
}

function useSomePosts(ids) {
  return useQueries({
    combine: (results) => {
      return {
        isLoading: results.some((res) => res.isLoading),
        posts: results.filter((res) => res.isSuccess).map((res) => res.data),
      };
    },
    queries: ids.map((id) => {
      const options = postOptions.detail(id);

      // eslint-disable-next-line @tanstack/query/prefer-query-options
      return {
        ...options,
        queryFn: async (context) => {
          await new Promise((r) => setTimeout(r, id * 1000));

          return options.queryFn(context);
        },
      };
    }),
  });
}

function useSuspenseGetPosts({ limit, page }) {
  return useSuspenseQuery(postOptions.list({ limit, page }));
}

export {
  useGetComments,
  useGetPost,
  useGetPosts,
  useSomePosts,
  useSuspenseGetPosts,
};
