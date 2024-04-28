import React, { useState } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";
import "./RegistrationForm.css";

const RegistrationForm = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    contactInformation: "",
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
      .post("http://localhost:8080/patients/register", formData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        window.location.reload();
        // Redirect to PatientForm page
        window.location.href = "/patient-form";
      })
      .catch((error) => {
        console.error("Error registering patient:", error);
        // Optionally, handle error responses
      });
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
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
          <label>Speciality:</label>
          <input
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact Information:</label>
          <input
            type="text"
            name="contactInformation"
            value={formData.contactInformation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
