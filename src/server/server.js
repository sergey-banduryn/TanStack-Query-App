import { createServer, Model, RestSerializer } from 'miragejs';

const initialPosts = await fetch('https://jsonplaceholder.typicode.com/posts')
  .then((r) => {
    if (!r.ok) {
      throw Error();
    }

    return r.json();
  })
  .catch(() => []);

function makeServer() {
  return createServer({
    fixtures: {
      posts: initialPosts,
    },
    models: {
      post: Model,
    },
    routes() {
      this.namespace = 'api';
      this.timing = 1000;
      this.resource('posts');
      this.passthrough('https://jsonplaceholder.typicode.com/**');

      this.get('/posts', (schema, request) => {
        const limit = parseInt(request.queryParams.limit) || 10;
        const page = parseInt(request.queryParams.page) || 1;

        const allPosts = schema.posts.all().models;

        const totalCount = allPosts.length;
        const end = totalCount - (page - 1) * limit;
        const start = Math.max(0, end - limit);

        const pagedPosts = allPosts.slice(start, end).reverse();

        return {
          meta: {
            limit,
            page,
            totalCount: allPosts.length,
            totalPages: Math.ceil(allPosts.length / limit),
          },
          posts: pagedPosts,
        };
      });
    },
    serializers: {
      application: RestSerializer,
    },
  });
}

export { makeServer };
