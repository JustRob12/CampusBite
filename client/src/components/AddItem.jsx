import axios from 'axios';
import React, { useState } from 'react';
const APIURL = import.meta.env.VITE_API_URL;

const AddItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: 'Meal',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate numeric fields
        if (isNaN(formData.price) || isNaN(formData.quantity)) {
            setError('Price and Quantity must be numbers.');
            return;
        }

        try {
            const response = await axios.post(`${APIURL}/auth/items/add`, formData);
            if (response.status === 201) {
                alert('Item added successfully!');
                setFormData({ name: '', description: '', price: '', quantity: '', category: 'Meal' });
            }
        } catch (error) {
            setError('Error adding item: ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Add Item</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow-md">
                <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-1">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block mb-1">Price (in PESO)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="quantity" className="block mb-1">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        className="border rounded p-2 w-full"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block mb-1">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                    >
                        <option value="Meal">Meal</option>
                        <option value="Snack">Snack</option>
                        <option value="Drink">Drink</option>
                    </select>
                </div>

                {error && <div className="text-red-500">{error}</div>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default AddItem;
