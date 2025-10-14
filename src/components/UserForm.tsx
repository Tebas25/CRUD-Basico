// src/components/UserForm.tsx
import { useState } from "react";
import { useCrudUsers } from "../hooks/useCrudUser";
import "../styles/userform.css";

const UserForm = () => {
  const { createUser, deleteUser, updateUser, loading } = useCrudUsers();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(formData.username, formData.email, formData.password);
  };

  const handleUpdate = async () => {
    if (!formData.email)
      return alert("Por favor ingresa el correo del usuario a actualizar");
    await updateUser(formData.username, formData.email, formData.password);
  };

  const handleDelete = async () => {
    if (!formData.email) return alert("Por favor ingresa un correo a eliminar");
    await deleteUser(formData.email);
  };

  return (
    <div className="userform-container">
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleCreate} className="userform">
        <div className="input-group">
          <label>Nombre de usuario</label>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ej: jdoe"
          />
        </div>

        <div className="input-group">
          <label>Correo electrónico</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ej: jdoe@email.com"
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Usuario"}
          </button>
          <button type="button" onClick={handleUpdate} disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar Usuario"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="delete-btn"
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar Usuario"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
