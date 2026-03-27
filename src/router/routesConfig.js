import Home from '../components/Home';
import Post from '../components/Post';
import Posts from '../components/Posts';
import PostsSuspense from '../components/PostsSuspense';
import SomePosts from '../components/SomePosts';

export const routesConfig = [
  {
    index: true,
    component: Home,
  },
  {
    path: '/Posts',
    name: 'Posts',
    component: Home,
  },
  {
    path: '/Posts/:id',
    component: Post,
  },
  {
    path: '/PostsSuspense',
    name: 'PostsSuspense',
    component: PostsSuspense,
  },
  {
    path: '/SomePosts',
    name: 'SomePosts',
    component: SomePosts,
  },
  {
    path: '*',
    redirectTo: '/',
  },
];
