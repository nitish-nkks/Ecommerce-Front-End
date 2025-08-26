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

export const updateCartQuantity = (id, quantity) => {
    return axiosInstance.put(
        `/CartItem/${id}`,
        { quantity }, // send in body
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
};

export const removeCartItem = (id) => {
    return axiosInstance.delete(`/CartItem/${id}`);
};

export const clearCart = (userId) => {
    return axiosInstance.delete(`/CartItem/clear/${userId}`);
};
