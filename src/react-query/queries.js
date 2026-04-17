import {
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
      const posts = queryClient.getQueryData(postOptions.all().queryKey);
      const post = posts?.find((post) => post.id === id);

      return post;
    },
  });
}

function useGetPosts(enabled = true) {
  return useQuery({
    ...postOptions.all(),
    enabled: enabled,
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

function useSuspenseGetPosts() {
  return useSuspenseQuery(postOptions.all());
}

export {
  useGetComments,
  useGetPost,
  useGetPosts,
  useSomePosts,
  useSuspenseGetPosts,
};
