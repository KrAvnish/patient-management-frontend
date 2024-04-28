// PatientList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [editedPatient, setEditedPatient] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/patients/records")
      .then((response) => setPatients(response.data))
      .catch((error) =>
        console.error("Error fetching patient records:", error)
      );
  }, []);

  const handleEdit = (patient) => {
    // Set the patient to be edited
    setEditedPatient(patient);
  };

  const handleSave = () => {
    if (!editedPatient) return;

    axios
      .put(
        `http://localhost:8080/patients/records/${editedPatient.id}`,
        editedPatient
      )
      .then(() => {
        console.log("Patient details updated successfully");
        // Clear the edited patient state
        setEditedPatient(null);
        // Optionally, fetch updated patient records
        axios
          .get("http://localhost:8080/patients/records")
          .then((response) => setPatients(response.data))
          .catch((error) =>
            console.error("Error fetching updated patient records:", error)
          );
      })
      .catch((error) => {
        console.error("Error updating patient details:", error);
        // Optionally, handle error responses
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/patients/records/${id}`)
      .then(() => {
        // Filter out the deleted patient from the list
        setPatients(patients.filter((patient) => patient.id !== id));
        console.log("Patient deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting patient:", error);
        // Optionally, handle error responses
      });
  };

  return (
    <div className="patient-list-container">
      <h2>Patient Details</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {editedPatient && editedPatient.id === patient.id ? (
              <div>
                <div>
                  Name:{" "}
                  <input
                    type="text"
                    name="name"
                    value={editedPatient.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  Age:{" "}
                  <input
                    type="text"
                    name="age"
                    value={editedPatient.age}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  Medical History:{" "}
                  <input
                    type="text"
                    name="medicalHistory"
                    value={editedPatient.medicalHistory}
                    onChange={handleChange}
                  />
                </div>
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                Name: {patient.name}
                <br />
                Age: {patient.age}
                <br />
                Medical History: {patient.medicalHistory}
                <br />
                <button onClick={() => handleEdit(patient)}>Edit</button>
                <button onClick={() => handleDelete(patient.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
