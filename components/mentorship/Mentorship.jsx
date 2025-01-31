import React, { useState } from 'react';
// import './Mentorship.css';
import Mentor1 from "./images/mentor1.png"
import Mentor2 from "./images/mentor-2.jpg"
import Mentor3 from "./images/mentor3.jpg"

const mentors = [
  {
    name: 'Dr. Jane Doe',
    expertise: 'Career Development, Leadership, Business Strategy',
    image: Mentor1,
  },
  {
    name: 'John Smith',
    expertise: 'Software Engineering, Machine Learning, Startups',
    image: Mentor2,
  },
  {
    name: 'Emily Johnson',
    expertise: 'Marketing, Branding, Social Media Strategy',
    image: Mentor3,
  },
];

const Mentorship = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
  });

  const [selectedMentor, setSelectedMentor] = useState(null);
  const [scheduleDate, setScheduleDate] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit registration form data
    alert('Mentee Registration Submitted!');
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (selectedMentor && scheduleDate) {
      // Logic to schedule session
      alert(`Mentorship session scheduled with ${selectedMentor} on ${scheduleDate}!`);
    } else {
      alert('Please select a mentor and a date.');
    }
  };

  return (
    <div className="mentorship-container">
      <h2>Mentorship Program</h2>
      
      {/* Mentor Profiles */}
      <section className="mentor-profiles">
        <h3>Meet Our Mentors</h3>
        <div className="mentor-list">
          {mentors.map((mentor, index) => (
            <div key={index} className="mentor-card">
              <img src={mentor.image} alt={mentor.name} />
              <h4>{mentor.name}</h4>
              <p><strong>Expertise:</strong> {mentor.expertise}</p>
              <button onClick={() => setSelectedMentor(mentor.name)}>Schedule with {mentor.name}</button>
            </div>
          ))}
        </div>
      </section>

      {/* Mentee Registration Form */}
      <section className="mentee-registration">
        <h3>Become a Mentee</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="interest">Area of Interest:</label>
          <input 
            type="text" 
            id="interest" 
            name="interest" 
            value={formData.interest} 
            onChange={handleChange} 
            required 
          />

          <button type="submit">Register</button>
        </form>
      </section>

      {/* Schedule Tool */}
      <section className="schedule-tool">
        <h3>Schedule Mentorship Session</h3>
        <form onSubmit={handleScheduleSubmit}>
          <label htmlFor="mentor">Selected Mentor:</label>
          <input 
            type="text" 
            id="mentor" 
            name="mentor" 
            value={selectedMentor || ''} 
            readOnly 
          />

          <label htmlFor="date">Choose a Date:</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            value={scheduleDate} 
            onChange={(e) => setScheduleDate(e.target.value)} 
            required 
          />

          <button type="submit">Schedule Session</button>
        </form>
      </section>
    </div>
  );
};

export default Mentorship;
