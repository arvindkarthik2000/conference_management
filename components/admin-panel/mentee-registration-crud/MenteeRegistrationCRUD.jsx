import React, { useState } from 'react';
// import './MenteeRegistrationCRUD.css'
const MenteeRegistrationCRUD = () => {
  const [mentees, setMentees] = useState([]);
  const [newMentee, setNewMentee] = useState({
    name: '',
    email: '',
    areaOfInterest: '',
  });

  // Handle input change for new mentee
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMentee({ ...newMentee, [name]: value });
  };

  // Add a new mentee
  const handleAddMentee = () => {
    setMentees([...mentees, newMentee]);
    setNewMentee({
      name: '',
      email: '',
      areaOfInterest: '',
    });
  };

  // Delete a mentee
  const handleDeleteMentee = (index) => {
    const updatedMentees = mentees.filter((_, i) => i !== index);
    setMentees(updatedMentees);
  };

  // Update a mentee
  const handleUpdateMentee = (index) => {
    const updatedName = prompt('Update Name', mentees[index].name);
    const updatedEmail = prompt('Update Email', mentees[index].email);
    const updatedInterest = prompt('Update Area of Interest', mentees[index].areaOfInterest);

    const updatedMentees = [...mentees];
    updatedMentees[index] = {
      name: updatedName || updatedMentees[index].name,
      email: updatedEmail || updatedMentees[index].email,
      areaOfInterest: updatedInterest || updatedMentees[index].areaOfInterest,
    };
    setMentees(updatedMentees);
  };

  return (
    <div>
      <h2>Manage Mentee Registrations</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={newMentee.name}
          onChange={handleInputChange}
          placeholder="Enter mentee's name"
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={newMentee.email}
          onChange={handleInputChange}
          placeholder="Enter mentee's email"
          required
        />
      </div>

      <div className="form-group">
        <label>Area of Interest</label>
        <input
          type="text"
          name="areaOfInterest"
          value={newMentee.areaOfInterest}
          onChange={handleInputChange}
          placeholder="Enter area of interest"
          required
        />
      </div>

      <button onClick={handleAddMentee}>Add Mentee</button>

      <h3>Mentee Registrations List</h3>
      <ul>
        {mentees.map((mentee, index) => (
          <li key={index}>
            <strong>Name:</strong> {mentee.name} | <strong>Email:</strong> {mentee.email} | <strong>Area of Interest:</strong> {mentee.areaOfInterest}
            <div>
              <button onClick={() => handleUpdateMentee(index)}>Update</button>
              <button onClick={() => handleDeleteMentee(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenteeRegistrationCRUD;
