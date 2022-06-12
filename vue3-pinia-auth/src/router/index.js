import { createWebHistory, createRouter } from 'vue-router';
import App from '../layouts/App.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Survey from '../views/Survey.vue';
import { useAuth } from '../store/auth';

const routes = [
  {
    path: '/',
    component: App,
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/survey', name: 'Survey', component: Survey },
    ],
    meta: {
      requireAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      authPage: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      authPage: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuth();
  if (to.meta.requireAuth) {
    if (auth.authenticated) {
      next();
    } else {
      next({
        name: 'Login',
      });
    }
  }

  if (to.meta.authPage) {
    if (!auth.authenticated) {
      next();
    } else {
      next(from);
    }
  }
});

export default router;
