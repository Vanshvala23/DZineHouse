const express = require('express');
const app = express();
const dotenv=require('dotenv');
const cors=require('cors');
const {connectDB}=require('./config/db');
const contactRoutes=require('./routes/contactRoutes');
dotenv.config();
// Connect to MongoDB
connectDB();

// ✅ FIX 1: CORS + preflight must be the VERY FIRST middleware — before
// express.json() and before any routes, so OPTIONS requests never reach
// a handler that could reject them with a 4xx.
const corsOptions = {
  origin: (origin, callback) => {
    const allowed = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://d-zine-house.vercel.app',
    ];
    // Allow requests with no origin (mobile apps, curl, Postman, server-to-server)
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', "PATCH", 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // ✅ FIX 2: Some browsers (IE11) choke on 204;
                              // 200 guarantees the preflight is treated as OK.
};

app.use(cors(corsOptions));

// ✅ FIX 3: Explicit OPTIONS handler for every route — must come AFTER
// app.use(cors()) so the CORS headers are already attached before we reply.
app.options('*', cors(corsOptions));

// ✅ FIX 4: Body parsers come AFTER CORS but BEFORE routes.
// In the original code express.json() was registered after the routes,
// so req.body was always undefined → the route validator returned 400.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/contacts', contactRoutes);

app.get('/', (_req, res) => {
  res.send('Welcome to the DzineHouse Contact API');
});

// ✅ FIX 5: Global error handler — catches the CORS origin rejection above
// and anything else that goes wrong, so Express never silently swallows errors.
app.use((err, _req, res, _next) => {
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;