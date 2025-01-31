export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { amount, cardNumber } = req.body;
  
      // Simulate payment processing delay (fake realistic processing)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay
  
      // Simulate payment success/failure based on card number (fake)
      const isPaymentSuccessful = Math.random() > 0.2; // 80% chance of success
  
      // Extra conditions for failure based on the amount (optional)
      if (amount > 1000) {
        return res.status(400).json({
          status: 'Payment Failed: Amount exceeds limit for transactions.',
        });
      }
  
      // Return a more realistic message
      if (isPaymentSuccessful) {
        return res.status(200).json({
          status: 'Payment Successful! Thank you for your purchase.',
        });
      } else {
        return res.status(400).json({
          status: 'Payment Failed: Insufficient funds or invalid card details.',
        });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  