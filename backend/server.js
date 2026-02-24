const express = require('express');
const app = express();
const dotenv=require('dotenv');
const {connectDB}=require('./config/db');
const contactRoutes=require('./routes/contactRoutes');
dotenv.config();
// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());
// Routes
app.use('/api/contacts', contactRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
