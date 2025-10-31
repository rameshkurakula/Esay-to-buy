export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  dietaryTags: ('vegetarian' | 'vegan' | 'gluten-free' | 'nut-free')[];
  sellerRating: number; // 1 to 5
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export enum UserView {
    BUYER = 'buyer',
    SELLER = 'seller'
}

export interface Filters {
    dietary: string[];
    maxPrice: number;
    minRating: number;
    maxDistance: number; // in km
}

export interface UserLocation {
    latitude: number;
    longitude: number;
}

export interface AppState {
    products: Product[];
    cart: CartItem[];
    recommendations: Product[];
    view: UserView;
    isCartOpen: boolean;
    isLoadingRecommendations: boolean;
    filters: Filters;
    userLocation: UserLocation | null;
}