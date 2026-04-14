import {
  useQueries,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { postKeys } from './queryKeys';
import { getComments, getPost, getPosts } from '../api';

function useGetPost(id) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => getPost(id),
    placeholderData: () => {
      const posts = queryClient.getQueryData(postKeys.all);
      const post = posts?.find((post) => post.id === id);
      return post;
    },
  });
}

function useSomePosts(ids) {
  return useQueries({
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
}

function useSuspenseGetPosts() {
  return useSuspenseQuery({
    queryKey: postKeys.all,
    queryFn: getPosts,
  });
}

function useGetPosts(enabled = true) {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: getPosts,
    enabled: enabled,
  });
}

function useGetComments(id) {
  return useQuery({
    queryKey: postKeys.comments(id),
    queryFn: () => getComments(id),
  });
}

export {
  useGetPost,
  useSomePosts,
  useSuspenseGetPosts,
  useGetPosts,
  useGetComments,
};
