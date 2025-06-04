import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import WorkPage from "./pages/WorkPage";
import UserProfilePage from "./pages/UserProfilePage";
import AboutAppPage from "./pages/AboutAppPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route 
          path="/timer" 
          element={
            <PrivateRoute>
              <WorkPage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PrivateRoute>
              <AboutAppPage />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </Router>
  );
}

export default App;
