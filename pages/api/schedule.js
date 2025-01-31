// File: /pages/api/schedule.js

import db from '../../lib/db';

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET':
            // Retrieve all sessions
            try {
                const [sessions] = await db.query('SELECT * FROM Schedule');
                res.status(200).json(sessions);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching sessions' });
            }
            break;

        case 'POST':
            // Create a new session
            const { title, time, speaker, description } = req.body;
            try {
                const result = await db.query(
                    'INSERT INTO Schedule (title, time, speaker, description) VALUES (?, ?, ?, ?)',
                    [title, time, speaker, description]
                );
                res.status(200).json({ id: result.insertId, title, time, speaker, description });
            } catch (error) {
                res.status(500).json({ error: 'Error creating session' });
            }
            break;

        case 'PUT':
            // Update a session
            const body = req.body;
            try {
                await db.query(
                    'UPDATE Schedule SET title = ?, time = ?, speaker = ?, description = ? WHERE id = ?',
                    [body.title, body.time, body.speaker, body.description, body.id]
                );
                res.status(200).json({ message: 'Session updated' });
            } catch (error) {
                res.status(500).json({ error: 'Error updating session'+error });
            }
            break;

        case 'DELETE':
            // Delete a session
            const { sessionId } = req.body;
            try {
                await db.query('DELETE FROM Schedule WHERE id = ?', [sessionId]);
                res.status(200).json({ message: 'Session deleted' });
            } catch (error) {
                res.status(500).json({ error: 'Error deleting session' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
