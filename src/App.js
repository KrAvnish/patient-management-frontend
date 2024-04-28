import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  Link,
} from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <h1>Patient Management System</h1>
        <Link to="/registration-form">
          <button className="custom-button">Go to Registration Form</button>
        </Link>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/patient-form" element={<PatientForm />} />
          <Route path="/patient-list" element={<PatientList />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
