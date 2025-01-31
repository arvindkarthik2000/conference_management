import db from '../../lib/db';

// Next.js API routes for CRUD operations
export default async function handler(req, res) {
    const { method } = req;
  
    switch (method) {
      case 'POST':
        const { type, price, quantity } = req.body;
        const [result] = await db.query(
          'INSERT INTO tickets (type, price, quantity) VALUES (?, ?, ?)',
          [type, price, quantity]
        );
        res.status(201).json({ id: result.insertId, type, price, quantity });
        break;
  
      case 'PUT':
        const { id, type: updateType, price: updatePrice, quantity: updateQuantity } = req.body;
        await db.query(
          'UPDATE tickets SET type = ?, price = ?, quantity = ? WHERE id = ?',
          [updateType, updatePrice, updateQuantity, id]
        );
        res.status(200).json({ id, type: updateType, price: updatePrice, quantity: updateQuantity });
        break;
  
      case 'DELETE':
        const { id: deleteId } = req.body;
        await db.query('DELETE FROM tickets WHERE id = ?', [deleteId]);
        res.status(204).end();
        break;
  
      case 'GET':
        const [rows] = await db.query('SELECT * FROM tickets');
        res.status(200).json(rows);
        break;
  
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }