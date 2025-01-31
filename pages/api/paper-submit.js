import multer from 'multer';

import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

import db from '@/lib/db';

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads', // Ensure this directory exists
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export const config = {
  api: {
    bodyParser: false, // Disables Next.js default body parsing
  },
};

// Wrapper to handle multer middleware with Next.js
const uploadMiddleware = (req, res, next) =>
  upload.single('file')(req, {}, (err) => {
    if (err) return res.status(500).json({ error: 'File upload error' });
    next();
  });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await uploadMiddleware(req, res, async () => {
      const { name, email, title, abstract, subject } = req.body;
      const filePath = req.file ? `/uploads/${req.file.filename}` : null;

      try {
        

        const [result] = await db.query(
          `INSERT INTO submissions (name, email, title, abstract, subject, file_path) VALUES (?, ?, ?, ?, ?, ?)`,
          [name, email, title, abstract, subject, filePath]
        );

        
        res.status(200).json({ message: 'Submission successful!' });
      } catch (error) {
        res.status(500).json({ error: 'Database error' });
      }
    });
  } else if (req.method === 'GET') {
    // Fetch submissions
    try {
      
      const [rows] = await db.query('SELECT * FROM submissions');
      
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      
      const [rows] = await db.query(
        `SELECT file_path FROM submissions WHERE id = ?`,
        [id]
      );

      if (rows.length && rows[0].file_path) {
        fs.unlinkSync(path.join(process.cwd(), 'public', rows[0].file_path));
      }

      await db.query(`DELETE FROM submissions WHERE id = ?`, [id]);
      
      res.status(200).json({ message: 'Submission deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
