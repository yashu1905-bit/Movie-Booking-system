import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { moviesService } from '../services/apiService';

export default function Movies() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({ 
    title: '', description: '', duration: '120 min', rating: 'PG-13', 
    posterUrl: '', bannerUrl: '', language: 'English', genre: 'Action' 
  });

  const { data: movies = [], isLoading: loading } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await moviesService.getAll();
      return res.data || res;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => moviesService.delete(id),
    onSuccess: () => {
      toast.success('Movie deleted successfully');
      queryClient.invalidateQueries(['movies']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed')
  });

  const createMutation = useMutation({
    mutationFn: (data) => moviesService.create(data),
    onSuccess: () => {
      toast.success('Movie created');
      queryClient.invalidateQueries(['movies']);
      setIsModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Operation failed')
  });

  const updateMutation = useMutation({
    mutationFn: (params) => moviesService.update(params),
    onSuccess: () => {
      toast.success('Movie updated successfully');
      queryClient.invalidateQueries(['movies']);
      setIsModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Operation failed')
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this movie?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleOpenModal = (movie = null) => {
    setEditingMovie(movie);
    if (movie) {
      setFormData({ 
        title: movie.title || '', description: movie.description || '', 
        duration: movie.duration || '', rating: movie.rating || 'PG-13', 
        posterUrl: movie.posterUrl || '', bannerUrl: movie.bannerUrl || '', 
        language: movie.language || '', genre: movie.genre || '' 
      });
    } else {
      setFormData({ 
        title: '', description: '', duration: '120 min', rating: 'PG-13', 
        posterUrl: '', bannerUrl: '', language: 'English', genre: 'Action' 
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.duration || !formData.genre) {
      return toast.error('Title, Duration, and Genre are required');
    }
    if (editingMovie) {
      updateMutation.mutate({ id: editingMovie._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Movies</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage all movies in your theaters.</p>
        </div>
        <Button onClick={() => handleOpenModal()}><Plus className="w-4 h-4 mr-2" /> Add Movie</Button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-dark-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-9" placeholder="Search movies..." />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-slate-500">No movies found. Add one!</TableCell>
              </TableRow>
            )}
            {movies.map((movie, index) => (
              <TableRow key={movie._id || index}>
                <TableCell className="font-medium">{movie.title}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.duration}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 flex w-fit rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`}>
                    Now Showing
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenModal(movie)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(movie._id)} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Movie Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-2xl p-6 animate-in slide-in-from-bottom-4 flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Movie Title</label>
                <Input placeholder="e.g. Inception" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Genre</label>
                <Input placeholder="e.g. Sci-Fi, Action" value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Duration</label>
                <Input placeholder="e.g. 148 min" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Age Rating</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                  value={formData.rating} 
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                >
                  <option value="G">G</option>
                  <option value="PG">PG</option>
                  <option value="PG-13">PG-13</option>
                  <option value="R">R</option>
                  <option value="NC-17">NC-17</option>
                </select>
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                  placeholder="Movie plot summary..." 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Poster URL</label>
                <Input placeholder="https://..." value={formData.posterUrl} onChange={(e) => setFormData({...formData, posterUrl: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Banner URL</label>
                <Input placeholder="https://..." value={formData.bannerUrl} onChange={(e) => setFormData({...formData, bannerUrl: e.target.value})} />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-medium">Language</label>
                <Input placeholder="e.g. English, Spanish" value={formData.language} onChange={(e) => setFormData({...formData, language: e.target.value})} />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingMovie ? 'Update Movie' : 'Save Movie'}</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
