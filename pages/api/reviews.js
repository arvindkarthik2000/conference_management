import db from '../../lib/db';

// Main handler function for CRUD operations
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Fetch all reviews
      try {
        
        const [reviews] = await db.query('SELECT * FROM peer_reviews');
        console.log(reviews)
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching reviews' });
      }
      break;

    case 'POST': // Create a new review
      try {
        const { paperTitle, reviewerName, reviewerExpertise, feedback, score } = req.body;
        await db.query(
          'INSERT INTO peer_reviews (paper_title, reviewer_name, reviewer_expertise, feedback, score) VALUES (?, ?, ?, ?, ?)',
          [paperTitle, reviewerName, reviewerExpertise, feedback, score]
        );
        res.status(201).json({ message: 'Review submitted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error submitting review'+error });
      }
      break;

    case 'PUT': // Update an existing review
      try {
        const { id, reviewerName, reviewerExpertise, feedback, score } = req.body;
        await db.query(
          'UPDATE peer_reviews SET reviewer_name= ?, reviewer_expertise = ?, feedback = ?, score = ? WHERE id = ?',
          [reviewerName, reviewerExpertise, feedback, score, id]
        );
        res.status(200).json({ message: 'Review updated successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error updating review' });
      }
      break;

    case 'DELETE': // Delete a review
      try {
        const { id } = req.query;
        await db.query('DELETE FROM peer_reviews WHERE id = ?', [id]);
        res.status(200).json({ message: 'Review deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting review' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
