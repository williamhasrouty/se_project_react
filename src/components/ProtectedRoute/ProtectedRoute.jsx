import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, onLoginRequired }) {
  if (!isLoggedIn) {
    // Show login modal and redirect to home
    if (onLoginRequired) onLoginRequired();
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
