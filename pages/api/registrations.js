import db from '../../lib/db';

// Main handler function for CRUD operations
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Fetch all registrations
      try {
        const registrations = await db.query('SELECT * FROM registrations');
        res.status(200).json(registrations);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching registrations' });
      }
      break;

    case 'POST': // Create a new registration
      try {
        const { fullName, email, ticketType } = req.body;
        // Check if the email already exists
        const existingRegistration = await db.query('SELECT * FROM registrations WHERE email = ?', [email]);
        if (existingRegistration.length > 0) {
          return res.status(400).json({ error: 'Email already registered' });
        }
        await db.query(
          'INSERT INTO registrations (full_name, email, ticket_type) VALUES (?, ?, ?)',
          [fullName, email, ticketType]
        );
        res.status(201).json({ message: 'Registration successful' });
      } catch (error) {
        res.status(500).json({ error: 'Error registering attendee' });
      }
      break;

    case 'PUT': // Update an existing registration
      try {
        const { id, fullName, email, ticketType } = req.body;
        await db.query(
          'UPDATE registrations SET full_name = ?, email = ?, ticket_type = ? WHERE id = ?',
          [fullName, email, ticketType, id]
        );
        res.status(200).json({ message: 'Registration updated successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error updating registration' });
      }
      break;

    case 'DELETE': // Delete a registration
      try {
        const { id } = req.query;
        await db.query('DELETE FROM registrations WHERE id = ?', [id]);
        res.status(200).json({ message: 'Registration deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting registration' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
