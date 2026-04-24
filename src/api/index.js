async function createPost(post) {
  const response = await fetch('/api/posts', {
    body: JSON.stringify({ post }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json().then(({ post }) => post);
}

async function deletePost(id) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
}

async function getComments(id) {
  await new Promise((r) => setTimeout(r, 1000));

  return fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
  ).then((r) => r.json());
}

function getPost(id) {
  return fetch(`/api/posts/${id}`)
    .then((r) => r.json())
    .then(({ post }) => post ?? null);
}

function getPosts({ limit = 10, page = 1 }) {
  return fetch(`/api/posts?limit=${limit}&page=${page}`)
    .then((r) => r.json())
    .then((data) => data);
}

async function updatePost(post) {
  const response = await fetch(`/api/posts/${post.id}`, {
    body: JSON.stringify({ post }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json().then(({ post }) => post);
}

export { createPost, deletePost, getComments, getPost, getPosts, updatePost };
