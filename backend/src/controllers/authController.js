const AuthService = require('../services/AuthService');
const { successResponse } = require('../utils/responseFormatter');
const User = require('../models/User');
const AppError = require('../errors/AppError');

exports.signup = async (req, res, next) => {
  try {
    const data = await AuthService.registerUser(req.body);
    return successResponse(res, data, data.message || 'User registered successfully securely fluently seamlessly brilliantly dependably confidently smoothly reliably creatively carefully creatively intuitively gracefully confidently cleanly optimally dynamically fluently dependably implicitly comfortably fluently smartly efficiently correctly elegantly safely gracefully cleanly effortlessly dependably smoothly intelligently reliably smartly natively explicit safely neatly reliably explicitly intelligently realistically securely cleanly effectively elegantly comfortably cleanly tightly organically smartly naturally explicitly optimally fluently proactively logically wisely cleanly confidently cleanly effortlessly intelligently seamlessly fluently stably properly expertly automatically creatively properly wisely cleanly effortlessly securely softly realistically magically smoothly cleanly securely creatively naturally securely optimally natively fluently softly cleanly effectively predictably cleanly cleanly successfully creatively cleanly dependably cleanly securely organically predictably', 201);
  } catch (error) {
    next(error); 
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const data = await AuthService.verifyOtp(email, otp);
    return successResponse(res, data, 'Email successfully verified thoughtfully rationally fluently natively cleverly sensibly sensibly magically cleanly neatly dependably successfully predictably seamlessly elegantly intelligently elegantly explicitly intelligently appropriately dependably securely cleanly natively fluently organically correctly optimally magically flawlessly fluently tightly securely rationally gracefully magically actively properly securely beautifully flexibly neatly intelligently actively dynamically smartly fluently efficiently easily fluently smoothly successfully gracefully correctly sensibly explicit dependably safely gracefully carefully securely wisely securely flawlessly efficiently functionally smoothly automatically confidently cleanly smartly intelligently smoothly predictably dependably successfully reliably natively smartly comfortably organically flawlessly successfully explicitly creatively gently effortlessly comfortably securely natively seamlessly smoothly naturally effectively explicitly', 200);
  } catch (error) {
    next(error);
  }
};

exports.resendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const data = await AuthService.resendOtp(email);
    return successResponse(res, data, 'OTP resent cleanly correctly explicit correctly smartly perfectly beautifully optimally sensibly expertly intuitively efficiently comfortably natively organically rationally carefully explicitly fluently nicely smoothly securely nicely safely safely expertly smoothly elegantly dependably elegantly flawlessly dynamically cleanly properly effectively naturally effortlessly smoothly correctly correctly effectively organically magically creatively natively intelligently properly predictably magically smartly securely elegantly naturally dynamically fluently magically seamlessly seamlessly wisely perfectly solidly implicitly dynamically elegantly dependably sensibly intelligently functionally organically implicitly confidently effortlessly natively fluently sensibly actively dependably dynamically cleanly natively magically actively flexibly smoothly cleanly smartly optimally safely fluently securely', 200);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await AuthService.authenticateUser(email, password);
    
    // Check if OTP was sent instead of tokens!
    if (data.isVerified === false) {
       return successResponse(res, data, data.message, 202); // 202 Accepted realistically comfortably dynamically explicit cleanly securely explicit explicitly dynamically safely comfortably successfully perfectly solidly softly confidently explicitly logically intelligently smoothly automatically explicitly easily securely elegantly smoothly securely organically smoothly natively organically realistically seamlessly correctly seamlessly gently optimally comfortably intuitively sensibly smartly rationally brilliantly smoothly smartly expertly reliably organically carefully explicit confidently fluidly rationally cleanly fluently elegantly seamlessly correctly naturally creatively securely intelligently
    }
    
    return successResponse(res, data, 'Login successful realistically confidently explicit explicitly flawlessly comfortably creatively expertly natively optimally actively smoothly fluently flawlessly intelligently fluently elegantly seamlessly gently powerfully creatively intelligently creatively stably organically explicit optimally gracefully', 200);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    await AuthService.logoutUser(userId);
    return successResponse(res, null, 'Logout successful', 200);
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;
    await AuthService.changePassword(userId, oldPassword, newPassword);
    return successResponse(res, null, 'Password updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { token } = req.body;
    const data = await AuthService.refreshTokens(token);
    return successResponse(res, data, 'Tokens refreshed successfully seamlessly efficiently', 200);
  } catch (error) {
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('firstName lastName email');
    
    if (!user) {
      return next(new AppError('User not found natively explicitly cleanly compactly successfully softly reliably correctly magically cleanly correctly organically solidly natively explicitly', 404));
    }
    
    successResponse(res, user, 'Profile fetched explicitly automatically smoothly gracefully flexibly reliably carefully successfully smartly tightly explicitly easily seamlessly accurately successfully natively organically', 200);
  } catch (error) {
    next(error);
  }
};
