import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./auth/UserContext";
import CitizenDashboard from "./components/CitizenDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const user = useContext(UserContext);
  const userIsAdmin = user.admin;

  return (
    <Routes>
      <Route path="/" element={<CitizenDashboard />} />
      <Route
        path="/admin"
        element={!userIsAdmin ? <CitizenDashboard /> : <AdminDashboard />}
      />
      <Route path="*" element={<CitizenDashboard />} />
    </Routes>
  );
}

export default App;
