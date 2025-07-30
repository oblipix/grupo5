import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaTag } from 'react-icons/fa';

const TopNavigation = () => {
    return (
        <nav className="bg-white shadow-lg border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                            TTripz
                        </Link>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <div className="flex space-x-6">
                        <Link 
                            to="/hoteis" 
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                            <FaBuilding className="text-lg" />
                            <span className="font-medium">Hotéis</span>
                        </Link>
                        
                        <Link 
                            to="/promocoes" 
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                            <FaTag className="text-lg" />
                            <span className="font-medium">Promoções</span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TopNavigation;
