import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'; // You need to import 'fs'
import path from 'path'; // You need to import 'path'
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
    service: 'gmail', // For Gmail, use Gmail's SMTP server
    auth: {
        user: 'campusconnectmk@gmail.com', // Replace with your email address
        pass: 'cbxk kjgg vlak pcwo',  // Replace with your email password (or app-specific password)
    },
});


// Function to read and parse db.json
function getUsers() {
    const filePath = path.resolve(__dirname, '../db.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(rawData);
    return data.users || [];
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/about', (req, res) => {
    res.send('Welcome to about us page');
});

app.get('/contact', (req, res) => {
    res.send('Welcome to contact us page');
});

app.get('/users', (req, res) => {
    try {
        const users = getUsers();
        const email = users.map(u => u.email);
        res.json(email  );
    } catch (err) {
        res.status(500).json({ error: 'Failed to read users from db.json' });
    }
});

app.get('/sendEmails', async (req, res) => {
    try {
        console.log("HERE");
        const users = getUsers();
        const emails = users.map(u => u.email);

        // Email content
        const mailOptions = {
            from: 'campusconnectmk@gmail.com',  // Sender email address
            to: emails,  // List of recipients
            subject: 'Important Message',  // Subject of the email
            text: 'This is an important message for all users.', // Plain text content
            // html: '<p>This is an important message for all users.</p>' // HTML content (optional)
        };

        // Send email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error while sending emails:', error); // <-- log the error
                return res.status(500).json({ error: 'Failed to send email', details: error.message });
            }
            res.json({ message: 'Emails sent successfully', info });
        });

    } catch (err) {
        res.status(500).json({ error: 'Failed to send emails' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
