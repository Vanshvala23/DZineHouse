const express = require('express');
const app = express();
const dotenv=require('dotenv');
const cors=require('cors');
const {connectDB}=require('./config/db');
const contactRoutes=require('./routes/contactRoutes');
dotenv.config();
// Connect to MongoDB
connectDB();
// CORS Middleware (FIXED)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://d-zine-house.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ IMPORTANT: handle preflight explicitly
app.options('*', cors());
// Middleware
app.use(express.json());
// Routes
app.use('/api/contacts', contactRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the DeZinHouse Contact API');
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;