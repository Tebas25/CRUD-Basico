import type { NewEmployee } from "../admin";
import { createEmployee } from "./employees.request";
import { useForm, type UseFormReturn } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface ICreateEmployeeReturn {
    hookForm: UseFormReturn<NewEmployee>;
    handleCreateEmployee: () => Promise<void>;
    loadingCreateEmployee: boolean;
}

const defaultFormValues: NewEmployee = {
    Nombre: "",
    Apellido: "",
    Cedula: "",
    Area: "",
    Cargo: ""
}
     
export const useAdmin = (): ICreateEmployeeReturn => { 
    const hookForm = useForm<NewEmployee>({ defaultValues: defaultFormValues });

    const { mutateAsync: createEmployeeMutate, isPending: loadingCreateEmployee } = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            toast.success("Empleado creado exitosamente");
            hookForm.reset(defaultFormValues);
        },
        onError: (error: any) => {
            toast.error(`Error al crear empleado: ${error.message}`);
        }
    });

    const handleCreateEmployee = hookForm.handleSubmit(async (formData: NewEmployee) => {
        await createEmployeeMutate(formData);
    })

    return {
        hookForm,
        handleCreateEmployee,
        loadingCreateEmployee
    }
}