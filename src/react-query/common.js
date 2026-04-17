import { useQueryClient } from '@tanstack/react-query';
import { postOptions } from './queryOptions';

function useResetAllPosts() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.resetQueries({ queryKey: postOptions.all().queryKey });
}

export { useResetAllPosts };
