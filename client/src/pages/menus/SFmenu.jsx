import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SFMenu = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('All'); // State for filter

    // Fetch food items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            const token = localStorage.getItem('token'); // Retrieve JWT token

            try {
                const response = await axios.get('http://localhost:5000/api/auth/items', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token to the request
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

    // Filter food items based on selected category
    const filteredItems = filter === 'All' ? foodItems : foodItems.filter(item => item.category === filter);

    // Function to handle adding items to the cart
    const addToCart = async (foodItemId) => {
        const token = localStorage.getItem('token'); // Retrieve JWT token

        try {
            await axios.post('http://localhost:5000/api/auth/cart/add', { foodItemId, quantity: 1 }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token to the request
                },
            });
            alert('Item added to cart successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to add item to cart');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Menu</h1>

            {/* Filter Buttons */}
            <div className="mb-4">
                <button
                    className={`mr-2 px-4 py-2 rounded ${filter === 'Meal' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('Meal')}
                >
                    Meal
                </button>
                <button
                    className={`mr-2 px-4 py-2 rounded ${filter === 'Snack' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('Snack')}
                >
                    Snack
                </button>
                <button
                    className={`mr-2 px-4 py-2 rounded ${filter === 'Drink' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('Drink')}
                >
                    Drink
                </button>
                <button
                    className={`mr-2 px-4 py-2 rounded ${filter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setFilter('All')}
                >
                    All
                </button>
            </div>

            {/* Food Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <div key={item._id} className="border rounded-lg p-4 shadow-lg">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="mt-2 text-lg font-bold">₱{item.price}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <span className="text-sm text-blue-500">{item.category}</span>
                        <button
                            onClick={() => addToCart(item._id)}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SFMenu;
