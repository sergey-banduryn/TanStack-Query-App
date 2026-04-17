const postKeys = {
  all: ['posts'],
  comments: (postId) => [...postKeys.detail(postId), 'comments'],
  detail: (postId) => [...postKeys.details(), postId],
  details: () => [...postKeys.all, 'detail'],
};

export { postKeys };
