import "../styles/layout.css";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = ({ title = "Panel de Administración", children }: LayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="layout-container">
      {/* Barra superior */}
      <header className="layout-header">
        <div className="layout-left">
          <h1 className="layout-title">{title}</h1>
        </div>
        <div className="layout-right">
          <button className="layout-btn">Usuarios</button>
          <button className="layout-btn">Configuración</button>
          <button className="layout-btn logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="layout-content">{children}</main>
    </div>
  );
};

export default Layout;
