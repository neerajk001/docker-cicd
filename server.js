const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory store for users (sample data + runtime additions)
let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com' },
];

// Track server start time for uptime
const startTime = Date.now();

// --- Routes ---

// GET / - Simple welcome message
app.get('/', (req, res) => {
  res.send('Server is running');
});

// GET /health - Server status, uptime, and timestamp
app.get('/health', (req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  res.json({
    status: 'ok',
    uptime: `${uptimeSeconds} seconds`,
    timestamp: new Date().toISOString(),
  });
});

// GET /users - List all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Get a specific user
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST /users - Add a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: nextId, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE /users/:id - Remove a user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  users.splice(index, 1);
  res.status(204).send();
});

// --- Start server ---
app.listen(PORT, () => {
  console.log('----------------------------------------');
  console.log('  Express server started successfully');
  console.log('----------------------------------------');
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Health:  http://localhost:${PORT}/health`);
  console.log(`  Users:   http://localhost:${PORT}/users`);
  console.log('----------------------------------------');
});
