// pages/api/chat/sendMessage.js
import db from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { senderId, receiverId, message } = req.body;

    try {
      console.log(req.body)  
      await db.query(`
        INSERT INTO chats (sender_id, receiver_id, message)
        VALUES (?, ?, ?)
      `, [senderId, receiverId, message]);

      res.status(201).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
