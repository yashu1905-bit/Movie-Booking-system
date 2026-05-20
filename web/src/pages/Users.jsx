import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/Table';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../services/apiService';

export default function Users() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'user' });

  const { data: users = [], isLoading: loading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await usersService.getAll();
      return res.data || res;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => usersService.delete(id),
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries(['users']);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Delete failed')
  });

  const createMutation = useMutation({
    mutationFn: (data) => usersService.create(data),
    onSuccess: () => {
      toast.success('User created successfully');
      queryClient.invalidateQueries(['users']);
      setIsModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Operation failed')
  });

  const updateMutation = useMutation({
    mutationFn: (params) => usersService.update(params),
    onSuccess: () => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries(['users']);
      setIsModalOpen(false);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Operation failed')
  });

  const handleDelete = (id) => {
    if (window.confirm('Delete this user?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      setFormData({ firstName: user.firstName || user.name || '', lastName: user.lastName || '', email: user.email || '', password: '', role: user.role || 'user' });
    } else {
      setFormData({ firstName: '', lastName: '', email: '', password: '', role: 'user' });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.firstName || !formData.email) {
      return toast.error('First name and email are required');
    }
    
    if (editingUser) {
       const payload = { ...formData };
       if (!payload.password) delete payload.password;
       updateMutation.mutate({ id: editingUser._id, data: payload });
    } else {
       if (!formData.password) return toast.error('Password is required for new user');
       const payload = { ...formData, phone: '0000000000' };
       createMutation.mutate(payload);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage all registered users and admins.</p>
        </div>
        <Button onClick={() => handleOpenModal()}><Plus className="w-4 h-4 mr-2" /> Add User</Button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 dark:border-dark-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input className="pl-9" placeholder="Search users by name or email..." />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-slate-500">No users found.</TableCell>
              </TableRow>
            )}
            {users.map((user, index) => (
              <TableRow key={user._id || index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${user.firstName || user.name || 'User'}&background=random`} 
                      className="w-8 h-8 rounded-full" 
                      alt="" 
                    />
                    {user.firstName || user.name || 'Anonymous'}
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2.5 py-1 flex w-fit rounded-full text-xs font-medium ${user.role === 'Admin' || user.role === 'admin' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                    {user.role || 'user'}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500 dark:text-slate-400">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenModal(user)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md p-6 animate-in slide-in-from-bottom-4 flex flex-col gap-4">
            <h2 className="text-xl font-bold">{editingUser ? 'Edit User' : 'Add New User'}</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">First Name</label>
                  <Input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="John" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="john@example.com" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">{editingUser ? 'Password (leave blank to keep)' : 'Password'}</label>
                <Input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Role</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50"
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save User</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
