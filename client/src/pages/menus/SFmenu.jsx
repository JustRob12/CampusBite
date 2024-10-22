// SFMenu.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useCart } from "../../components/CartProvider"; // Import the useCart hook

const APIURL = import.meta.env.VITE_API_URL;

const SFMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const { addToCart } = useCart(); // Use addToCart from the provider

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${APIURL}/auth/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFoodItems(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load menu items");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems =
    filter === "All"
      ? foodItems
      : foodItems.filter((item) => item.category === filter);
      const handleAddToCart = (itemId) => {
        addToCart(itemId); // Add the item to the cart
      
        // Show SweetAlert animation
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart!',
          text: 'Your food has been added to the cart.',
          showConfirmButton: false,
          timer: 1500,
          position: 'center', // Center the SweetAlert
          toast: false, // Set to false for centering
          customClass: {
            popup: 'swal-popup', // Optional: custom class for styling
          }
        });
      };
      
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>

      <div className="mb-4">
        {["Meal", "Snack", "Drink", "All"].map((category) => (
          <button
            key={category}
            className={`mr-2 px-4 py-2 rounded ${
              filter === category ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="mt-2 text-lg font-bold">₱{item.price}</p>
            <span className="text-sm text-blue-500">{item.category}</span>
            <div className="flex justify-end mt-4">
              {/* Flex container to align button to the right */}
              <button
                onClick={() => handleAddToCart(item._id)} // Call the new handler
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SFMenu;
