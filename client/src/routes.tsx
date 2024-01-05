import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

/* Public Vies */
import App from './App';
import HomeView from '@/sections/Home/Home.view';
import ProductView from '@/sections/Product/Product.view';
import CartView from './sections/Cart/Cart.view';
import LoginView from './sections/Auth/Login/Login.view';
import RegisterView from './sections/Auth/Register/Register.view';

/* Private Views */
import PrivateRoute from './components/PrivateRoute.component';
import ShippingView from './sections/Shipping/Shipping.view';
import PaymentView from './sections/Payment/Payment.view';
import PlaceOrderView from './sections/Order/PlaceOrder.view';
import OrderView from './sections/Order/Order.view';
import ProfileView from './sections/Profile/Profile.view';

/* Admin Views */
import AdminRoute from './components/AdminRoute.component';
import OrderListView from './sections/Admin/OrderList.view';
import ProductListView from './sections/Admin/ProductList.view';
import ProductEditView from './sections/Admin/ProductEdit.view';
import UserListView from './sections/Admin/UserList.view';
import UserEditView from './sections/Admin/UserEdit.view';

export const router = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeView />} />
      <Route path="/search/:keyword" element={<HomeView />} />
      <Route path="/page/:page" element={<HomeView />} />
      <Route path="/search/:keyword/page/:page" element={<HomeView />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/cart" element={<CartView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />

      {/* Logged in users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingView />} />
        <Route path="/payment" element={<PaymentView />} />
        <Route path="/place-order" element={<PlaceOrderView />} />
        <Route path="/order/:id" element={<OrderView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Route>

      {/* Admin users */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orders" element={<OrderListView />} />
        <Route path="/admin/products" element={<ProductListView />} />
        <Route path="/admin/products/page/:page" element={<ProductListView />} />
        <Route path="/admin/products/:id/edit" element={<ProductEditView />} />
        <Route path="/admin/users" element={<UserListView />} />
        <Route path="/admin/users/:id/edit" element={<UserEditView />} />
      </Route>
    </Route>,
  ])
);
