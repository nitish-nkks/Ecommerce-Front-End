import apiClient from "./apiClient";

export async function createCustomer(userData) {
  return await apiClient.post('/Customer', userData);
}