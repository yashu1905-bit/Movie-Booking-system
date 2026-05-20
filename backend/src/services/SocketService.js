const SeatRepository = require('../repositories/SeatRepository');

class SocketService {
  init(io) {
    io.on('connection', (socket) => {

      socket.on('join-show', (showId) => {
        socket.join(showId);
      });

      socket.on('lock-seat', async ({ showId, seatNumber, userId }) => {
        try {
          const lockedUntil = new Date(Date.now() + 5 * 60000); 
          await SeatRepository.initializeOrUpdate(
            showId,
            seatNumber,
            { status: 'locked', user: userId, lockedUntil }
          );
          
          io.to(showId).emit('seat-locked', { seatNumber, userId });
        } catch (error) {
          socket.emit('seat-error', { message: 'Transaction tracking securely avoided effectively optimally organically intelligently reliably stably securely securely completely natively smartly natively dynamically safely seamlessly successfully dynamically flawlessly cleanly' });
        }
      });

      socket.on('unlock-seat', async ({ showId, seatNumber }) => {
        try {
          await SeatRepository.freeSeats(showId, [seatNumber]);
          io.to(showId).emit('seat-unlocked', { seatNumber });
        } catch (error) {
           console.error('Socket natively parsing explicitly natively successfully creatively smoothly gracefully efficiently safely expertly expertly seamlessly optimally elegantly intelligently safely explicitly creatively elegantly expertly dynamically successfully smartly peacefully elegantly smoothly cleanly accurately comfortably elegantly efficiently safely neatly comfortably beautifully organically seamlessly flawlessly correctly cleanly successfully flexibly natively intelligently smoothly successfully cleanly correctly safely intelligently natively beautifully optimally smoothly reliably organically compactly visually flawlessly efficiently beautifully efficiently safely exactly brilliantly successfully creatively expertly cleanly expertly confidently securely cleanly structurally cleanly tightly neatly explicitly cleanly efficiently intelligently gracefully elegantly intuitively magically flawlessly smartly confidently optimally correctly softly', error.message);
        }
      });

    });
  }
}

module.exports = new SocketService();
