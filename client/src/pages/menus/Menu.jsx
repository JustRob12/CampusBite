import axios from 'axios';
import React, { useEffect, useState } from 'react';
const APIURL = import.meta.env.VITE_API_URL;

const Menu = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: 'Meal',
    });

    // Fetch food items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`${APIURL}/auth/items`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFoodItems(response.data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load menu items');
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    // Handle delete item
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${APIURL}/auth/items/${id}`);
            setFoodItems(foodItems.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    // Handle edit item
    const handleEdit = (item) => {
        setEditingItem(item._id);
        setFormData({ ...item });
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${APIURL}/auth/items/${editingItem}`, formData);
            setFoodItems(
                foodItems.map((item) =>
                    item._id === editingItem ? { ...item, ...formData } : item
                )
            );
            setEditingItem(null);
            setFormData({ name: '', description: '', price: '', quantity: '', category: 'Meal' });
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Menu</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foodItems.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="mt-2 text-lg font-bold">₱{item.price}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <span className="text-sm text-blue-500">{item.category}</span>
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {editingItem && (
                <div className="mt-6">
                    <h2 className="text-2xl font-bold">Edit Item</h2>
                    <div className="flex flex-col space-y-2 mt-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            placeholder="Name"
                            className="border p-2 rounded"
                        />
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                            placeholder="Description"
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleFormChange}
                            placeholder="Price"
                            className="border p-2 rounded"
                        />
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleFormChange}
                            placeholder="Quantity"
                            className="border p-2 rounded"
                        />
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleFormChange}
                            className="border p-2 rounded"
                        >
                            <option value="Meal">Meal</option>
                            <option value="Snack">Snack</option>
                            <option value="Drink">Drink</option>
                        </select>
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Update Item
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
