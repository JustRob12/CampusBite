// components/OrderHistory.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const APIURL = import.meta.env.VITE_API_URL;

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderHistory = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`${APIURL}/auth/order-history`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setOrderHistory(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load order history');
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold">Order History</h2>
            {orderHistory.length === 0 ? (
                <p>No order history found</p>
            ) : (
                <ul className="mt-4">
                    {orderHistory.map((order) => (
                        <li
                            key={order._id}
                            className="border-b border-gray-300 p-2 flex justify-between items-center"
                        >
                            <span>
                                {order.message} -{' '}
                                {new Date(order.createdAt).toLocaleString()}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderHistory;
