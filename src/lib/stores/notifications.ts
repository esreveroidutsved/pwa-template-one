import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

export const notifications = writable<Notification[]>([]);

export function addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
  const newNotification: Notification = {
    ...notification,
    id: crypto.randomUUID(),
    timestamp: new Date(),
    read: false
  };
  
  notifications.update(items => [newNotification, ...items]);
  
  // Show browser notification if permission granted
  if (browser && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(notification.title, {
      body: notification.message,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: newNotification.id
    });
  }
  
  return newNotification.id;
}

export function markAsRead(id: string) {
  notifications.update(items => 
    items.map(item => 
      item.id === id ? { ...item, read: true } : item
    )
  );
}

export function removeNotification(id: string) {
  notifications.update(items => items.filter(item => item.id !== id));
}

export function clearAllNotifications() {
  notifications.set([]);
}