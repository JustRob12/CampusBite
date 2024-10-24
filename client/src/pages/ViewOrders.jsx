import axios from "axios";
import React, { useEffect, useState } from "react";
const APIURL = import.meta.env.VITE_API_URL;

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token"); // Retrieve JWT token

      try {
        const response = await axios.get(`${APIURL}/auth/orders`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
        });
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleNotifyAndDelete = async (orderId, userId, orderDetails) => {
    const token = localStorage.getItem("token"); // Retrieve JWT token

    try {
      // Construct the items list and total price message
      const itemsList = orderDetails.items
        .map((item) => {
          const itemName = item.foodItemId
            ? item.foodItemId.name
            : "Unknown Item";
          const itemPrice = item.foodItemId ? item.foodItemId.price : 0;
          const itemQuantity = item.quantity;
          return `${itemName} - ₱${itemPrice} x ${itemQuantity}`;
        })
        .join(", ");

      const totalPrice = orderDetails.totalPrice.toFixed(2);

      const message = `Your order ${orderId} is ready! Items: ${itemsList}. Total Price: ₱${totalPrice}.`;

      // Send notification with total price
      await axios.post(
        `${APIURL}/auth/notify`,
        { orderId, userId, message, itemsList, totalPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
        }
      );

      // Delete the order from the database
      await axios.delete(`${APIURL}/auth/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the request
        },
      });

      // Update the UI by removing the deleted order
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderId !== orderId)
      );

      alert("Notification sent and order deleted!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send notification or delete order");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="min-w-full mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Order ID</th>
              <th className="border border-gray-300 p-2">User Name</th>
              <th className="border border-gray-300 p-2">Items</th>
              <th className="border border-gray-300 p-2">Total Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td className="border border-gray-300 p-2">{order.orderId}</td>
                <td className="border border-gray-300 p-2">
                  {order.userId ? order.userId.name : "Unknown User"}
                </td>
                <td className="border border-gray-300 p-2">
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.foodItemId
                          ? item.foodItemId.name
                          : "Unknown Item"}{" "}
                        - ₱{item.foodItemId ? item.foodItemId.price : 0} x{" "}
                        {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border border-gray-300 p-2">
                  ₱{order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() =>
                      handleNotifyAndDelete(
                        order.orderId,
                        order.userId._id,
                        order
                      )
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Order is Ready
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewOrders;
