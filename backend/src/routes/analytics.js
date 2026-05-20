const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { successResponse } = require('../utils/responseFormatter');

const User = require('../models/User');
const Movie = require('../models/Movie');
const Theater = require('../models/Theater');
const Show = require('../models/Show');
const Booking = require('../models/Booking');

router.get('/', auth, admin, async (req, res, next) => {
  try {
    const [usersCount, moviesCount, theatersCount, showsCount, bookingsCount] = await Promise.all([
      User.countDocuments(),
      Movie.countDocuments(),
      Theater.countDocuments(),
      Show.countDocuments(),
      Booking.countDocuments()
    ]);

    const currentYear = new Date().getFullYear();
    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          status: 'confirmed',
          $or: [
            { createdAt: { $gte: new Date(`${currentYear}-01-01`), $lte: new Date(`${currentYear}-12-31`) } }
          ]
        }
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      }
    ]);

    const monthsMap = { 1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec' };
    
    let totalRevenue = 0;
    const earningReports = Array.from({ length: 12 }, (_, i) => {
      const monthData = monthlyRevenue.find(m => m._id === i + 1);
      const val = monthData ? monthData.total : 0;
      totalRevenue += val;
      return { m: monthsMap[i + 1], h: val, count: monthData ? monthData.count : 0 };
    });

    const maxRevenue = Math.max(...earningReports.map(e => e.h), 1);
    const normalizedReports = earningReports.map(e => ({
      m: e.m,
      h: Math.round((e.h / maxRevenue) * 100) || 5, // minimum 5% height for visibility
      rawValue: e.h,
      count: e.count,
      active: e.h === maxRevenue && maxRevenue > 1
    }));

    return successResponse(res, {
      users: usersCount,
      movies: moviesCount,
      theaters: theatersCount,
      shows: showsCount,
      bookings: bookingsCount,
      totalRevenue,
      earningReports: normalizedReports
    }, 'Analytics retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
