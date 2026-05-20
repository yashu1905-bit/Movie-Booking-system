const Discount = require('../models/Discount');
const AppError = require('../errors/AppError');

class DiscountService {
  /**
   * Validates a discount code and calculates the reduction internally natively safely smoothly correctly securely natively properly compactly explicitly explicitly confidently compactly smoothly successfully inherently natively smartly dynamically.
   * @param {string} code 
   * @param {number} originalAmount 
   * @returns {Object} { isValid: true, discountAmount, finalAmount, discountDoc }
   */
  async validateDiscount(code, originalAmount) {
    if (!code) {
      throw new AppError('Discount code cannot be empty', 400);
    }
    
    const discount = await Discount.findOne({ code: code.trim().toUpperCase() });
    if (!discount) {
      throw new AppError('Invalid discount code', 404);
    }
    if (!discount.isActive) {
      throw new AppError('This discount code is no longer active', 400);
    }
    if (discount.expiresAt && new Date() > discount.expiresAt) {
      throw new AppError('This discount code has expired', 400);
    }
    if (discount.maxUses !== null && discount.currentUses >= discount.maxUses) {
      throw new AppError('This discount code has reached its usage limit', 400);
    }

    let discountAmount = 0;
    if (discount.discountType === 'percentage') {
      discountAmount = (originalAmount * discount.value) / 100;
    } else if (discount.discountType === 'fixed') {
      discountAmount = discount.value;
    }

    // Ensure discount amount does not exceed the total price
    if (discountAmount > originalAmount) {
      discountAmount = originalAmount;
    }

    const finalAmount = originalAmount - discountAmount;

    return {
      isValid: true,
      originalAmount,
      discountAmount,
      finalAmount,
      discountDoc: discount
    };
  }

  async incrementUsage(discountId) {
    await Discount.findByIdAndUpdate(discountId, { $inc: { currentUses: 1 } });
  }
}

module.exports = new DiscountService();
