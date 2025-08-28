import { Construction } from "lucide-react";
import axiosInstance from "./axiosInstance";

export const loginUser = (email, password, guestId = null) => {
  return axiosInstance.post("/auth/login", {
    email,
    password,
    guestId
  });
};

export const sendContactMessage = async (data) => {
  return axiosInstance.post("/ContactMessage", data);
};

export const registerCustomer = (payload) => {
  return axiosInstance.post('/Customer', payload);
};

export const updateCustomerAddress = (addressId, data) => {
  return axiosInstance.put(`/CustomerAddresses/${addressId}`, data);
};

export const getCategories = () => axiosInstance.get('/Categories');

export const getProducts = () => axiosInstance.get('/Products');

export const getCategoriesWithProducts = () => axiosInstance.get('/Categories/categories-with-products');

export const getParentCategories = () => axiosInstance.get('/Categories/list');

export const getFlashSales = () => axiosInstance.get('/FlashSale/active');

export const postOrder = (data) => {
    return axiosInstance.post(`/Order`, data);
};

export const getCartItems = (userId) => {
    return axiosInstance.get(`/CartItem/${userId}`);
};

export const addToCart = (data) => {
  return axiosInstance.post("/CartItem", data);
};

export const updateCartQuantity = async (productId, quantity, guestId = null) => {
    try {
        const payload = {
            productId,
            quantity,
            guestId
        };

        const response = await axiosInstance.put(`/CartItem`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, // if logged in
            },
        });

        return response;
    } catch (error) {
        console.error("Error updating cart:", error);
        throw error.response?.data || error;
    }
};

export const removeCartItem = (id, guestId) => {
    return axiosInstance.delete(`/CartItem/${id}`, {
        params: { guestId }
    });
};

export const clearCart = (guestId) => {
    return axiosInstance.delete(`/CartItem/clear`, {
        params: { guestId }, 
    });
};

export const getCustomerOrders = async () => {
    return axiosInstance.get(`/Order/user`);    
};

export const getOrderById = async (id) => {
    return axiosInstance.get(`/Order/${id}`);
};