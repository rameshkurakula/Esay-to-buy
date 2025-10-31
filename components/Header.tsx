import React from 'react';
import { UserView } from '../types';
import { ShoppingCartIcon, UserIcon, ArrowPathIcon } from './icons/Icons';

interface HeaderProps {
  cartCount: number;
  currentView: UserView;
  onToggleView: () => void;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, currentView, onToggleView, onCartClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">FoodHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleView}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
            >
              <ArrowPathIcon className="w-5 h-5 mr-2" />
              <span>{currentView === UserView.BUYER ? 'Switch to Selling' : 'Switch to Buying'}</span>
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-primary text-white text-xs rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
