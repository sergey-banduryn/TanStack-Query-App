import { queryOptions } from '@tanstack/react-query';
import { getComments, getPost, getPosts } from '../api';

const postKeys = {
  all: ['posts'],
  comments: (postId) => [...postKeys.detail(postId), 'comments'],
  detail: (postId) => [...postKeys.details(), postId],
  details: () => [...postKeys.all, 'detail'],
  list: (params) => [...postKeys.lists(), params],
  lists: () => [...postKeys.all, 'list'],
};

const postOptions = {
  all: () =>
    queryOptions({
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
  list: (params) =>
    queryOptions({
      queryFn: () => getPosts(params),
      queryKey: postKeys.list(params),
    }),
  lists: () =>
    queryOptions({
      queryKey: postKeys.lists(),
    }),
};

export { postOptions };
