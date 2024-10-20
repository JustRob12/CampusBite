import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-500 text-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-semibold">Total Students</h2>
                    <p className="text-2xl mt-2">150</p> {/* Replace with dynamic data */}
                </div>

                <div className="bg-green-500 text-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-semibold">Total Faculty</h2>
                    <p className="text-2xl mt-2">30</p> {/* Replace with dynamic data */}
                </div>

                <div className="bg-yellow-500 text-white p-6 rounded shadow-md">
                    <h2 className="text-xl font-semibold">Total Food Items</h2>
                    <p className="text-2xl mt-2">20</p> {/* Replace with dynamic data */}
                </div>
            </div>

           
        </div>
    );
};

export default AdminDashboard;
