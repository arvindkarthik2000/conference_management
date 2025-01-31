// File: pages/ticketing-crud.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
const TicketingCRUD = () => {
  const [tickets, setTickets] = useState([]);
  const [editMode,setEditMode] = useState(false)
  const [newTicket, setNewTicket] = useState({
    id:'',
    type: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await axios.get('/api/tickets/');
    
    setTickets(response.data);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  // Add a new ticket
  const handleAddTicket = async () => {

    if(editMode){
      const response = await fetch('/api/tickets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket),
      });
      const updatedTicket = await response.json();
      setNewTicket({
        id:'',
        type: '',
        price: '',
        quantity: '',
      });
      fetchTickets()
      setEditMode(false)
    }else{

      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTicket),
      });
      const addedTicket = await response.json();
      setTickets([...tickets, addedTicket]);
      setNewTicket({ type: '', price: '', quantity: '' });

    }


  };

  // Update a ticket
  const handleUpdateTicket = async (index) => {

    setEditMode(true)
    setNewTicket(tickets[index])
  };

  // Delete a ticket
  const handleDeleteTicket = async (id) => {
    await fetch('/api/tickets', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTickets(tickets.filter((ticket) => ticket.id !== id));
  };

  return (
    <div>
      <h2>Manage Ticketing</h2>

      <div className="form-group">
        <label>Ticket Type</label>
        <input type="text" name="type" value={newTicket.type} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Price</label>
        <input type="number" name="price" value={newTicket.price} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input type="number" name="quantity" value={newTicket.quantity} onChange={handleInputChange} required />
      </div>
      <button onClick={handleAddTicket}>{editMode ? 'Update' : 'Add'} Ticket</button>

      <h3>Ticket List</h3>
      <ul>
        {tickets.map((ticket,index) => (
          <li key={ticket.id}>
            <strong>Type:</strong> {ticket.type} | <strong>Price:</strong> ${ticket.price} | <strong>Quantity:</strong> {ticket.quantity}
            <div>
              <button onClick={() => handleUpdateTicket(index)}>Update</button>
              <button onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default TicketingCRUD;
