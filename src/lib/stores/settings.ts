import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface AppSettings {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  autoSync: boolean;
  offlineMode: boolean;
  dataUsage: 'low' | 'normal' | 'high';
}

const defaultSettings: AppSettings = {
  notifications: true,
  darkMode: false,
  language: 'en',
  autoSync: true,
  offlineMode: true,
  dataUsage: 'normal'
};

function createSettingsStore() {
  const { subscribe, set, update } = writable<AppSettings>(defaultSettings);
  
  return {
    subscribe,
    set,
    update,
    load: () => {
      if (browser) {
        const stored = localStorage.getItem('pwa-settings');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            set({ ...defaultSettings, ...parsed });
          } catch (e) {
            console.error('Failed to parse stored settings:', e);
          }
        }
      }
    },
    save: (settings: AppSettings) => {
      if (browser) {
        localStorage.setItem('pwa-settings', JSON.stringify(settings));
      }
      set(settings);
    }
  };
}

export const settings = createSettingsStore();