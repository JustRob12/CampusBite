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



const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />



                <Route element={<LayoutAdmin/>}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/signup-admin" element={<SignupAdmin />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/orders" element={<ViewOrders />} />
                </Route>
                

                
                {/* Wrap admin and user dashboards inside Layout */}
                <Route element={<Layout />}>
                    
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/sfmenu" element={<SFMenu />} />
                  
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/notifications" element={<Notification/>} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
