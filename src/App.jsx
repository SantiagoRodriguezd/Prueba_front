import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Shop from "./pages/Shop/Shop";
import Error from "./pages/error/404error";

function App() {
  const [authToken, setAuthToken] = useState(
    sessionStorage.getItem("access_token")
  );
  const [userRoles, setUserRoles] = useState(sessionStorage.getItem("roles"));

  useEffect(() => {
    setUserRoles(sessionStorage.getItem("roles"));
  }, []);

  function handleLogin(access_token, roles) {
    setAuthToken(access_token);
    setUserRoles(roles);
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("roles", JSON.stringify(roles));
  }

  function handleLogout() {
    setAuthToken(null);
    setUserRoles(null);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("roles");
    sessionStorage.removeItem("cliente");

    return isAuthenticated ? <Navigate to="/signin" /> : <Outlet />;
  }

  const isAuthenticated = !!authToken;

  function PrivateOutlet() {
    return isAuthenticated ? <Outlet /> : <Navigate to="signin" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        {userRoles && userRoles.includes("Administrador") && (
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="home" element={<Home onLogout={handleLogout} />} />
          </Route>
        )}
        {userRoles && userRoles.includes("Comprador") && (
          <Route path="/" element={<PrivateOutlet />}>
            <Route path="shop" element={<Shop onLogout={handleLogout} />} />
          </Route>
        )}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
