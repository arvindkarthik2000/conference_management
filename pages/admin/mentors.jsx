import React, { useState, useEffect } from 'react';

const MentorsCRUD = () => {
  const [mentors, setMentors] = useState([]);
  const [newMentor, setNewMentor] = useState({
    name: '',
    area_of_expertise: '',
    availability: [{ date: '', time: '' }],
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    const response = await fetch('/api/mentors');
    const data = await response.json();
    setMentors(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMentor({ ...newMentor, [name]: value });
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...newMentor.availability];
    updatedAvailability[index][field] = value;
    setNewMentor({ ...newMentor, availability: updatedAvailability });
  };

  const handleAddAvailability = () => {
    setNewMentor({
      ...newMentor,
      availability: [...newMentor.availability, { date: '', time: '' }],
    });
  };

  const handleAddMentor = async () => {
    await fetch('/api/mentors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMentor),
    });
    setNewMentor({ name: '', area_of_expertise: '', availability: [{ date: '', time: '' }] });
    fetchMentors();
  };

  const handleDeleteMentor = async (id) => {
    await fetch(`/api/mentors?id=${id}`, { method: 'DELETE' });
    fetchMentors();
  };

  return (
    <div>
      <h2>Manage Mentors</h2>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={newMentor.name}
          onChange={handleInputChange}
          placeholder="Enter mentor's name"
          required
        />
      </div>

      <div className="form-group">
        <label>Area of Expertise</label>
        <input
          type="text"
          name="area_of_expertise"
          value={newMentor.area_of_expertise}
          onChange={handleInputChange}
          placeholder="Enter area of expertise"
          required
        />
      </div>

      <h4>Availability</h4>
      {newMentor.availability.map((slot, index) => (
        <div key={index} className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={slot.date}
            onChange={(e) => handleAvailabilityChange(index, 'date', e.target.value)}
            required
          />
          <label>Time</label>
          <input
            type="time"
            value={slot.time}
            onChange={(e) => handleAvailabilityChange(index, 'time', e.target.value)}
            required
          />
        </div>
      ))}
      <button onClick={handleAddAvailability}>Add Another Slot</button>
      <button onClick={handleAddMentor}>Add Mentor</button>

      <h3>Mentors List</h3>
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor.id}>
            <strong>{mentor.name}</strong> | {mentor.area_of_expertise}
            <button onClick={() => handleDeleteMentor(mentor.id)}>Delete</button>
            <ul>
              {mentor.availability.map((slot, idx) => (
                <li key={idx}>
                  Date: {slot.date}, Time: {slot.time}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorsCRUD;
