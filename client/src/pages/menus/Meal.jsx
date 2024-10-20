// Meal.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";

const Meal = ({ refresh }) => {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState("");

    const fetchMeals = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/items/Meal");
            setMeals(response.data); // Set meals from the response
        } catch (err) {
            console.error("Error fetching meals:", err);
            setError("Error fetching meals. Please try again.");
        }
    };

    // Fetch meals whenever 'refresh' changes
    useEffect(() => {
        fetchMeals();
    }, [refresh]);

    return (
        <div className="text-center mt-8">
            <h1 className="text-4xl font-bold text-[#003366]">Meal Page</h1>
            <p className="mt-4 text-lg">Explore our delicious meals!</p>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meals.map((meal) => (
                    <div key={meal._id} className="border p-4 rounded shadow-md">
                        <h2 className="text-2xl font-semibold">{meal.name}</h2>
                        <p className="mt-2">{meal.description}</p>
                        <p className="mt-2 font-bold">₱{meal.price}</p>
                        <p className="mt-1 text-gray-600">Available: {meal.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Meal;
