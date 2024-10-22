// NotificationProvider.jsx
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const NotificationContext = createContext();

// Custom hook to access notification context
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);

    const fetchNotifications = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications(response.data);
            setNotificationCount(response.data.filter((notif) => !notif.read).length);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <NotificationContext.Provider value={{ notificationCount, fetchNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
