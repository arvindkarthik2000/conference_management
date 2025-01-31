import  db  from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    // Fetch all mentors with their availability
    const [mentors] = await db.query(`
      SELECT m.id, m.name, m.area_of_expertise, ma.available_date, ma.available_time
      FROM mentors m
      LEFT JOIN mentor_availability ma ON m.id = ma.mentor_id
      ORDER BY m.id, ma.available_date, ma.available_time
    `);
    const mentorMap = mentors.reduce((acc, row) => {
      const { id, name, area_of_expertise, available_date, available_time } = row;
      if (!acc[id]) {
        acc[id] = { id, name, area_of_expertise, availability: [] };
      }
      if (available_date && available_time) {
        acc[id].availability.push({ date: available_date, time: available_time });
      }
      return acc;
    }, {});
    return res.status(200).json(Object.values(mentorMap));
  }

  if (method === 'POST') {
    // Add a new mentor and their availability
    const { name, area_of_expertise, availability } = req.body;
    const [mentorResult] = await db.query(
      'INSERT INTO mentors (name, area_of_expertise) VALUES (?, ?)',
      [name, area_of_expertise]
    );
    const mentorId = mentorResult.insertId;
    
    if (availability && availability.length > 0) {
      const values = availability.map(({ date, time }) => [mentorId, date, time]);
      await db.query(
        'INSERT INTO mentor_availability (mentor_id, available_date, available_time) VALUES ?',
        [values]
      );
    }
    return res.status(201).json({ message: 'Mentor added successfully' });
  }

  if (method === 'PUT') {
    // Update a mentor's details or availability
    const { id, name, area_of_expertise, availability } = req.body;
    await db.query(
      'UPDATE mentors SET name = ?, area_of_expertise = ? WHERE id = ?',
      [name, area_of_expertise, id]
    );

    if (availability) {
      await db.query('DELETE FROM mentor_availability WHERE mentor_id = ?', [id]);
      const values = availability.map(({ date, time }) => [id, date, time]);
      await db.query(
        'INSERT INTO mentor_availability (mentor_id, available_date, available_time) VALUES ?',
        [values]
      );
    }
    return res.status(200).json({ message: 'Mentor updated successfully' });
  }

  if (method === 'DELETE') {
    // Delete a mentor and their availability
    const { id } = req.query;
    await db.query('DELETE FROM mentors WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Mentor deleted successfully' });
  }
}
