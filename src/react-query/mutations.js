import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, deletePost, updatePost } from '../api';
import { postOptions } from './queryOptions';

function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postOptions.lists().queryKey });
    },
  });
}

function useDeletePost(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: postOptions.detail(id).queryKey });

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
    },
  });
}

function useUpdatePost(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: postOptions.detail(id).queryKey,
      });
      const previousPost = queryClient.getQueryData(
        postOptions.detail(id).queryKey,
      );
      queryClient.setQueryData(postOptions.detail(id).queryKey, (old) => ({
        ...old,
        ...newPost,
      }));

      return { previousPost };
    },
    // eslint-disable-next-line perfectionist/sort-objects
    onError: (err, newPost, onMutateResult) => {
      queryClient.setQueryData(
        postOptions.detail(id).queryKey,
        onMutateResult.previousPost,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: postOptions.detail(id).queryKey,
      });

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
    },
  });
}

export { useCreatePost, useDeletePost, useUpdatePost };
