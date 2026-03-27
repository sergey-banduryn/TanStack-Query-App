function getPosts() {
  return fetch('/api/posts')
    .then((r) => r.json())
    .then(({ posts }) => posts);
}

function getPost(id) {
  return fetch(`/api/posts/${id}`)
    .then((r) => r.json())
    .then(({ post }) => post ?? null);
}

async function createPost(post) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ post }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json().then(({ post }) => post);
}

async function getComments(id) {
  await new Promise((r) => setTimeout(r, 1000));
  return fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
  ).then((r) => r.json());
}

export { getPosts, createPost, getPost, getComments };
