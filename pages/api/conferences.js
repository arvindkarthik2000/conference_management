// pages/api/conferences.js
import db from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;


  try {
    switch (method) {
      case 'GET':
        // Get all conferences
        const [conferences] = await db.query('SELECT * FROM conferences');
        res.status(200).json(conferences);
        break;

      case 'POST':
        // Add a new conference
        const { name, date, location,recorded_link } = req.body;
        const [result] = await db.query(
          'INSERT INTO conferences (name, date, location,recorded_link) VALUES (?, ?, ?,?)',
          [name, date, location,recorded_link]
        );
        res.status(201).json({ id: result.insertId, name, date, location });
        break;

      case 'PUT':
        try{
          const body = req.body;
        await db.query(
          'UPDATE conferences SET name = ?, date = ?, location = ?,recorded_link=? WHERE id = ?',
          [body.name,new Date(body.date),body.location,body.recorded_link,body.id]
        );
        res.status(200).json(body);
        break;

        }
        catch(error){
          res.status(500).json(error);
          break;
  

        }
        // Update an existing conference
        

      case 'DELETE':
        // Delete a conference
        await db.query('DELETE FROM conferences WHERE id = ?', [id]);
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
