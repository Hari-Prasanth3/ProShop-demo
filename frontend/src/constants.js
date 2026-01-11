// Use environment variable for backend URL, fallback to Vercel backend
export const BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://proshop-backend-brown.vercel.app' 
    : 'http://localhost:5001');
 export const PRODUCTS_URL = '/api/products';
 export const USERS_URL = '/api/users';
 export const ORDERS_URL = '/api/orders';
 export const PAYPAL_URL = '/api/config/paypal';
 export const UPLOAD_URL = '/api/upload';
 
