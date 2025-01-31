import React, { useState } from 'react';
// import './TicketPurchasesCRUD.css'
const TicketPurchasesCRUD = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    purchaserName: '',
    email: '',
    ticketType: '',
    quantity: 1,
  });

  // Handle input change for new ticket
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  // Add a new ticket purchase
  const handleAddTicket = () => {
    setTickets([...tickets, newTicket]);
    setNewTicket({
      purchaserName: '',
      email: '',
      ticketType: '',
      quantity: 1,
    });
  };

  // Delete a ticket purchase
  const handleDeleteTicket = (index) => {
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
  };

  // Update a ticket purchase
  const handleUpdateTicket = (index) => {
    const updatedName = prompt('Update Purchaser Name', tickets[index].purchaserName);
    const updatedEmail = prompt('Update Email', tickets[index].email);
    const updatedTicketType = prompt('Update Ticket Type', tickets[index].ticketType);
    const updatedQuantity = prompt('Update Quantity', tickets[index].quantity);

    const updatedTickets = [...tickets];
    updatedTickets[index] = {
      purchaserName: updatedName || updatedTickets[index].purchaserName,
      email: updatedEmail || updatedTickets[index].email,
      ticketType: updatedTicketType || updatedTickets[index].ticketType,
      quantity: updatedQuantity ? Number(updatedQuantity) : updatedTickets[index].quantity,
    };
    setTickets(updatedTickets);
  };

  return (
    <div>
      <h2>Manage Ticket Purchases</h2>

      <div className="form-group">
        <label>Purchaser Name</label>
        <input
          type="text"
          name="purchaserName"
          value={newTicket.purchaserName}
          onChange={handleInputChange}
          placeholder="Enter purchaser's name"
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={newTicket.email}
          onChange={handleInputChange}
          placeholder="Enter purchaser's email"
          required
        />
      </div>

      <div className="form-group">
        <label>Ticket Type</label>
        <input
          type="text"
          name="ticketType"
          value={newTicket.ticketType}
          onChange={handleInputChange}
          placeholder="Enter ticket type"
          required
        />
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          value={newTicket.quantity}
          onChange={handleInputChange}
          min="1"
          required
        />
      </div>

      <button onClick={handleAddTicket}>Add Ticket Purchase</button>

      <h3>Ticket Purchases List</h3>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            <strong>Purchaser Name:</strong> {ticket.purchaserName} | 
            <strong> Email:</strong> {ticket.email} | 
            <strong> Ticket Type:</strong> {ticket.ticketType} | 
            <strong> Quantity:</strong> {ticket.quantity}
            <div>
              <button onClick={() => handleUpdateTicket(index)}>Update</button>
              <button onClick={() => handleDeleteTicket(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketPurchasesCRUD;
