require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

const authMiddleware = require('./middleware/authMiddleware');

app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to dashboard' });
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});