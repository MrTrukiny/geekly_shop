import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

/* Views */
import App from './App';
import HomeView from '@/sections/Home/Home.view';
import ProductView from '@/sections/Product/Product.view';
import CartView from './sections/Cart/Cart.view';
import LoginView from './sections/Login/Login.view';
import RegisterView from './sections/Register/Register.view';

import PrivateRoute from './components/PrivateRoute.component';
import ShippingView from './sections/Shipping/Shipping.view';
import PaymentView from './sections/Payment/Payment.view';
import PlaceOrderView from './sections/Order/PlaceOrder.view';

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeView />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/cart" element={<CartView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />

      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingView />} />
        <Route path="/payment" element={<PaymentView />} />
        <Route path="/place-order" element={<PlaceOrderView />} />
      </Route>
    </Route>,
  ])
);
