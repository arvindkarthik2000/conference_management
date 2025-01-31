import React, { useState } from 'react';
// import './TicketingCRUD.css'
const TicketingCRUD = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    type: '',
    price: '',
    quantity: '',
  });

  // Handle input change for new ticket
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  // Add a new ticket
  const handleAddTicket = () => {
    setTickets([...tickets, newTicket]);
    setNewTicket({
      type: '',
      price: '',
      quantity: '',
    });
  };

  // Delete a ticket
  const handleDeleteTicket = (index) => {
    const updatedTickets = tickets.filter((_, i) => i !== index);
    setTickets(updatedTickets);
  };

  // Update a ticket
  const handleUpdateTicket = (index) => {
    const updatedType = prompt('Update ticket type', tickets[index].type);
    const updatedPrice = prompt('Update ticket price', tickets[index].price);
    const updatedQuantity = prompt('Update ticket quantity', tickets[index].quantity);

    const updatedTickets = [...tickets];
    updatedTickets[index] = {
      type: updatedType || updatedTickets[index].type,
      price: updatedPrice || updatedTickets[index].price,
      quantity: updatedQuantity || updatedTickets[index].quantity,
    };
    setTickets(updatedTickets);
  };

  return (
    <div>
      <h2>Manage Ticketing</h2>

      <div className="form-group">
        <label>Ticket Type</label>
        <input
          type="text"
          name="type"
          value={newTicket.type}
          onChange={handleInputChange}
          placeholder="Enter ticket type"
          required
        />
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={newTicket.price}
          onChange={handleInputChange}
          placeholder="Enter ticket price"
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
          placeholder="Enter ticket quantity"
          required
        />
      </div>

      <button onClick={handleAddTicket}>Add Ticket</button>

      <h3>Ticket List</h3>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            <strong>Type:</strong> {ticket.type} | <strong>Price:</strong> ${ticket.price} | <strong>Quantity:</strong> {ticket.quantity}
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

export default TicketingCRUD;
