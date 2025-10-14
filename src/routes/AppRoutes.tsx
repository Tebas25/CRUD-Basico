import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import CrudPage from "../pages/CrudPage";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/crud"
        element={
          <ProtectedRoute>
            <CrudPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
