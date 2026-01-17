import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {BASE_URL} from '../constants'

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // This allows cookies to be sent with requests
    prepareHeaders: (headers, { getState }) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        // If we have a token, set it in the Authorization header
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
})
  
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'User'],
    endpoints: (builder)=> ({}),
})