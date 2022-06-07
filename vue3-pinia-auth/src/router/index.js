import { createWebHistory, createRouter } from 'vue-router';
import App from '../layouts/App.vue';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Survey from '../views/Survey.vue';

const routes = [
  {
    path: '/',
    component: App,
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/survey', name: 'Survey', component: Survey },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
