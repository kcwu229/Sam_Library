import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="login"></Navigate>;
  } else {
    return children;
  }
}

export default ProtectedRoute;
