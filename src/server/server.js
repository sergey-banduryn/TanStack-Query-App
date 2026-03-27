import { createServer, Model, RestSerializer } from 'miragejs';

const initialPosts = await fetch(
  'https://jsonplaceholder.typicode.com/posts?_limit=10',
)
  .then((r) => {
    if (!r.ok) {
      throw Error();
    }
    return r.json();
  })
  .catch(() => []);

console.log('initialPosts', initialPosts);

function makeServer() {
  return createServer({
    serializers: {
      application: RestSerializer,
    },
    models: {
      post: Model,
    },
    routes() {
      this.namespace = 'api';
      this.timing = 1000;
      this.resource('posts');
      this.passthrough('https://jsonplaceholder.typicode.com/**');
    },
    fixtures: {
      posts: initialPosts,
    },
  });
}

export { makeServer };
