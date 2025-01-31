import React, { useState } from 'react';
// import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, like sending the data to the backend
    
    const response = await fetch('/api/contact/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    alert('Form submitted! We will get back to you soon.');
    // Clear form after submission
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
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

          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="info-section">
        <h3>Contact Information</h3>
        <p><strong>Email:</strong> info@conference.com</p>
        <p><strong>Phone:</strong> +1 (123) 456-7890</p>
      </div>

      <div className="map-section">
        <h3>Our Location</h3>
        <p><strong>Address:</strong> 123 Conference St, City, State, 12345</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.079899930661!2d-122.41941508435702!3d37.77492957975965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c4af9f23d%3A0x4dd4e5b8fd9d9675!2s123%20Conference%20St%2C%20San%20Francisco%2C%20CA%2094158%2C%20USA!5e0!3m2!1sen!2sus!4v1630988039923!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Conference Location"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
