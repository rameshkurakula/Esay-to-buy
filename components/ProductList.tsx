import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onFindSimilar: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onFindSimilar }) => {
  return (
    <section>
        <h2 className="text-3xl font-bold text-dark mb-8 border-b-2 border-primary pb-2">Our Products</h2>
        {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onAddToCart={onAddToCart}
                        onFindSimilar={onFindSimilar}
                    />
                ))}
            </div>
        ) : (
            <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
            </div>
        )}
    </section>
  );
};

export default ProductList;