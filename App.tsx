import React, { useState, useCallback, useMemo } from 'react';
import { Product, CartItem, UserView, AppState, Filters, UserLocation } from './types';
import { INITIAL_PRODUCTS } from './constants';
import { identifyFood, getRecommendations } from './services/geminiService';
import { calculateDistance } from './utils/location';
import Header from './components/Header';
import ProductList from './components/ProductList';
import SellerForm from './components/SellerForm';
import Cart from './components/Cart';
import Chatbot from './components/Chatbot';
import Recommendations from './components/Recommendations';
import FilterPanel from './components/FilterPanel';

const App: React.FC = () => {
  const maxPrice = useMemo(() => Math.ceil(Math.max(...INITIAL_PRODUCTS.map(p => p.price))), []);
  const initialFilters: Filters = {
    dietary: [],
    maxPrice: maxPrice,
    minRating: 0,
    maxDistance: 50, // Default to 50km
  };

  const [appState, setAppState] = useState<AppState>({
    products: INITIAL_PRODUCTS,
    cart: [],
    recommendations: [],
    view: UserView.BUYER,
    isCartOpen: false,
    isLoadingRecommendations: false,
    filters: initialFilters,
    userLocation: null,
  });

  const addToCart = useCallback((product: Product) => {
    setAppState(prev => {
      const existingItem = prev.cart.find(item => item.product.id === product.id);
      if (existingItem) {
        return {
          ...prev,
          cart: prev.cart.map(item =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...prev, cart: [...prev.cart, { product, quantity: 1 }] };
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setAppState(prev => ({
        ...prev,
        cart: prev.cart.filter(item => item.product.id !== productId)
    }));
  }, []);

  const clearCart = useCallback(() => {
    setAppState(prev => ({ ...prev, cart: [] }));
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    setAppState(prev => {
        const newProduct: Product = { 
          ...product, 
          id: Date.now(),
          // Mocking new product data for filterability
          dietaryTags: [],
          sellerRating: 0,
          location: { latitude: 34.0522, longitude: -118.2437 }
        };
        return {
            ...prev,
            products: [newProduct, ...prev.products],
            view: UserView.BUYER
        };
    });
  }, []);

  const toggleView = useCallback(() => {
    setAppState(prev => ({
        ...prev,
        view: prev.view === UserView.BUYER ? UserView.SELLER : UserView.BUYER,
        recommendations: [],
    }));
  }, []);

  const toggleCart = useCallback(() => {
    setAppState(prev => ({...prev, isCartOpen: !prev.isCartOpen }));
  }, []);

  const handleFetchRecommendations = useCallback(async (product: Product) => {
    setAppState(prev => ({ ...prev, isLoadingRecommendations: true, recommendations: [] }));
    try {
        const recs = await getRecommendations(product.name, product.description);
        setAppState(prev => ({ ...prev, recommendations: recs, isLoadingRecommendations: false }));
        document.getElementById('recommendations-section')?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        alert("Sorry, we couldn't fetch recommendations at this time.");
        setAppState(prev => ({ ...prev, isLoadingRecommendations: false }));
    }
  }, []);

  const handleFilterChange = useCallback((newFilters: Partial<Filters>) => {
    setAppState(prev => ({ ...prev, filters: { ...prev.filters, ...newFilters }}));
  }, []);

  const handleResetFilters = useCallback(() => {
    setAppState(prev => ({ ...prev, filters: initialFilters }));
  }, [initialFilters]);

  const handleGetUserLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setAppState(prev => ({ ...prev, userLocation: { latitude, longitude }}));
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Could not get your location. Please ensure location services are enabled.");
      }
    );
  }, []);

  const filteredProducts = useMemo(() => {
    return appState.products.filter(product => {
      const { dietary, maxPrice, minRating, maxDistance } = appState.filters;
      // Dietary filter
      if (dietary.length > 0 && !dietary.every(tag => product.dietaryTags.includes(tag as any))) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Rating filter
      if (product.sellerRating < minRating) {
        return false;
      }
      // Proximity filter
      if (appState.userLocation) {
        const distance = calculateDistance(appState.userLocation, product.location);
        if (distance > maxDistance) {
          return false;
        }
      }
      return true;
    });
  }, [appState.products, appState.filters, appState.userLocation]);

  return (
    <div className="bg-light min-h-screen font-sans">
      <Header
        cartCount={appState.cart.reduce((sum, item) => sum + item.quantity, 0)}
        currentView={appState.view}
        onToggleView={toggleView}
        onCartClick={toggleCart}
      />
      <main className="container mx-auto p-4 md:p-8">
        {appState.view === UserView.BUYER ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark mb-2">Welcome to FoodHub</h1>
              <p className="text-lg text-gray-600">Discover delicious food from local sellers.</p>
            </div>
            <FilterPanel 
              filters={appState.filters}
              maxPrice={maxPrice}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              userLocation={appState.userLocation}
              onGetUserLocation={handleGetUserLocation}
            />
            <Recommendations 
              recommendations={appState.recommendations}
              isLoading={appState.isLoadingRecommendations}
              onAddToCart={addToCart}
            />
            <ProductList 
                products={filteredProducts} 
                onAddToCart={addToCart} 
                onFindSimilar={handleFetchRecommendations}
            />
          </>
        ) : (
          <SellerForm onAddProduct={addProduct} identifyFood={identifyFood} />
        )}
      </main>
      <Cart
        isOpen={appState.isCartOpen}
        onClose={toggleCart}
        cartItems={appState.cart}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
      />
      <Chatbot />
    </div>
  );
};

export default App;