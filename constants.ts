import { Product } from './types';

// Sample locations around a central point for proximity testing
const locations = [
  { latitude: 34.0522, longitude: -118.2437 }, // Downtown LA
  { latitude: 34.0622, longitude: -118.2537 }, // ~1.5km away
  { latitude: 34.1016, longitude: -118.3437 }, // ~8km away
  { latitude: 33.9522, longitude: -118.2437 }, // ~11km away
  { latitude: 34.0522, longitude: -118.4437 }, // ~20km away
  { latitude: 34.1522, longitude: -118.2437 }, // ~11km away
  { latitude: 33.8522, longitude: -118.2437 }, // ~22km away
  { latitude: 34.0522, longitude: -118.0437 }, // ~20km away
];


export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Artisanal Sourdough Bread',
    description: 'Freshly baked, crusty sourdough with a soft, chewy interior. Perfect for sandwiches or toast.',
    price: 7.50,
    imageUrl: 'https://picsum.photos/seed/bread/400/300',
    dietaryTags: ['vegan', 'vegetarian', 'nut-free'],
    sellerRating: 5,
    location: locations[0],
  },
  {
    id: 2,
    name: 'Organic Strawberry Jam',
    description: 'Homemade jam with hand-picked organic strawberries and a hint of lemon.',
    price: 5.00,
    imageUrl: 'https://picsum.photos/seed/jam/400/300',
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'nut-free'],
    sellerRating: 4,
    location: locations[1],
  },
  {
    id: 3,
    name: 'Spicy Thai Green Curry',
    description: 'A fragrant and spicy curry with chicken, coconut milk, and fresh vegetables. Serves two.',
    price: 15.00,
    imageUrl: 'https://picsum.photos/seed/curry/400/300',
    dietaryTags: ['nut-free'],
    sellerRating: 5,
    location: locations[2],
  },
  {
    id: 4,
    name: 'Gourmet Chocolate Chip Cookies',
    description: 'A dozen classic cookies packed with premium dark chocolate chunks and a sprinkle of sea salt.',
    price: 12.00,
    imageUrl: 'https://picsum.photos/seed/cookies/400/300',
    dietaryTags: ['vegetarian'],
    sellerRating: 4,
    location: locations[3],
  },
  {
    id: 5,
    name: 'Cold-Pressed Green Juice',
    description: 'A refreshing and healthy blend of kale, spinach, apple, and cucumber.',
    price: 6.00,
    imageUrl: 'https://picsum.photos/seed/juice/400/300',
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'nut-free'],
    sellerRating: 5,
    location: locations[4],
  },
  {
    id: 6,
    name: 'Farm-Fresh Eggs',
    description: 'One dozen free-range eggs from happy, pasture-raised chickens.',
    price: 4.50,
    imageUrl: 'https://picsum.photos/seed/eggs/400/300',
    dietaryTags: ['vegetarian', 'gluten-free', 'nut-free'],
    sellerRating: 3,
    location: locations[5],
  },
   {
    id: 7,
    name: 'Handmade Ravioli',
    description: 'Delicate pasta pockets filled with ricotta cheese and spinach, ready to cook.',
    price: 18.00,
    imageUrl: 'https://picsum.photos/seed/ravioli/400/300',
    dietaryTags: ['vegetarian'],
    sellerRating: 4,
    location: locations[6],
  },
  {
    id: 8,
    name: 'Vegan Gluten-Free Brownie Box',
    description: 'A box of six fudgy and decadent vegan brownies, made with plant-based ingredients.',
    price: 16.00,
    imageUrl: 'https://picsum.photos/seed/brownie/400/300',
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free'],
    sellerRating: 5,
    location: locations[7],
  }
];