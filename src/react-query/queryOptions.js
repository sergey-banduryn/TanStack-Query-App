import { queryOptions } from '@tanstack/react-query';
import { getComments, getPost, getPosts } from '../api';

const postKeys = {
  all: ['posts'],
  comments: (postId) => [...postKeys.detail(postId), 'comments'],
  detail: (postId) => [...postKeys.details(), postId],
  details: () => [...postKeys.all, 'detail'],
};

const postOptions = {
  all: () =>
    queryOptions({
      queryFn: getPosts,
      queryKey: postKeys.all,
    }),
  comments: (id) =>
    queryOptions({
      queryFn: () => getComments(id),
      queryKey: postKeys.comments(id),
    }),
  detail: (id) =>
    queryOptions({
      queryFn: () => getPost(id),
      queryKey: postKeys.detail(id),
    }),
};

export { postOptions };
