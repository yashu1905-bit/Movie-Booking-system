import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useSettingsStore } from '../store/settingsStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appSettingsService } from '../services/apiService';
import toast from 'react-hot-toast';

export default function Settings() {
  const store = useSettingsStore();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    platformName: '',
    logoUrl: '',
    supportEmail: '',
    contactPhone: '',
    stripePublicKey: '',
    stripeSecretKey: '',
    stripeEnabled: true,
    razorpayKeyId: '',
    razorpayKeySecret: '',
    razorpayEnabled: false,
  });

  const { data: dbSettings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await appSettingsService.getSettings();
      return res.data?.data || res.data;
    }
  });

  useEffect(() => {
    if (dbSettings) {
      // eslint-disable-next-line
      setFormData({
        platformName: dbSettings.platformName || '',
        logoUrl: dbSettings.logoUrl || '',
        supportEmail: dbSettings.supportEmail || '',
        contactPhone: dbSettings.contactPhone || '',
        stripePublicKey: dbSettings.stripePublicKey || '',
        stripeSecretKey: dbSettings.stripeSecretKey || '',
        stripeEnabled: dbSettings.stripeEnabled ?? true,
        razorpayKeyId: dbSettings.razorpayKeyId || '',
        razorpayKeySecret: dbSettings.razorpayKeySecret || '',
        razorpayEnabled: dbSettings.razorpayEnabled ?? false,
      });
      // Optionally sync fundamental keys to local store if heavily relied upon across the app
      store.updateSettings({
        platformName: dbSettings.platformName,
        logoUrl: dbSettings.logoUrl
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbSettings]);

  const updateMutation = useMutation({
    mutationFn: (data) => appSettingsService.updateSettings(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['settings']);
      toast.success('Database and Gateway configurations updated successfully!');
      const updated = res.data?.data || res.data;
      if (updated) {
        store.updateSettings({ platformName: updated.platformName, logoUrl: updated.logoUrl });
      }
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update settings');
    }
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleClearCache = () => {
    if (window.confirm('Are you strictly sure you want to clear the entire React Query cache? This will temporarily slow down the dashboard on next load.')) {
      queryClient.clear();
      toast.success('Platform analytics and data cache cleared successfully.');
    }
  };

  const handleFactoryReset = () => {
    if (window.confirm('CRITICAL DANGER: Are you absolutely certain you want to trigger a System Factory Reset? This action cannot be undone and you will be immediately logged out.')) {
      localStorage.removeItem('app-settings');
      localStorage.removeItem('auth-storage');
      window.location.href = '/login'; 
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your application preferences and system configurations.</p>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending || isLoading}>
          {updateMutation.isPending ? 'Saving to Database...' : 'Save Changes'}
        </Button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Synchronizing configurations from database...</div>
      ) : (

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6 space-y-5">
            <h2 className="text-lg font-bold">General Information</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium">Platform Name</label>
                <Input value={formData.platformName} onChange={(e) => setFormData({...formData, platformName: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Custom Logo URL (Optional)</label>
                <Input placeholder="https://..." value={formData.logoUrl} onChange={(e) => setFormData({...formData, logoUrl: e.target.value})} />
                <p className="text-xs text-slate-500 mt-1">Leave empty to use the default geometric V icon.</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Support Email</label>
                <Input type="email" value={formData.supportEmail} onChange={(e) => setFormData({...formData, supportEmail: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Contact Phone</label>
                <Input value={formData.contactPhone} onChange={(e) => setFormData({...formData, contactPhone: e.target.value})} />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-5">
            <h2 className="text-lg font-bold">Payment Gateway Integrations</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Stripe Payment Gateway</label>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, stripeEnabled: !formData.stripeEnabled})}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none transition-colors duration-200 ${formData.stripeEnabled ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 mx-auto ${formData.stripeEnabled ? 'translate-x-[9px]' : '-translate-x-[9px]'}`} />
                  </button>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Publishable Key</label>
                    <Input 
                      type="text" 
                      value={formData.stripePublicKey} 
                      onChange={(e) => setFormData({...formData, stripePublicKey: e.target.value})}
                      placeholder="pk_test_..."
                      disabled={!formData.stripeEnabled} 
                      className={!formData.stripeEnabled ? 'opacity-50 select-none' : ''} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Secret Key</label>
                    <Input 
                      type="password" 
                      value={formData.stripeSecretKey} 
                      onChange={(e) => setFormData({...formData, stripeSecretKey: e.target.value})}
                      placeholder="sk_test_..."
                      disabled={!formData.stripeEnabled} 
                      className={!formData.stripeEnabled ? 'opacity-50 select-none' : ''} 
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800 my-4"></div>
              <div className="space-y-1">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">RazorPay Payment Gateway</label>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, razorpayEnabled: !formData.razorpayEnabled})}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none transition-colors duration-200 ${formData.razorpayEnabled ? 'bg-primary-500' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 mx-auto ${formData.razorpayEnabled ? 'translate-x-[9px]' : '-translate-x-[9px]'}`} />
                  </button>
                </div>
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Key ID</label>
                    <Input 
                      type="text" 
                      value={formData.razorpayKeyId} 
                      onChange={(e) => setFormData({...formData, razorpayKeyId: e.target.value})}
                      placeholder="rzp_test_..."
                      disabled={!formData.razorpayEnabled} 
                      className={!formData.razorpayEnabled ? 'opacity-50 select-none' : ''} 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Key Secret</label>
                    <Input 
                      type="password" 
                      value={formData.razorpayKeySecret} 
                      onChange={(e) => setFormData({...formData, razorpayKeySecret: e.target.value})}
                      placeholder="rzps_test_..."
                      disabled={!formData.razorpayEnabled} 
                      className={!formData.razorpayEnabled ? 'opacity-50 select-none' : ''} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
            <p className="text-sm text-slate-500">Irreversible administrative actions.</p>
            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300" onClick={handleClearCache}>
              Clear Analytics Cache
            </Button>
            <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300" onClick={handleFactoryReset}>
              System Factory Reset
            </Button>
          </Card>
        </div>
      </div>
      )}
    </div>
  );
}
