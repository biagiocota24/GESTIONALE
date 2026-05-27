import { Navigate, Outlet } from "react-router-dom";
import { useHotelStore } from "../zustand/store";


const ProtectedRoute = ({ role }: { role: "admin" | "user" }) => {
  const { currentUser } = useHotelStore();

  if (!currentUser) return <Navigate to="/" />;
  if (currentUser.role !== role) return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoute;
