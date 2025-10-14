// src/hooks/useCrudUsers.ts
import { useState } from "react";
import {
  createUserRequest,
  deleteUserRequest,
  updateUserRequest,
} from "./User.request";
import { toast } from "react-toastify";

export const useCrudUsers = () => {
  const [loading, setLoading] = useState(false);

  const createUser = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await createUserRequest({ username, email, password });
      toast.success(res.message || "Usuario creado exitosamente");
      return true;
    } catch (err: any) {
      toast.error("Error al crear el usuario");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (email: string) => {
    setLoading(true);
    try {
      const success = await deleteUserRequest(email);
      if (success) {
        toast.success("Usuario eliminado correctamente");
        return true;
      } else {
        toast.warning("No se pudo eliminar el usuario");
        return false;
      }
    } catch (err: any) {
      toast.error("Error al eliminar el usuario");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

    const updateUser = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await updateUserRequest({ username, email, password });
      toast.success(response.message || "Usuario actualizado exitosamente");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createUser,
    deleteUser,
    updateUser,
  };
};
