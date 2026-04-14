import { useQueryClient } from '@tanstack/react-query';
import { postKeys } from './queryKeys';

function useResetAllPosts() {
  const queryClient = useQueryClient();
  return () => queryClient.resetQueries(postKeys.all);
}

export { useResetAllPosts };
