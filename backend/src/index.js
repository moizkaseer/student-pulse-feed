import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs'; // You need to import 'fs'
import path from 'path'; // You need to import 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

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
        res.json(email);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read users from db.json' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
