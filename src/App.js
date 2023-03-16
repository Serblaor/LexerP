import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import HomaPage from "./Pages/HomePage";
import Form from "./components/form";
import Header from "./components/Header";

function App() {
  const [access, setAccess] = useState(false);

  const username = "Cryptoapp@gmail.com";
  const password = "Crypto1";

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!access) {
      navigate("/");
    }
  }, [access, navigate]);

  function login(userData) {
    if (userData.username === username && userData.password === password) {
      setAccess(true);
      navigate("/home");
    }
  }
  function logout() {
    setAccess(false);
    navigate("/");
  }

  return (
    <ErrorBoundary>
      <div>
        {location.pathname === "/" ? null : <Header logout={logout} />}
        <Routes>
          <Route path="/" element={<Form login={login} />}></Route>
          <Route path="/home" element={<HomaPage />}></Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
