import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(process.env.EMAIL_USER)
        const { recipient, subject, message } = req.body;

        // Create reusable transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your Gmail address
                pass: process.env.EMAIL_PASS, // Your Gmail app password or regular password
            },
        });

        // Set up email data
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: recipient, // List of recipients
            subject: subject, // Subject line
            text: message, // Plain text body
        };

        try {
            // Send email
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to send email', details: error });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
