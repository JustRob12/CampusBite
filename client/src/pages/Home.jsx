import { motion } from 'framer-motion'; // For animations
import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen bg-gradient-to-r from-[#003366] to-[#005580] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-center p-10 bg-white rounded-2xl shadow-xl max-w-lg"
            >
                <motion.h1
                    className="text-5xl font-extrabold text-[#003366] mb-6"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Welcome to Campus Bite
                </motion.h1>
                
                <motion.p
                    className="text-lg text-gray-600 mb-10"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    Please log in or sign up to continue.
                </motion.p>

                <div className="flex space-x-6 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/login')}
                        className="px-8 py-3 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#002244] transition duration-300"
                    >
                        Log In
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/signup')}
                        className="px-8 py-3 bg-gray-100 text-[#003366] font-semibold rounded-lg hover:bg-gray-200 transition duration-300"
                    >
                        Sign Up
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
