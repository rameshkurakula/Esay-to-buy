import React from 'react';
import { Product } from '../types';
import { SparklesIcon, ShoppingCartIcon } from './icons/Icons';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onFindSimilar: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onFindSimilar }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <img className="w-full h-48 object-cover" src={product.imageUrl} alt={product.name} />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-dark">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1 flex-grow">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
        </div>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200 grid grid-cols-2 gap-2">
         <button
          onClick={() => onFindSimilar(product)}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          Similar
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
