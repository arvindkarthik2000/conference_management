// pages/api/chat/getMessages.js
import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { senderId, receiverId } = req.query;

    try {
      const [messages] = await db.query(`
        SELECT * 
        FROM chats
        WHERE 
          (sender_id = ? AND receiver_id = ?) OR 
          (sender_id = ? AND receiver_id = ?)
        ORDER BY created_at ASC
      `, [senderId, receiverId, receiverId, senderId]);

      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
