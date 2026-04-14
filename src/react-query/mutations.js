import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, deletePost, updatePost } from '../api';
import { postKeys } from './queryKeys';

function useUpdatePost(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(id) });
      const previousPost = queryClient.getQueryData(postKeys.detail(id));
      queryClient.setQueryData(postKeys.detail(id), (old) => ({
        ...old,
        ...newPost,
      }));
      return { previousPost };
    },
    onError: (err, newPost, onMutateResult) => {
      queryClient.setQueryData(
        postKeys.detail(id),
        onMutateResult.previousPost,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(id) });
      queryClient.refetchQueries({ queryKey: postKeys.all });
    },
  });
}

function useDeletePost(id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: postKeys.detail(id) });
      queryClient.setQueryData(postKeys.all, (oldData) => {
        if (!oldData) return [];
        return oldData.filter((p) => p.id !== id);
      });
    },
  });
}

function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}

export { useUpdatePost, useDeletePost, useCreatePost };
