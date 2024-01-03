import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

/* Views */
import App from './App';
import HomeView from '@/sections/Home/Home.view';
import ProductView from '@/sections/Product/Product.view';
import CartView from './sections/Cart/Cart.view';

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeView />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/cart" element={<CartView />} />
    </Route>,
  ])
);
