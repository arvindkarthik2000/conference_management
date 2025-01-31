import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketPurchasesCRUD = () => {
    const [purchases, setPurchases] = useState([]);
    const [editMode, setEditMode] = useState(false)
    const [tickets, setTickets] = useState([]);
    const [newPurchase, setNewPurchase] = useState({
        id: '',
        purchaserName: '',
        email: '',
        ticketType: '',
        quantity: 1,
        ticket_type_id:''
    });

    useEffect(() => {
        fetchTickets();
        fetchPurchases();
    }, []);

    const fetchTickets = async () => {
        const response = await axios.get('/api/tickets/');
        setTickets(response.data);
    };

    const fetchPurchases = async () => {
        const response = await fetch('/api/ticket-sales');
        const data = await response.json();
        setPurchases(data.purchases);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPurchase({ ...newPurchase, [name]: value });
    };

    const handleAddPurchase = async () => {
        if (editMode) {
            
            
            
            await fetch('/api/ticket-sales', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPurchase),
            });
            setNewPurchase({
                id: '',
                purchaserName: '',
                email: '',
                ticketType: '',
                quantity: 1,
                ticket_type_id:''
            })
            fetchPurchases();
            setEditMode(false)

        } else {

            await fetch('/api/ticket-sales', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPurchase),
            });
            
            setNewPurchase({ purchaserName: '', email: '', ticketType: '', quantity: 1 });
            fetchPurchases();
        }

    };

    const handleUpdatePurchase = async (index) => {

        setEditMode(true)
        console.log(JSON.stringify(purchases[index]))
        
        const a = purchases[index]

        setNewPurchase({purchaserName:a.purchaser_name,id:a.id,email:a.email,quantity:a.quantity,ticketTypeId:a.ticket_type_id})


    };

    const handleDeletePurchase = async (id) => {
        await fetch(`/api/tickets?id=${id}`, { method: 'DELETE' });
        fetchPurchases();
    };

    return (
        <div>
            <h2>Manage Ticket Purchases</h2>
            <input
                type="text"
                name="purchaserName"
                value={newPurchase.purchaserName}
                onChange={handleInputChange}
                placeholder="Enter purchaser's name"
                required
            />
            <input
                type="email"
                name="email"
                value={newPurchase.email}
                onChange={handleInputChange}
                placeholder="Enter purchaser's email"
                required
            />
            <select name="ticketType" value={newPurchase.ticket_type} onChange={handleInputChange} required>
                <option value="">Select Ticket Type</option>
                {tickets.map((ticket) => (
                    <option key={ticket.id} value={ticket.id}>
                        {ticket.type}
                    </option>
                ))}
            </select>
            <br></br><br></br>
            <input
                type="number"
                name="quantity"
                value={newPurchase.quantity}
                onChange={handleInputChange}
                min="1"
                placeholder="Quantity"
            />
            <br></br>
            <button onClick={handleAddPurchase}>{editMode ? 'Update' : 'Add'}  Purchase</button>
            <br />
            <h3>Ticket Sales</h3>
            <ul>
                {purchases?.map((purchase, index) => (
                    <li key={purchase.id}>
                        {purchase.purchaser_name} - {purchase.email} - {purchase.ticket_type} - {purchase.quantity}{' '}
                        <button onClick={() => handleUpdatePurchase(index)}>Update</button>
                        <button onClick={() => handleDeletePurchase(purchase.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketPurchasesCRUD;
