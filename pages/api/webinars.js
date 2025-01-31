// pages/api/conferences.js
import db from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;


  try {
    switch (method) {
      case 'GET':
        // Get all conferences
        const [conferences] = await db.query('SELECT * FROM webinars');
        res.status(200).json(conferences);
        break;

      case 'POST':
        // Add a new conference
        const { name, date, location } = req.body;
        const [result] = await db.query(
          'INSERT INTO webinars (name, date, location) VALUES (?, ?, ?)',
          [name, date, location]
        );
        res.status(201).json({ id: result.insertId, name, date, location });
        break;

      case 'PUT':
        // Update an existing conference
        const body = req.body;
        await db.query(
          'UPDATE webinars SET name = ?, date = ?, location = ? WHERE id = ?',
          [body.name,body.date,body.location,body.id]
        );
        res.status(200).json(body);
        break;

      case 'DELETE':
        // Delete a conference
        await db.query('DELETE FROM webinars WHERE id = ?', [id]);
        res.status(200).json({ message: 'Conference deleted' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
