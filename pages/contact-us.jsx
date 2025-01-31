import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [editMode, setEditMode] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    id: '',
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axios.get('/api/contact/');
    setContacts(response.data);
  };

  // Handle input change for new contact
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Add a new contact inquiry
  const handleAddContact = async (e) => {
    e.preventDefault();
    // Check if any field is empty
    const { fullName, email, subject, message } = newContact;
    if (!fullName || !email || !subject || !message) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const method = editMode ? 'PUT' : 'POST';
    const response = await fetch('/api/contact', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact),
    });
    const data = await response.json();

    if (editMode) {
      fetchContacts();
      setEditMode(false);
    } else {
      setContacts([...contacts, data]);
    }
    
    // Reset newContact fields after submission
    setNewContact({ id: '', fullName: '', email: '', subject: '', message: '' });
    alert("We will be in touch soon!");
  };

  // Update a contact inquiry
  const handleUpdateContact = (index) => {
    setEditMode(true);
    setNewContact(contacts[index]);
  };

  // Delete a contact inquiry
  const handleDeleteContact = async (id) => {
    await fetch('/api/contact', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>

      <div className="form-section">
        <form onSubmit={handleAddContact}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={newContact.fullName} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={newContact.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" name="subject" value={newContact.subject} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={newContact.message} onChange={handleInputChange} required />
          </div>
          <button type="submit" disabled={!newContact.fullName || !newContact.email || !newContact.subject || !newContact.message}>
            {editMode ? "Update Inquiry" : "Submit Inquiry"}
          </button>
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
