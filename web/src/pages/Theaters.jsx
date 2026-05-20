import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { theatersService } from '../services/apiService';

export default function Theaters() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTheater, setEditingTheater] = useState(null);
  const [formData, setFormData] = useState({ name: '', location: '', city: '', screens: 1 });

  const { data: theaters = [], isLoading: loading } = useQuery({
    queryKey: ['theaters'],
    queryFn: async () => {
      const res = await theatersService.getAll();
      return res.data || res;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => theatersService.delete(id),
    onSuccess: () => {
      toast.success('Theater deleted successfully');
      queryClient.invalidateQueries(['theaters']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed')
  });

  const createMutation = useMutation({
    mutationFn: (data) => theatersService.create(data),
    onSuccess: () => {
      toast.success('Theater created');
      queryClient.invalidateQueries(['theaters']);
      setIsModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Operation failed')
  });

  const updateMutation = useMutation({
    mutationFn: (params) => theatersService.update(params),
    onSuccess: () => {
      toast.success('Theater updated successfully');
      queryClient.invalidateQueries(['theaters']);
      setIsModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Operation failed')
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this theater?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleOpenModal = (theater = null) => {
    setEditingTheater(theater);
    if (theater) {
      setFormData({ name: theater.name || '', location: theater.location || '', city: theater.city || '', screens: theater.screens || 1 });
    } else {
      setFormData({ name: '', location: '', city: '', screens: 1 });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.city || !formData.location) {
      return toast.error('Name, City, and Location are required');
    }
    const payload = { ...formData, screens: Number(formData.screens) };
    if (editingTheater) {
      updateMutation.mutate({ id: editingTheater._id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Theaters</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage theater locations and screens.</p>
        </div>
        <Button onClick={() => handleOpenModal()}><Plus className="w-4 h-4 mr-2" /> Add Theater</Button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-dark-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-9" placeholder="Search theaters..." />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Screens</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {theaters.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-slate-500">No theaters found. Add one!</TableCell>
              </TableRow>
            )}
            {theaters.map((theater, index) => (
              <TableRow key={theater._id || index}>
                <TableCell className="font-medium">{theater.name}</TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">{theater.location}</TableCell>
                <TableCell>{theater.screens || 1}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 flex w-fit rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400`}>
                    Active
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenModal(theater)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(theater._id)} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Theater Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md p-6 animate-in slide-in-from-bottom-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold">{editingTheater ? 'Edit Theater' : 'Add New Theater'}</h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Theater Brand / Name</label>
                <Input placeholder="e.g. AMC Dolby Cinema" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">City</label>
                <Input placeholder="e.g. Los Angeles" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Street Location</label>
                <Input placeholder="e.g. 123 Hollywood Blvd" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Number of Screens</label>
                <Input type="number" min="1" value={formData.screens} onChange={(e) => setFormData({...formData, screens: Math.max(1, Number(e.target.value))})} />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingTheater ? 'Update' : 'Save'} Theater</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
