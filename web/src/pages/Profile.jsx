import { useState, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { useMutation } from '@tanstack/react-query';
import { usersService } from '../services/apiService';
import { Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, setUser } = useAuthStore();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || user?.firstName || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    password: '',
  });

  const updateMutation = useMutation({
    mutationFn: (data) => usersService.update(data),
    onSuccess: (res) => {
      toast.success('Profile updated successfully!');
      // Update the local Zustand auth store with the new user object
      const updatedUser = res.data?.data || res.data || res;
      if (updatedUser) setUser(updatedUser);
      setFormData(prev => ({ ...prev, password: '' })); // clear password field
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to update profile')
  });

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      return toast.error('Name and Email are required');
    }

    // Split name back into firstName / lastName if backend requires it
    const parts = formData.name.split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');

    const payload = {
      firstName: firstName || formData.name,
      lastName: lastName || ' ',
      email: formData.email,
      avatar: formData.avatar,
    };
    if (formData.password) {
      payload.password = formData.password;
    }

    updateMutation.mutate({ id: user._id, data: payload });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        return toast.error('Image size must be less than 2MB');
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your administrator account details.</p>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending}>
          {updateMutation.isPending ? 'Saving...' : 'Save Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="relative group">
              <img 
                src={formData.avatar || `https://ui-avatars.com/api/?name=${user?.name || user?.firstName || 'Admin'}&background=random&size=150`} 
                alt="Admin Avatar" 
                className="w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 object-cover shadow-sm group-hover:opacity-75 transition-opacity"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-8 h-8" />
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>
            <div>
              <h2 className="text-xl font-bold">{user?.name || user?.firstName}</h2>
              <p className="text-sm text-slate-500">{user?.role === 'admin' ? 'Super Administrator' : 'User'}</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-semibold">
              Active Account
            </span>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-5">
            <h2 className="text-lg font-bold">Personal Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium">Profile Photo URL</label>
                <Input placeholder="https://..." value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} />
              </div>

              <div className="space-y-1 sm:col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-sm font-medium">Update Password <span className="text-slate-400 font-normal">(Leave blank to keep current)</span></label>
                <Input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
