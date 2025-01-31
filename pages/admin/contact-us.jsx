// File: pages/contact-us-crud.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactUsCRUD = () => {
    const [editMode,setEditMode]= useState(false)

    const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    id:'',
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
  const handleAddContact = async () => {

    if(editMode){
        const response = await fetch('/api/contact', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact),
          });
          const data = await response.json();
            setNewContact({
                id:'',
                fullName: '',
                email: '',
                subject: '',
                message: '',
              })  
              fetchContacts();
              setEditMode(false)
    }
    else{

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newContact),
          });
          const addedContact = await response.json();
          setContacts([...contacts, addedContact]);
          setNewContact({ fullName: '', email: '', subject: '', message: '' });
    }

  };

  // Update a contact inquiry
  const handleUpdateContact = async (index) => {

  
    setEditMode(true)
    setNewContact(contacts[index])

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
    <div>
      <h2>Manage Contact Us Inquiries</h2>

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
      <button onClick={handleAddContact}>Add Inquiry</button>

      <h3>Contact Us Inquiries List</h3>
      <ul>
        {contacts.map((contact,index) => (
          <li key={contact.id}>
            <strong>Name:</strong> {contact.fullName} | <strong>Email:</strong> {contact.email}
            <div><strong>Subject:</strong> {contact.subject}</div>
            <p>{contact.message}</p>
            <button onClick={() => handleUpdateContact(index)}>Update</button>
            <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default ContactUsCRUD;