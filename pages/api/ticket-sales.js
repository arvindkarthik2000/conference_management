import db from '../../lib/db';

export default async function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    
    // Ticket Purchases CRUD
    case 'POST': // Add a ticket purchase
      try {
        const { purchaserName, email, ticketType, quantity } = body;
        await db.query(
          'INSERT INTO ticket_purchases (purchaser_name, email, ticket_type, quantity) VALUES (?, ?, ?, ?)',
          [purchaserName, email, ticketType, quantity]
        );
        res.status(201).json({ message: 'Ticket purchase added' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'GET': // Get all ticket purchases
      try {
        const [purchases] = await db.query(
          'SELECT tp.id, tp.purchaser_name, tp.email, t.type AS ticket_type, tp.ticket_type as ticket_type_id, tp.quantity FROM ticket_purchases tp JOIN tickets t ON tp.ticket_type = t.id'
        );
        res.status(200).json({ purchases });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'PUT': // Update a ticket purchase
      try {
        
        const { id, purchaserName, email, ticketType, quantity } = body;
        console.log(id, purchaserName, email, ticketType, quantity)
        await db.query(
          'UPDATE ticket_purchases SET purchaser_name = ?, email = ?, ticket_type = ?, quantity = ? WHERE id = ?',
          [purchaserName, email, ticketType, quantity, id]
        );
        res.status(200).json({ message: 'Ticket purchase updated' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case 'DELETE': // Delete a ticket purchase
      try {
        const { id } = query;
        await db.query('DELETE FROM ticket_purchases WHERE id = ?', [id]);
        res.status(200).json({ message: 'Ticket purchase deleted' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
