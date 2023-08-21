import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../components/auth/AuthPage.vue'
import Home from '../components/home/HomePage.vue'
import POS from '../components/POS/POSPage.vue'
import Product from '../components/products/ProductPage.vue'

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, // Add this meta field to protect the home page
  },
  {
    path: '/POS',
    name: 'Point of Sale',
    component: POS,
  },
  {
    path: '/products',
    name: 'Products',
    component: Product,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
