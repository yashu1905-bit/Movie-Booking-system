import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { notificationsService } from '../services/apiService';
import { Bell, CheckSquare, Trash2 } from 'lucide-react';

export default function Notifications() {
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const res = await notificationsService.getAll();
      return res.data?.data || res.data || [];
    }
  });

  const markReadMutation = useMutation({
    mutationFn: (id) => notificationsService.markRead(id),
    onSuccess: () => queryClient.invalidateQueries(['notifications'])
  });

  const markAllReadMutation = useMutation({
    mutationFn: () => notificationsService.markAllRead(),
    onSuccess: () => queryClient.invalidateQueries(['notifications'])
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading notifications...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Notifications</h1>
          <p className="text-slate-500 dark:text-slate-400">View and manage all your platform alerts and messages.</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button 
              variant="outline" 
              onClick={() => markAllReadMutation.mutate()}
              disabled={markAllReadMutation.isPending}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <Card className="overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
              <Bell className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium">No system notifications</h3>
            <p className="text-slate-500 mt-1">You are completely caught up!</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {notifications.map((n) => (
              <div 
                key={n._id} 
                className={`p-5 flex flex-col sm:flex-row gap-4 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors ${!n.isRead ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {!n.isRead && <span className="w-2.5 h-2.5 bg-primary-500 rounded-full shrink-0" />}
                    <h3 className={`font-medium ${!n.isRead ? 'text-slate-900 dark:text-slate-100 font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                      {n.title}
                    </h3>
                    <span className="text-xs text-slate-400 ml-auto sm:ml-2">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className={`text-sm ${!n.isRead ? 'text-slate-600 dark:text-slate-400' : 'text-slate-500'}`}>
                    {n.message}
                  </p>
                </div>
                {!n.isRead && (
                  <div className="sm:self-center mt-2 sm:mt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full sm:w-auto text-xs h-8"
                      onClick={() => markReadMutation.mutate(n._id)}
                      disabled={markReadMutation.isPending}
                    >
                      <CheckSquare className="w-3.5 h-3.5 mr-1.5" /> Acknowledge
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
