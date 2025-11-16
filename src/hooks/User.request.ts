import axios from "axios";

const API_BASE = "http://localhost:8000/login";

// Crear usuario
export const createUserRequest = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE}/create-user`, data);
  return response.data;
};

// Eliminar usuario
export const deleteUserRequest = async (email: string) => {
  const response = await axios.post(`${API_BASE}/delete-user`, {
    data: { email },
  });
  return response.data;
};

// 🆕 Nuevo servicio para actualizar usuario
export const updateUserRequest = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE}/update-user`, data);
  return response.data;
};
