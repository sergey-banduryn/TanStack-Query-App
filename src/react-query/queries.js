import {
  useQueries,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { postKeys } from './queryKeys';
import { getComments, getPost, getPosts } from '../api';

function useGetComments(id) {
  return useQuery({
    queryFn: () => getComments(id),
    queryKey: postKeys.comments(id),
  });
}

function useGetPost(id) {
  const queryClient = useQueryClient();

  return useQuery({
    placeholderData: () => {
      const posts = queryClient.getQueryData(postKeys.all);
      const post = posts?.find((post) => post.id === id);

      return post;
    },
    queryFn: () => getPost(id),
    queryKey: postKeys.detail(id),
  });
}

function useGetPosts(enabled = true) {
  return useQuery({
    enabled: enabled,
    queryFn: getPosts,
    queryKey: postKeys.all,
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
    queries: ids.map((id) => ({
      queryFn: async () => {
        await new Promise((r) => setTimeout(r, id * 1000));

        return getPost(id);
      },
      queryKey: postKeys.detail(id),
    })),
  });
}

function useSuspenseGetPosts() {
  return useSuspenseQuery({
    queryFn: getPosts,
    queryKey: postKeys.all,
  });
}

export {
  useGetComments,
  useGetPost,
  useGetPosts,
  useSomePosts,
  useSuspenseGetPosts,
};
