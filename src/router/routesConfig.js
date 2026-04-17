import Home from '../components/Home';
import Post from '../components/Post';
import PostsSuspense from '../components/PostsSuspense';
import SomePosts from '../components/SomePosts';

const routesConfig = [
  {
    component: Home,
    index: true,
    redirectTo: '/Posts',
  },
  {
    component: Home,
    name: 'Posts',
    path: '/Posts',
  },
  {
    component: Post,
    path: '/Posts/:id',
  },
  {
    component: PostsSuspense,
    name: 'PostsSuspense',
    path: '/PostsSuspense',
  },
  {
    component: SomePosts,
    name: 'SomePosts',
    path: '/SomePosts',
  },
  {
    path: '*',
    redirectTo: '/',
  },
];

export { routesConfig };
