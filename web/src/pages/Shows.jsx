import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { showsService, moviesService, theatersService } from '../services/apiService';

export default function Shows() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShow, setEditingShow] = useState(null);
  const [formData, setFormData] = useState({ movie: '', theater: '', startTime: '', price: 15, totalSeats: 150 });

  const { data: shows = [], isLoading: loadingShows } = useQuery({
    queryKey: ['shows'], queryFn: async () => (await showsService.getAll()).data
  });
  
  const { data: movies = [] } = useQuery({
    queryKey: ['movies'], queryFn: async () => (await moviesService.getAll()).data
  });
  
  const { data: theaters = [] } = useQuery({
    queryKey: ['theaters'], queryFn: async () => (await theatersService.getAll()).data
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => showsService.delete(id),
    onSuccess: () => {
      toast.success('Show deleted successfully');
      queryClient.invalidateQueries(['shows']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed')
  });

  const createMutation = useMutation({
    mutationFn: (data) => showsService.create(data),
    onSuccess: () => {
      toast.success('Show scheduled successfully');
      queryClient.invalidateQueries(['shows']);
      setIsModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Operation failed')
  });

  const updateMutation = useMutation({
    mutationFn: (params) => showsService.update(params),
    onSuccess: () => {
      toast.success('Show updated successfully');
      queryClient.invalidateQueries(['shows']);
      setIsModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Operation failed')
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this show?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleOpenModal = (show = null) => {
    setEditingShow(show);
    if (show) {
      // Format datetime-local string (YYYY-MM-DDTHH:mm)
      let formattedTime = '';
      if (show.startTime) {
        const d = new Date(show.startTime);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        formattedTime = d.toISOString().slice(0, 16);
      }
      setFormData({ 
        movie: show.movie?._id || show.movie || '', 
        theater: show.theater?._id || show.theater || '', 
        startTime: formattedTime, 
        price: show.price || 15, 
        totalSeats: show.totalSeats || 150 
      });
    } else {
      setFormData({ movie: movies[0]?._id || '', theater: theaters[0]?._id || '', startTime: '', price: 15, totalSeats: 150 });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.movie || !formData.theater || !formData.startTime) {
      return toast.error('Movie, Theater, and Start Time are required');
    }
    const payload = { ...formData, startTime: new Date(formData.startTime).toISOString() };
    if (editingShow) {
      updateMutation.mutate({ id: editingShow._id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const getMovieName = (movieField) => {
    if (!movieField) return 'Unknown Movie';
    if (typeof movieField === 'object' && movieField.title) return movieField.title;
    const found = movies.find(m => m._id === movieField);
    return found ? found.title : movieField;
  };

  const getTheaterName = (theaterField) => {
    if (!theaterField) return 'Unknown Theater';
    if (typeof theaterField === 'object' && theaterField.name) return theaterField.name;
    const found = theaters.find(t => t._id === theaterField);
    return found ? found.name : theaterField;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shows</h1>
          <p className="text-slate-500 dark:text-slate-400">Schedule movies to theaters.</p>
        </div>
        <Button onClick={() => handleOpenModal()}><Plus className="w-4 h-4 mr-2" /> Schedule Show</Button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-dark-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-9" placeholder="Search shows..." />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Movie</TableHead>
              <TableHead>Theater</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Ticket Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shows.length === 0 && !loadingShows && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-slate-500">No shows scheduled yet.</TableCell>
              </TableRow>
            )}
            {shows.map((show, index) => (
              <TableRow key={show._id || index}>
                <TableCell className="font-medium">{getMovieName(show.movie)}</TableCell>
                <TableCell>{getTheaterName(show.theater)}</TableCell>
                <TableCell>{show.startTime ? new Date(show.startTime).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{show.startTime ? new Date(show.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</TableCell>
                <TableCell>${show.price}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenModal(show)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(show._id)} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Scheduler Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md p-6 animate-in slide-in-from-bottom-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold">{editingShow ? 'Edit Show' : 'Schedule New Show'}</h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Select Movie</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                  value={formData.movie} 
                  onChange={(e) => setFormData({...formData, movie: e.target.value})}
                >
                  <option value="" disabled>-- Select a Movie --</option>
                  {movies.map(m => (
                    <option key={m._id} value={m._id}>{m.title}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Select Theater</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                  value={formData.theater} 
                  onChange={(e) => setFormData({...formData, theater: e.target.value})}
                >
                  <option value="" disabled>-- Select a Theater --</option>
                  {theaters.map(t => (
                    <option key={t._id} value={t._id}>{t.name} ({t.city})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Start Date & Time</label>
                <Input type="datetime-local" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Ticket Price ($)</label>
                  <Input type="number" min="0" step="0.5" value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Total Seats</label>
                  <Input type="number" min="1" value={formData.totalSeats} onChange={(e) => setFormData({...formData, totalSeats: Math.max(1, Number(e.target.value))})} />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Show</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
