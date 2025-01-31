// pages/api/messages.js
import db from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      // CREATE: Add a new message
      try {
        const { conference_id, sender_name, message } = req.body;
        await db.query(
          'INSERT INTO messages (conference_id, sender_name, message) VALUES (?, ?, ?)',
          [conference_id, sender_name, message]
        );
        res.status(201).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Database error' });
      }
      break;

    case 'GET':
      // READ: Get all messages for a specific conference
      try {
        const { conference_id } = req.query;
        const [messages] = await db.query(
          'SELECT * FROM messages WHERE conference_id = ? AND is_deleted = FALSE ORDER BY timestamp ASC',
          [conference_id]
        );
        res.status(200).json(messages);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Database error' });
      }
      break;

    case 'PUT':
      // UPDATE: Edit an existing message
      try {
        const { id, message } = req.body;
        await db.query(
          'UPDATE messages SET message = ?, is_edited = TRUE WHERE id = ?',
          [message, id]
        );
        res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Database error' });
      }
      break;

    case 'DELETE':
      // DELETE: Soft delete a message
      try {
        const { id } = req.body;
        await db.query(
          'UPDATE messages SET is_deleted = TRUE WHERE id = ?',
          [id]
        );
        res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Database error' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
