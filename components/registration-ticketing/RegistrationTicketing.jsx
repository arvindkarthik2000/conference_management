import React, { useState } from 'react';
import axios from 'axios';

const RegistrationTicketing = () => {
  const [registration, setRegistration] = useState({
    fullName: '',
    email: '',
    ticketType: 'general',
  });
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistration({
      ...registration,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/registrations', registration);
      setSubmissionStatus('Registration successful');
      sendConfirmationEmail();
    } catch (error) {
      setSubmissionStatus('Error with registration');
      console.error(error);
    }
  };

  const sendConfirmationEmail = () => {
    // Mockup for sending email confirmation
    alert('Confirmation email sent to: ' + registration.email);
  };

  return (
    <div className="registration-container">
      {/* Registration Form */}
      <section className="registration-form">
        <h2>Register for the Conference</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={registration.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={registration.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ticketType">Select Ticket Type:</label>
            <select
              id="ticketType"
              name="ticketType"
              value={registration.ticketType}
              onChange={handleChange}
            >
              <option value="general">General Admission - $100</option>
              <option value="vip">VIP Admission - $250</option>
              <option value="student">Student Admission - $50</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Proceed to Payment
          </button>
        </form>
      </section>

      {/* Submission Status */}
      {submissionStatus && <p>{submissionStatus}</p>}
    </div>
  );
};

export default RegistrationTicketing;
