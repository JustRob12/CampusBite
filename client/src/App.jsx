// App.jsx
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddItem from './components/AddItem';
import Layout from './components/Layout';
import LayoutAdmin from './components/LayoutAdmin';
import Login from './components/Login';
import Signup from './components/Signup';
import SignupAdmin from './components/SignupAdmin';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Menu from './pages/menus/Menu';
import SFMenu from './pages/menus/SFmenu';
import Notification from './pages/Notification';
import ViewOrders from './pages/ViewOrders';

// Import providers
import CartProvider from '../src/components/CartProvider';
import { NotificationProvider } from '../src/components/NotificationsProvider'; // Import NotificationProvider
import OrderHistory from './pages/OrderHistory';

const App = () => {
    return (
        <NotificationProvider> {/* Wrap everything inside NotificationProvider */}
            <CartProvider>  {/* Wrap everything inside CartProvider */}
                <Router>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* Admin Routes wrapped inside LayoutAdmin */}
                        <Route element={<LayoutAdmin />}>
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/add-item" element={<AddItem />} />
                            <Route path="/signup-admin" element={<SignupAdmin />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/orders" element={<ViewOrders />} />
                        </Route>

                        {/* User Routes wrapped inside Layout */}
                        <Route element={<Layout />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                             <Route path="/order-history" element={<OrderHistory />} />
                            <Route path="/sfmenu" element={<SFMenu />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/notifications" element={<Notification />} />
                        </Route>
                    </Routes>
                </Router>
            </CartProvider>
        </NotificationProvider>
    );
};

export default App;
