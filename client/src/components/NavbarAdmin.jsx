import { Link } from 'react-router-dom';

const AdminNavbar = () => (
    <nav className="bg-gray-800 p-4 text-white">
        <ul className="flex space-x-4">
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/add-item">Add Item</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/menu">Foods</Link></li>
            <li><Link to="/signup-admin">Add Admin</Link></li>
        </ul>
    </nav>
);

export default AdminNavbar;
