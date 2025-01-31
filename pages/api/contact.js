// File: /pages/api/schedule.js

import db from "../../lib/db";
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      const { fullName, email, subject, message } = req.body;
      const [result] = await db.query(
        "INSERT INTO contacts (fullName, email, subject, message) VALUES (?, ?, ?, ?)",
        [fullName, email, subject, message]
      );
      res
        .status(201)
        .json({ id: result.insertId, fullName, email, subject, message });
      break;

    case "PUT":
      const {
        id,
        fullName: updateName,
        email: updateEmail,
        subject: updateSubject,
        message: updateMessage,
      } = req.body;
      await db.query(
        "UPDATE contacts SET fullName = ?, email = ?, subject = ?, message = ? WHERE id = ?",
        [updateName, updateEmail, updateSubject, updateMessage, id]
      );
      res.status(200).json({
        id,
        fullName: updateName,
        email: updateEmail,
        subject: updateSubject,
        message: updateMessage,
      });
      break;

    case "DELETE":
      const { id: deleteId } = req.body;
      await db.query("DELETE FROM contacts WHERE id = ?", [deleteId]);
      res.status(204).end();
      break;

    case "GET":
      const [rows] = await db.query("SELECT * FROM contacts");
      res.status(200).json(rows);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
