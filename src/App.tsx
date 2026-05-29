import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Layout from "./pages/admin/Layout";
import LoginForm from "./components/login/LoginForm";
import RegistartionForm from "./components/login/RegistrationForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Rooms from "./pages/user/Rooms";
import ReservationsForm from "./pages/user/ReservationsForm";
import Dashboard from "./pages/admin/Dashboard";
import Guests from "./pages/admin/Guests";
import Reservations from "./pages/admin/Reservations";
import LayoutUser from "./pages/user/LayoutUser";
import WelcomePage from "./pages/user/WelcomePage";
import GestionePrenotazione from "./components/user/GestionePrenotazione";
import CalendarioCamera from "./pages/user/CalendarioCamera";
import LoginAdminForm from "./components/login/LoginAdminForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
          <Route index element={<LoginForm />} />
          <Route path="adminLogin" element={<LoginAdminForm />} />
          <Route path="registrationForm" element={<RegistartionForm />} />
        </Route>
        {/* ROUTE PER CLIENTI */}
        <Route element={<ProtectedRoute role="user" />}>
          <Route path="/user/:id" element={<LayoutUser />}>
            <Route index element={<WelcomePage />} />
            <Route path="rooms" element={<Rooms />} />
            <Route
              path="reservationForm/:roomId"
              element={<ReservationsForm />}
            />
            <Route
              path="gestionePrenotazione/:reservationId"
              element={<GestionePrenotazione />}
            />
            <Route path="calendario/:roomId" element={<CalendarioCamera />} />
          </Route>
        </Route>
        {/* ROUTE PER ADMIN */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/:adminId" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="guests" element={<Guests />} />
            <Route path="reservations" element={<Reservations />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
