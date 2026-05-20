import { Search, Eye, XCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsService } from '../services/apiService';

export default function Bookings() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: bookings = [], isLoading: loading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await bookingsService.getAll();
      return res.data || res;
    }
  });

  const cancelMutation = useMutation({
    mutationFn: (id) => bookingsService.update({ id, data: { status: 'cancelled' } }),
    onSuccess: () => {
      toast.success('Booking cancelled successfully');
      queryClient.invalidateQueries(['bookings']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to cancel booking')
  });

  const handleCancel = (id) => {
    if (window.confirm('Cancel this booking? This will set status to Cancelled.')) {
      cancelMutation.mutate(id);
    }
  };

  const handleOpenDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-slate-500 dark:text-slate-400">View and manage customer bookings.</p>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-dark-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-9" placeholder="Search bookings..." />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Show</TableHead>
              <TableHead>Tickets</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-slate-500">No bookings available.</TableCell>
              </TableRow>
            )}
            {bookings.map((booking, index) => (
              <TableRow key={booking._id || index}>
                <TableCell className="font-medium">{booking._id?.slice(-6) || 'N/A'}</TableCell>
                <TableCell>
                  {booking.userId ? `${booking.userId.firstName} ${booking.userId.lastName}` : 'Unknown User'}
                </TableCell>
                <TableCell>
                  {booking.showId?.movie?.title || booking.showId?.movie || 'Unknown Show'}
                </TableCell>
                <TableCell>{booking.seats?.length || booking.ticketCount || booking.tickets || 1}</TableCell>
                <TableCell>${booking.totalAmount || booking.amount || 0}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 flex w-fit rounded-full text-xs font-medium ${
                    booking.status === 'Confirmed' || booking.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {booking.status || 'Confirmed'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDetails(booking)}><Eye className="w-4 h-4" /></Button>
                  {(booking.status !== 'cancelled' && booking.status !== 'Cancelled') && (
                    <Button variant="ghost" size="icon" onClick={() => handleCancel(booking._id)} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Booking Details Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg p-6 animate-in slide-in-from-bottom-4 flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Booking Details</h2>
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  selectedBooking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {selectedBooking.status}
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 gap-y-6">
                <div>
                   <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Booking ID</label>
                   <p className="mt-1 font-mono text-sm">{selectedBooking._id}</p>
                </div>
                <div>
                   <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Date Booked</label>
                   <p className="mt-1 text-sm">{new Date(selectedBooking.createdAt).toLocaleString()}</p>
                </div>

                <div className="col-span-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                   <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Customer Information</label>
                   <div className="flex items-center gap-3 mt-2">
                     <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 p-2 rounded-full">👤</div>
                     <div>
                       <p className="font-medium">{selectedBooking.userId?.firstName} {selectedBooking.userId?.lastName}</p>
                       <p className="text-sm text-slate-500">{selectedBooking.userId?.email}</p>
                     </div>
                   </div>
                </div>

                <div className="col-span-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                   <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Show Details</label>
                   <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">Movie:</span> {selectedBooking.showId?.movie?.title || 'Unknown'}</p>
                      {/* Note: Theater is not fully populated in BookingRepository right now, so we display standard placeholder if missing */}
                      <p><span className="font-medium">Amount Paid:</span> ${selectedBooking.totalAmount.toFixed(2)}</p>
                      <p><span className="font-medium">Payment Status:</span> <span className="capitalize">{selectedBooking.paymentStatus}</span></p>
                   </div>
                </div>

                <div className="col-span-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                   <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Seats</label>
                   <div className="flex flex-wrap gap-2 mt-2">
                      {selectedBooking.seats?.length ? selectedBooking.seats.map((seat, i) => (
                         <div key={i} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium">
                           {seat}
                         </div>
                      )) : (
                         <span className="text-sm text-slate-500">No seats selected</span>
                      )}
                   </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              {selectedBooking.status !== 'cancelled' && (
                <Button variant="outline" className="text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50" onClick={() => {
                  handleCancel(selectedBooking._id);
                  setIsModalOpen(false);
                }}>Cancel Booking</Button>
              )}
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
