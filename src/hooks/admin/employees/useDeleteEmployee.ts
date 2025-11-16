import { useState } from "react";
import { deleteEmployee } from "./employees.request";
import { toast } from "react-toastify";

export const useDeleteEmployee = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const handleDeleteEmployee = async (cedula: string): Promise<boolean> => {
        setIsDeleting(true);
        setError(null);
        try {
            const success = await deleteEmployee(cedula);
            toast.success("Empleado eliminado exitosamente");
            return success;
        } catch (error: any) {
            setError(error.message || "Error al eliminar el empleado");
            toast.error(`Error al eliminar empleado: ${error.message || ""}`);
            return false;
        } finally {
            setIsDeleting(false);
        }
    }

    return {
        handleDeleteEmployee,
        isDeleting,
        error,
        resetError: () => setError(null),
    };
};