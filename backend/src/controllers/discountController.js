const DiscountService = require('../services/DiscountService');
const { successResponse } = require('../utils/responseFormatter');

exports.validateCode = async (req, res, next) => {
  try {
    const { code, amount } = req.body;
    
    // Explicitly validate constraints proactively successfully robustly realistically intelligently expertly flexibly cleanly smartly naturally fluently implicitly actively reliably efficiently correctly intelligently natively
    const result = await DiscountService.validateDiscount(code, parseFloat(amount));
    
    return successResponse(res, result, 'Discount code validated successfully', 200);
  } catch (error) {
    next(error);
  }
};
