import { useState } from 'react';

export default function PaymentPage() {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();

    // Simple validation of credit card number (fake validation)
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      setPaymentStatus('Invalid card number. Please enter a 16-digit card number.');
      return;
    }

    setIsProcessing(true);
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, cardNumber }),
    });

    const result = await response.json();
    setIsProcessing(false);
    setPaymentStatus(result.status);
  };

  return (
    <div>
      <h1>Fake Payment Gateway</h1>
      <form onSubmit={handlePayment}>
        <label>
          Amount: 
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </label>
        <br />
        <label>
          Credit Card Number: 
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            maxLength="16"
            minLength="16"
          />
        </label>
        <br />
        <button type="submit" disabled={isProcessing}>Pay Now</button>
      </form>

      {paymentStatus && <p>{paymentStatus}</p>}
      {isProcessing && <p>Processing payment, please wait...</p>}
    </div>
  );
}
