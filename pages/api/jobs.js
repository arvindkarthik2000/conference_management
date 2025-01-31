import db  from '../../lib/db';  // Import your database connection

export default async function handler(req, res) {
  const { method } = req;
  
  if (method === 'GET') {
    const [jobs] = await db.query('SELECT * FROM job_posts');
    return res.status(200).json({ jobs });
  }
  
  if (method === 'POST') {
    const { title, description, company, application_email } = req.body;
    await db.query(
      'INSERT INTO job_posts (title, description, company, application_email) VALUES (?, ?, ?, ?)',
      [title, description, company, application_email]
    );
    return res.status(201).json({ message: 'Job added successfully' });
  }
  
  if (method === 'PUT') {
    const { id, title, description, company, application_email } = req.body;
    await db.query(
      'UPDATE job_posts SET title = ?, description = ?, company = ?, application_email = ? WHERE id = ?',
      [title, description, company, application_email, id]
    );
    return res.status(200).json({ message: 'Job updated successfully' });
  }
  
  if (method === 'DELETE') {
    const { id } = req.query;
    await db.query('DELETE FROM job_posts WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Job deleted successfully' });
  }
}
