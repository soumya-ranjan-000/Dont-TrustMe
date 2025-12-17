const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Simple in-memory mock data
const rooms = [
  { id: 1, name: 'Lake View Suite', price: 249.00, guestsMax: 4, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', description: 'Spacious suite with lake view and king bed.' },
  { id: 2, name: 'Cozy Double', price: 129.00, guestsMax: 2, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', description: 'Cozy room with queen bed and breakfast included.' },
  { id: 3, name: 'Family Room', price: 179.00, guestsMax: 5, image: 'https://images.unsplash.com/photo-1560448078-59f3c9a9b2cd?auto=format&fit=crop&w=1200&q=80', description: 'Large family room with two beds and extra space.' }
];

// in-memory bookings
const bookings = [];

// Return a single room by id
app.get('/api/rooms/:id', (req, res) => {
  const id = Number(req.params.id);
  const room = rooms.find(r => r.id === id);
  if(!room) return res.status(404).json({ error: 'Room not found' });
  res.json(room);
});

app.get('/api/availability', (req, res) => {
  // Expect query params: checkin, checkout, guests
  const { checkin, checkout, guests } = req.query;
  const g = Number(guests) || 1;
  // Basic filter by guest capacity
  const available = rooms.filter(r => r.guestsMax >= g);
  res.json({ query: { checkin, checkout, guests: g }, rooms: available });
});

// Create a booking (mock)
app.post('/api/bookings', (req, res) => {
  const { roomId, checkin, checkout, guests, name, email, phone } = req.body || {};
  if(!roomId || !checkin || !checkout || !name || !email) {
    return res.status(400).json({ error: 'Missing required booking fields' });
  }
  const id = 'BK' + (bookings.length + 1001);
  const room = rooms.find(r => r.id === Number(roomId));
  const booking = {
    id,
    roomId: Number(roomId),
    roomName: room ? room.name : 'Unknown',
    checkin, checkout, guests, name, email, phone, createdAt: new Date().toISOString()
  };
  bookings.push(booking);
  res.json({ success: true, booking });
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
