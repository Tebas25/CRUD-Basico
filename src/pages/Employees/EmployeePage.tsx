// EmployeePage.tsx
import Layout from "../../components/layout.component";
import { useAdmin } from "../../hooks/admin/employees/useAdmin";
import { useAllEmployees } from "../../hooks/admin/employees/useAllEmployees";
import { useDeleteEmployee } from "../../hooks/admin/employees/useDeleteEmployee";
import { useState } from "react";
import Modal from "../../components/modal";
import { EmployeeForm } from "./NewEmployee";
import { DeleteEmployeeForm } from "./DeleteEmployeePage";
import "../../styles/employee.css";

const EmployeePage = () => {
    const { hookForm, handleCreateEmployee, loadingCreateEmployee } = useAdmin();
    const { 
        employees, 
        loadingEmployees, 
        refetchEmployees
    } = useAllEmployees();
    
    const { handleDeleteEmployee, isDeleting } = useDeleteEmployee();
    
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openCreateModal = () => setIsCreateModalOpen(true);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        hookForm.reset();
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleCreateSubmit = async () => {
        await handleCreateEmployee();
        closeCreateModal();
        refetchEmployees();
    };

    const handleDeleteSubmit = async (cedula: string) => {
        const success = await handleDeleteEmployee(cedula);
        if (success) {
            closeDeleteModal();
            refetchEmployees();
            alert('Empleado eliminado exitosamente');
        } else {
            alert('Error al eliminar el empleado. Verifique la cédula.');
        }
        return success;
    };

    return (
        <Layout title="Administración de Empleados">
            <div className="employee-header">
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Buscar empleado..." 
                        className="search-input"
                    />
                </div>
                <div className="button-group">
                    <button
                        onClick={openDeleteModal}
                        className="btn-delete-employee"
                    >
                        🗑️ Eliminar Empleado
                    </button>
                    <button
                        onClick={openCreateModal}
                        className="btn-new-employee"
                    >
                        + Nuevo Empleado
                    </button>
                </div>
            </div>

            <div className="employee-content">
                {loadingEmployees ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Cargando empleados...</p>
                    </div>
                ) : (
                    <div className="table-container">
                        <table className="employees-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Cédula</th>
                                    <th>Área</th>
                                    <th>Cargo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="no-data">
                                            No hay empleados registrados
                                        </td>
                                    </tr>
                                ) : (
                                    employees.map((employee) => (
                                        <tr key={employee.Empleado_id}>
                                            <td>{employee.Empleado_id}</td>
                                            <td>{employee.Nombre}</td>
                                            <td>{employee.Apellido}</td>
                                            <td>{employee.Cedula}</td>
                                            <td>{employee.Area}</td>
                                            <td>{employee.Cargo}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal para crear empleado */}
            <Modal
                open={isCreateModalOpen}
                onClose={closeCreateModal}
                title="Nuevo Empleado"
            >
                <EmployeeForm 
                    hookForm={hookForm}
                    onSubmit={handleCreateSubmit}
                    loading={loadingCreateEmployee}
                    onCancel={closeCreateModal}
                />
            </Modal>

            {/* Modal para eliminar empleado */}
            <Modal
                open={isDeleteModalOpen}
                onClose={closeDeleteModal}
                title="Eliminar Empleado"
            >
                <DeleteEmployeeForm 
                    onDelete={handleDeleteSubmit}
                    loading={isDeleting}
                    onCancel={closeDeleteModal}
                />
            </Modal>
        </Layout>
    );
};

export default EmployeePage;