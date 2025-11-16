import { useCallback, useState } from "react";
import type { Employee } from "../admin";
import { fetchEmployeeByCedula } from "./employees.request";

interface ReturnUseEmployeeByCedula {
    employee: Employee | null;
    loadingEmployee: boolean;
    error: string | null;
    refetchEmployee: (cedula: string) => Promise<void>;
    clearEmployee: () => void;
}

export const useEmployeeByCedula = (): ReturnUseEmployeeByCedula => {
    const [loadingEmployee, setLoadingEmployee] = useState(false);
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getEmployee = useCallback(async (cedula: string) => {
        if (!cedula.trim()) {
            setEmployee(null);
            setError("La cédula no puede estar vacía");
            return;
        }

        setLoadingEmployee(true);
        setError(null);
        
        try {
            const result = await fetchEmployeeByCedula(cedula.trim());
            setEmployee(result);
            
            // Si no se encontró el empleado
            if (!result) {
                setError("No se encontró ningún empleado con esa cédula");
            }
        } catch (err: any) {
            setEmployee(null);
            setError(err.message || "Error al buscar empleado");
        } finally {
            setLoadingEmployee(false);
        }
    }, []);

    const refetchEmployee = async (cedula: string) => {
        await getEmployee(cedula);
    }

    const clearEmployee = useCallback(() => {
        setEmployee(null);
        setError(null);
    }, []);

    return {
        employee,
        loadingEmployee,
        error,
        refetchEmployee,
        clearEmployee,
    };
}