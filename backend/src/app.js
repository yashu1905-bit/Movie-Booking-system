const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./errors/AppError');

// API Routes
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const theaterRoutes = require('./routes/theaters');
const showRoutes = require('./routes/shows');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payments');
const discountRoutes = require('./routes/discountRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const languageRoutes = require('./routes/languageRoutes');
const userRoutes = require('./routes/users');
const analyticsRoutes = require('./routes/analytics');
const settingsRoutes = require('./routes/settingsRoutes');

const app = express();

// Global Middleware
app.use(helmet());
app.use(compression());
app.use(cors());

// Body parser
app.use(express.json({ limit: '10kb' }));

// Prevent parameter pollution
app.use(hpp());

// General Rate Limiting
const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Main Router Mounting Framework
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/theaters', theaterRoutes);
app.use('/api/shows', showRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);

const appConfig = require('./config/appConfig');

app.get('/api/config', (req, res) => {
  res.json({
    appName: appConfig.appName
  });
});

// Catch-all generic 404 handler for missing endpoints
app.use((req, res, next) => {
  next(new AppError(`Route not found: [${req.method}] ${req.originalUrl}`, 404));
});

// Centralized Error Handling Middleware (must exist at absolute bottom)
app.use(errorHandler);

module.exports = app;
