// PatientForm.js
import React, { useState } from "react";
import axios from "axios";
import PatientList from "./PatientList";
import "./PatientForm.css";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    medicalHistory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/patients/records", formData)
      .then((response) => {
        console.log("Patient details submitted successfully:", response.data);
        window.location.reload();
        // Optionally, redirect to the patient details page or show a success message
        window.location.href = "/patient-list";
      })
      .catch((error) => {
        console.error("Error submitting patient details:", error);
        // Optionally, handle error responses
      });
  };

  return (
    <div className="patient-form-container">
      <h2>Patient Details Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Medical History:</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PatientForm;
