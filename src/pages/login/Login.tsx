import { Navigate } from "react-router-dom";
import LoginLayout from "../../components/login/LoginLayout";
import { useHotelStore } from "../../zustand/store";

const Login = function () {
  const { currentUser } = useHotelStore();
  if (currentUser?.role === "admin") return <Navigate to="/admin" />;
  if (currentUser?.role === "user")
    return <Navigate to={`/user/${currentUser.id}`} />;
  return (
    <>
      <LoginLayout />
    </>
  );
};

export default Login;
