import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketPurchasesCRUD = () => {
    const [purchases, setPurchases] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [newPurchase, setNewPurchase] = useState({
        id: '',
        purchaserName: '',
        email: '',
        ticketType: '',
        quantity: 1,
        ticket_type_id: ''
    });
    const [showCardDetails, setShowCardDetails] = useState(false);  // State for showing card details form
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [cardError, setCardError] = useState('');

    useEffect(() => {
        fetchTickets();
        fetchPurchases();
    }, []);

    useEffect(() => {
        // Check if all required fields are filled
        const { purchaserName, email, ticketType } = newPurchase;
        setIsFormValid(purchaserName && email && ticketType);
    }, [newPurchase]);

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

    const handleCardInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const validateCardDetails = () => {
        const { cardNumber, expiryDate, cvv } = cardDetails;
        setCardError('');

        // Card Number Validation (using Luhn's algorithm)
        if (!/^\d{16}$/.test(cardNumber)) {
            setCardError('Invalid card number');
            return false;
        }
        if (!luhnCheck(cardNumber)) {
            setCardError('Card number is invalid (Luhn check failed)');
            return false;
        }

        // Expiry Date Validation (MM/YY format)
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            setCardError('Invalid expiry date format (MM/YY)');
            return false;
        }

        // CVV Validation
        if (!/^\d{3}$/.test(cvv)) {
            setCardError('Invalid CVV');
            return false;
        }

        return true;
    };

    const luhnCheck = (cardNumber) => {
        let sum = 0;
        let shouldDouble = false;

        // Traverse the card number from right to left
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
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
                ticket_type_id: ''
            });
            fetchPurchases();
            setEditMode(false);
        } else {

            setShowCardDetails(true);
            
            
        }
    };

    const handlePayment = async () => {
        if (validateCardDetails()) {
            try {


                let r = await fetch('/api/ticket-sales', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newPurchase),
                });
    
                const data = await r.json();
                if (!data.error) {
                    // Show card details form after a successful ticket submission
                    alert("Payment Successful! Ticket sent to your email.");
                    setShowCardDetails(false);  // Close card details form after successful payment


                    try {
                        const res = await fetch('/api/send-email', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                recipient: newPurchase.email,
                                subject: "🎉 Welcome to the 2025 AI Conference Platform!",
                                message: `Hello,
                              Thank you for registering for the 2025 AI Conference! 
                              You’re now part of a global community of innovators, researchers, and professionals shaping the future of AI, machine learning, and data science.
                              
                              Here’s what you can look forward to:
                              - 🌟 Cutting-edge discussions with industry leaders.
                              - 📄 Opportunities to submit and review research papers.
                              - 🎥 Attend live virtual sessions and keynote talks from experts worldwide.
                              - 🧑‍🏫 Gain mentorship and network with peers in the AI field.
                              
                              Get ready to explore the future of technology and make meaningful connections. We’re excited to have you join us on this journey!
                              
                              For any questions or support, feel free to reach out.
                              
                              Best regards,  
                              The 2025 AI Conference Team`,
                              }),
                                                      });
                        
                        const data = await res.json();
                        if (data.message === 'Email sent successfully!') {
                            alert('Email sent successfully!');
                        } else {
                            alert('Failed to send email.');
                        }
                    } catch (error) {
                        alert('Error sending email');
                    }

                } else {
                    alert("Something's not right! Please check form details");
                }
                setNewPurchase({ purchaserName: '', email: '', ticketType: '', quantity: 1 });
                fetchPurchases();

            } catch (error) {
                console.error('Payment processing error:', error);
                alert("There was an error processing your payment. Please try again.");
            }
        }
    };

    const handleUpdatePurchase = async (index) => {
        setEditMode(true);
        const a = purchases[index];
        setNewPurchase({ purchaserName: a.purchaser_name, id: a.id, email: a.email, quantity: a.quantity, ticketTypeId: a.ticket_type_id });
    };

    const handleDeletePurchase = async (id) => {
        await fetch(`/api/tickets?id=${id}`, { method: 'DELETE' });
        fetchPurchases();
    };

    return (
        <div>
            <h2>Purchase your tickets</h2>
            <input
                type="text"
                name="purchaserName"
                value={newPurchase.purchaserName}
                onChange={handleInputChange}
                placeholder="Name"
                required
            />
            <input
                type="email"
                name="email"
                value={newPurchase.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
            />
            <select name="ticketType" value={newPurchase.ticketType} onChange={handleInputChange} required>
                <option value="">Select Ticket Type</option>
                {tickets.map((ticket) => (
                    <option key={ticket.id} value={ticket.id}>
                        {ticket.type} - ${ticket.price}
                    </option>
                ))}
            </select>
            <br /><br />
            <input
                type="number"
                name="quantity"
                value={newPurchase.quantity}
                onChange={handleInputChange}
                min="1"
                placeholder="Quantity"
            />
            <br />
            <button onClick={handleAddPurchase} disabled={!isFormValid}>Purchase</button>

            {/* Show card details form when triggered */}
            {showCardDetails && (
                <div>
                    <h3>Enter Card Details</h3>
                    <input
                        type="text"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder="Card Number"
                        required
                    />
                    <input
                        type="text"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder="Expiry Date (MM/YY)"
                        required
                    />
                    <input
                        type="text"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        placeholder="CVV"
                        required
                    />
                    {cardError && <p style={{ color: 'red' }}>{cardError}</p>}
                    <br />
                    <button onClick={handlePayment}>Pay</button>
                </div>
            )}
        </div>
    );
};

export default TicketPurchasesCRUD;
