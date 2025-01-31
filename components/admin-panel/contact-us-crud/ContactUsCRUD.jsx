import React, { useState } from 'react';
// import './ContactUsCRUD.css'
const ContactUsCRUD = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handle input change for new contact
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  // Add a new contact inquiry
  const handleAddContact = () => {
    setContacts([...contacts, newContact]);
    setNewContact({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  // Delete a contact inquiry
  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  // Update a contact inquiry
  const handleUpdateContact = (index) => {
    const updatedFullName = prompt('Update Full Name', contacts[index].fullName);
    const updatedEmail = prompt('Update Email', contacts[index].email);
    const updatedSubject = prompt('Update Subject', contacts[index].subject);
    const updatedMessage = prompt('Update Message', contacts[index].message);

    const updatedContacts = [...contacts];
    updatedContacts[index] = {
      fullName: updatedFullName || updatedContacts[index].fullName,
      email: updatedEmail || updatedContacts[index].email,
      subject: updatedSubject || updatedContacts[index].subject,
      message: updatedMessage || updatedContacts[index].message,
    };
    setContacts(updatedContacts);
  };

  return (
    <div>
      <h2>Manage Contact Us Inquiries</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={newContact.fullName}
          onChange={handleInputChange}
          placeholder="Enter full name"
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={newContact.email}
          onChange={handleInputChange}
          placeholder="Enter email"
          required
        />
      </div>

      <div className="form-group">
        <label>Subject</label>
        <input
          type="text"
          name="subject"
          value={newContact.subject}
          onChange={handleInputChange}
          placeholder="Enter subject"
          required
        />
      </div>

      <div className="form-group">
        <label>Message</label>
        <textarea
          name="message"
          value={newContact.message}
          onChange={handleInputChange}
          placeholder="Enter message"
          required
        />
      </div>

      <button onClick={handleAddContact}>Add Inquiry</button>

      <h3>Contact Us Inquiries List</h3>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            <strong>Name:</strong> {contact.fullName} | <strong>Email:</strong> {contact.email}
            <div>
              <strong>Subject:</strong> {contact.subject}
            </div>
            <p>{contact.message}</p>
            <div>
              <button onClick={() => handleUpdateContact(index)}>Update</button>
              <button onClick={() => handleDeleteContact(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactUsCRUD;
