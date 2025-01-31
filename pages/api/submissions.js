import db from '../../lib/db';
import fs from 'fs';
import path from 'path';

const parseMultipartFormData = (data, boundary) => {
  const parts = [];
  const boundaryBuffer = Buffer.from('--' + boundary, 'utf8');
  let start = data.indexOf(boundaryBuffer);

  while (start !== -1) {
    let end = data.indexOf(boundaryBuffer, start + boundaryBuffer.length);
    if (end === -1) break;

    const part = data.slice(start + boundaryBuffer.length, end);
    parts.push(part.toString('utf8'));
    start = end;
  }

  return parts;
};

// Helper function to save the uploaded file
const saveFile = (fileBuffer, filename) => {
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, fileBuffer);
  return `/uploads/${filename}`;
};

// Function to parse the incoming form data
const parseFormData = (req) => {
  return new Promise((resolve, reject) => {
    const boundary = req.headers['content-type'].split('boundary=')[1];
    const chunks = [];

    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const parts = parseMultipartFormData(buffer, boundary);

      const formData = {};
      let fileBuffer;
      
      parts.forEach((part) => {
        if (part.includes('Content-Disposition: form-data; name="file"')) {
          const fileStart = part.indexOf('\r\n\r\n') + 4; // Skip past headers
          fileBuffer = part.slice(fileStart);
        } else if (part.includes('Content-Disposition: form-data')) {
          const nameMatch = part.match(/name="(.*?)"/);
          const valueMatch = part.match(/(?:\r\n\r\n)(.*?)(?:\r\n--)/);
          if (nameMatch && valueMatch) {
            const name = nameMatch[1];
            const value = valueMatch[1];
            formData[name] = value;
          }
        }
      });

      resolve({ formData, fileBuffer });
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
};

export const config = {
  api: { bodyParser: false }, // Disable the default body parser
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const submissions = await db.query('SELECT * FROM submissions');
        res.status(200).json(submissions);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching submissions' });
      }
      break;

    case 'POST':
      try {
        const { formData, fileBuffer } = await parseFormData(req);

        // Check if fileBuffer is available
        if (fileBuffer) {
          const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.pdf`; // Generate unique filename
          const filePath = saveFile(fileBuffer, filename);
          formData.file_path = filePath; // Store the file path in form data
        }

        // Extract the form fields
        const { name, email, title, abstract, subject, file_path } = formData;

        // Insert into the database
        await db.query(
          'INSERT INTO submissions (name, email, title, abstract, file_path, subject) VALUES (?, ?, ?, ?, ?, ?)',
          [name, email, title, abstract, file_path, subject]
        );

        res.status(201).json({ message: 'Submission created' });
      } catch (error) {
        res.status(500).json({ error: 'Error creating submission'+error });
      }
      break;

    case 'PUT':
      try {
        const { id, name, email, title, abstract, subject } = req.body;
        await db.query(
          'UPDATE submissions SET name = ?, email = ?, title = ?, abstract = ?, subject = ? WHERE id = ?',
          [name, email, title, abstract, subject, id]
        );
        res.status(200).json({ message: 'Submission updated' });
      } catch (error) {
        res.status(500).json({ error: 'Error updating submission' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        await db.query('DELETE FROM submissions WHERE id = ?', [id]);
        res.status(200).json({ message: 'Submission deleted' });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting submission' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
