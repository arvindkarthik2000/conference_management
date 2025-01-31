import  db  from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    // Fetch all scheduled sessions with mentor details
    const [sessions] = await db.query(`
      SELECT s.id, s.user_name, s.user_email, s.scheduled_date, s.scheduled_time,
             m.name AS mentor_name, m.area_of_expertise
      FROM sessions s
      JOIN mentors m ON s.mentor_id = m.id
      ORDER BY s.scheduled_date, s.scheduled_time
    `);
    return res.status(200).json(sessions);
  }

  if (method === 'POST') {
    // Schedule a new session
    const { mentor_id, user_name, user_email, scheduled_date, scheduled_time } = req.body;

    // // Check if the selected date and time match an available slot
    // const [availability] = await db.query(
    //   `SELECT 1 FROM mentor_availability WHERE mentor_id = ? AND available_date = ? AND available_time = ?`,
    //   [mentor_id, scheduled_date, scheduled_time]
    // );
    
    // if (availability.length === 0) {
    //   return res.status(400).json({ error: 'Selected date and time are not available' });
    // }

    try {
      await db.query(
        `INSERT INTO sessions (mentor_id, user_name, user_email, scheduled_date, scheduled_time)
         VALUES (?, ?, ?, ?, ?)`,
        [mentor_id, user_name, user_email, new Date(scheduled_date), scheduled_time]
      );
      return res.status(201).json({ message: 'Session scheduled successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error scheduling session'+error });
    }
  }

  if (method === 'DELETE') {
    // Cancel a scheduled session
    const { id } = req.body;
    console.log(id)
    await db.query('DELETE FROM sessions WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Session canceled successfully' });
  }
}
