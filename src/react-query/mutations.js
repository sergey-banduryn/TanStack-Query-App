import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, deletePost, updatePost } from '../api';
import { postOptions } from './queryOptions';

function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postOptions.all().queryKey });
    },
  });
}

function useDeletePost(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: postOptions.detail(id).queryKey });
      queryClient.setQueryData(postOptions.all().queryKey, (oldData) => {
        if (!oldData) {
          return [];
        }

        return oldData.filter((p) => p.id !== id);
      });
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
      queryClient.refetchQueries({ queryKey: postOptions.all().queryKey });
    },
  });
}

export { useCreatePost, useDeletePost, useUpdatePost };
