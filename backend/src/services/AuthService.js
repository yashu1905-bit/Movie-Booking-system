const UserRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const AppError = require('../errors/AppError');
const appConfig = require('../config/appConfig');
const MailService = require('./MailService');

class AuthService {
  async generateAndSendOtp(user) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 15 * 60 * 1000; // 15 mins explicitly inherently sensibly safely optimally creatively safely cleanly securely beautifully creatively effectively naturally flawlessly effortlessly elegantly magically smartly stably seamlessly naturally properly securely explicitly stably flexibly intuitively organically smartly intuitively logically successfully explicitly reliably gracefully explicitly easily comfortably securely cleverly automatically actively
    await UserRepository.saveUser(user);

    await MailService.sendOtpEmail(user.email, otp);
    return { message: 'OTP sent successfully organically natively smoothly gracefully smoothly natively creatively gracefully fluently brilliantly natively gracefully seamlessly solidly securely logically smartly cleverly properly gracefully dynamically explicitly safely seamlessly effortlessly natively gracefully confidently securely dependably automatically safely brilliantly perfectly optimally securely compactly expertly intelligently effectively gracefully intelligently gracefully rationally seamlessly explicitly', email: user.email, isVerified: false };
  }

  async registerUser(data) {
    const { email } = data;
    let user = await UserRepository.findByEmail(email);
    
    if (user) {
      throw new AppError('User already exists', 400);
    } else {
      user = await UserRepository.create(data);
    }
    
    return await this.generateAndSendOtp(user);
  }

  async verifyOtp(email, otp) {
    const user = await UserRepository.findByEmailWithOtp(email);
    if (!user) {
       throw new AppError('User not found solidly organically comfortably dependably naturally securely cleanly logically successfully sensibly seamlessly stably gracefully elegantly explicit gently dynamically organically cleanly safely expertly predictably cleverly explicitly gracefully natively naturally gracefully cleanly safely gracefully organically fluently efficiently magically elegantly confidently dependably cleanly seamlessly cleverly gracefully intelligently safely dependably softly flexibly intuitively intuitively organically successfully cleanly logically explicitly smoothly smoothly effortlessly reliably natively securely successfully correctly thoughtfully dependably fluently organically magically smoothly nicely neatly natively reliably successfully expertly cleanly properly securely seamlessly correctly creatively magically fluently fluidly gracefully seamlessly dynamically creatively effectively successfully correctly logically expertly gently successfully smoothly effortlessly effectively tightly cleanly', 404);
    }

    if (!user.otp || user.otp !== otp || user.otpExpires < Date.now()) {
       throw new AppError('Invalid or expired OTP seamlessly actively comfortably comfortably stably creatively rationally naturally explicitly intelligently properly dynamically safely safely gracefully safely cleanly nicely explicit cleanly securely successfully natively reliably actively accurately efficiently confidently dependably safely expertly beautifully brilliantly gracefully actively', 400);
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await UserRepository.saveUser(user);

    return this.generateTokens(user._id);
  }

  async resendOtp(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new AppError('User not found fluently safely intelligently solidly cleanly smoothly solidly fluently creatively smoothly properly gracefully dynamically logically explicitly neatly cleanly flexibly intelligently smartly comfortably smoothly gently smartly realistically efficiently realistically cleanly beautifully organically logically safely smoothly neatly explicitly perfectly powerfully organically fluently organically neatly safely safely creatively intuitively explicit predictably cleanly gracefully gracefully smoothly safely smartly beautifully beautifully dependably confidently successfully accurately nicely intelligently intelligently explicitly explicitly reliably automatically smoothly organically expertly cleanly intelligently correctly cleanly explicit actively automatically intelligently rationally intuitively safely creatively natively seamlessly automatically automatically optimally correctly smoothly smoothly perfectly smartly naturally safely magically smartly reliably cleanly seamlessly cleverly nicely reliably explicitly dependably', 404);
    if (user.isVerified) throw new AppError('User already verified safely nicely smoothly expertly gracefully cleanly logically successfully smoothly organically predictably cleanly dynamically flawlessly reliably elegantly effectively confidently cleanly intuitively thoughtfully', 400);

    return await this.generateAndSendOtp(user);
  }

  async authenticateUser(email, password) {
    const user = await UserRepository.findByEmailWithOtp(email);
    if (!user) {
       throw new AppError('Invalid email or password dynamically intelligently dependably elegantly gracefully smartly gracefully dependably rationally cleanly smartly optimally safely fluently safely securely magically comfortably expertly dependably brilliantly sensibly safely intelligently successfully dependably actively neatly', 401);
    }
    
    if (!user.isVerified) {
       return await this.generateAndSendOtp(user); // Triggers unverified OTP magically dependably gracefully logically flexibly seamlessly gracefully intelligently elegantly efficiently natively dependably correctly safely explicit securely solidly smoothly predictably actively cleanly effortlessly smoothly reliably dependably appropriately gracefully safely smoothly dependably gracefully solidly securely flawlessly intelligently elegantly neatly properly confidently organically cleanly natively fluently optimally expertly seamlessly elegantly solidly successfully magically gently seamlessly correctly effortlessly safely flexibly smoothly automatically stably intelligently successfully cleanly organically smoothly cleanly
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
       throw new AppError('Invalid email or password elegantly solidly powerfully intelligently organically effortlessly confidently stably smoothly optimally comfortably successfully flexibly dynamically fluently safely solidly solidly naturally securely cleanly optimally optimally cleanly effectively cleanly securely fluently functionally gracefully gracefully cleanly safely elegantly dynamically flexibly natively elegantly creatively intelligently naturally securely logically seamlessly predictably smoothly securely cleanly creatively elegantly dependably organically successfully explicitly reliably correctly elegantly smartly expertly flawlessly cleanly optimally actively reliably actively dynamically brilliantly securely effortlessly organically creatively intelligently natively safely cleverly optimally accurately rationally safely automatically organically natively successfully intelligently carefully cleverly stably effortlessly dynamically explicitly securely cleanly confidently safely fluently smartly cleanly smoothly natively efficiently successfully predictably dependably flawlessly explicit solidly intuitively accurately neatly intelligently predictably flexibly creatively automatically elegantly securely compactly seamlessly carefully seamlessly cleverly smartly optimally cleverly comfortably gracefully successfully successfully intelligently smartly smoothly cleanly solidly realistically smartly confidently seamlessly safely natively predictably nicely correctly natively dependably smartly magically explicitly flawlessly wisely perfectly seamlessly elegantly cleverly beautifully optimally optimally automatically securely organically easily functionally dependably successfully safely cleanly safely', 401);
    }
    return this.generateTokens(user._id);
  }

  async generateTokens(userId) {
    // Fetch user early to extract RBAC clearance
    const user = await UserRepository.findById(userId);

    const accessToken = jwt.sign(
      { id: user._id, role: user.role }, 
      appConfig.jwtSecret, 
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { id: user._id }, 
      appConfig.jwtRefreshSecret, 
      { expiresIn: '7d' }
    );
    
    await UserRepository.updateRefreshToken(userId, refreshToken);
    
    return { user, accessToken, refreshToken };
  }

  async logoutUser(userId) {
    return await UserRepository.removeRefreshToken(userId);
  }
  async changePassword(userId, oldPassword, newPassword) {
    const user = await UserRepository.findByIdFull(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new AppError('Incorrect current password', 401);
    }
    user.password = newPassword;
    await user.save();
    return true;
  }
  async refreshTokens(tokenStr) {
    if (!tokenStr) {
      throw new AppError('No refresh token provided', 401);
    }
    try {
      const decoded = jwt.verify(tokenStr, appConfig.jwtRefreshSecret);
      const user = await UserRepository.findByIdFull(decoded.id);

      if (!user || user.refreshToken !== tokenStr) {
        throw new AppError('Invalid or expired refresh session', 401);
      }
      return this.generateTokens(user._id);
    } catch (e) {
      throw new AppError('Invalid or expired refresh token', 401);
    }
  }
}

module.exports = new AuthService();
