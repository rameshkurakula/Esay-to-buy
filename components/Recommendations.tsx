import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface RecommendationsProps {
  recommendations: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({ recommendations, isLoading, onAddToCart }) => {
  if (!isLoading && recommendations.length === 0) {
    return null;
  }

  return (
    <section id="recommendations-section" className="mb-12 bg-amber-50 rounded-lg p-6">
      <h2 className="text-3xl font-bold text-dark mb-6">Recommended For You</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                    <div className="w-full h-48 bg-gray-300"></div>
                    <div className="p-4">
                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="mt-4 h-10 bg-gray-300 rounded w-full"></div>
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map(product => (
            <ProductCard 
                key={`rec-${product.id}`} 
                product={product} 
                onAddToCart={onAddToCart}
                onFindSimilar={() => { /* No-op for recommendations */}}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Recommendations;
