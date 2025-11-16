import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout.component";
import UserForm from "../components/UserForm";

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout title="Gestión de Usuarios">
      <div
        style={{
          height: "calc(100vh - 60px)",
          background: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <h1>👋 Hola, estás autenticado</h1>
        <UserForm />
      </div>
    </Layout>
  );
};

export default HomePage;
