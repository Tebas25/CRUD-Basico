import { useCallback, useEffect, useState } from "react";
import type { Employee } from "../admin";
import { fetchGetAllEmployees } from "./employees.request";

interface ReturnUseAllEmployees {
    employees: Employee[];
    loadingEmployees: boolean;
    onSelectionChange: (selectedEmployees: Employee[]) => void;
    onSelectionAllChange: (checked: boolean) => void;
    selectAll: boolean;
    selectedEmployees: Employee[];
    refetchEmployees: () => void;
}

export const useAllEmployees = (): ReturnUseAllEmployees => {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);

    const getAllEmployees = useCallback(async () => {
        setLoadingEmployees(true);
        try {
            const result = await fetchGetAllEmployees();
            setEmployees(result);
        } catch (error) {
            console.error("Error fetching employees:", error);
            setEmployees([]);
        } finally {
            setLoadingEmployees(false);
        }
    }, []);

    const onSelectionChange = (selected: Employee[]): void => {
        setSelectedEmployees(selected);
        setSelectAll(selected.length === employees.length);
    };

    const onSelectionAllChange = (checked: boolean): void => {
        if (checked && employees.length > 0) {
            setSelectedEmployees([...employees]);
            setSelectAll(true);
        } else {
            setSelectedEmployees([]);
            setSelectAll(false);
        }
    };

    const refetchEmployees = () => {
        getAllEmployees();
    };

    useEffect(() => {
        getAllEmployees();
    }, [getAllEmployees]);

    return {
        employees,
        loadingEmployees,
        onSelectionChange,
        onSelectionAllChange,
        selectAll,
        selectedEmployees,
        refetchEmployees
    };
};