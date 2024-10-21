// components/Notification.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
const APIURL = import.meta.env.VITE_API_URL;

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`${APIURL}/auth/notifications`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setNotifications(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load notifications');
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const handleDeleteNotification = async (notificationId) => {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`${APIURL}/auth/notifications/${notificationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove the deleted notification from the state
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notif) => notif._id !== notificationId)
            );
            alert('Notification deleted successfully!');
        } catch (error) {
            console.error('Error deleting notification:', error);
            alert('Failed to delete notification');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="mt-6">
            <h2 className="text-2xl font-bold">Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications found</p>
            ) : (
                <ul className="mt-4">
                    {notifications.map((notification) => (
                        <li
                            key={notification._id}
                            className="border-b border-gray-300 p-2 flex justify-between items-center"
                        >
                            <span>
                                {notification.message} -{' '}
                                {new Date(notification.createdAt).toLocaleString()}
                            </span>
                            <button
                                onClick={() => handleDeleteNotification(notification._id)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Order Received
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Notification;
