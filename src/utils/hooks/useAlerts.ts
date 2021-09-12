import { DisplayToast } from '../modules';

interface AlertActions {
  showError: (message: string, description?: string) => void;
  showSuccess: (message: string, description?: string) => void;
  showInfo: (message: string, description?: string) => void;
  showWarning: (message: string, description?: string) => void;
}

export const useAlerts = (): AlertActions => {
  return {
    showError: (message: string, description?: string): void =>
      DisplayToast({ message, description, type: 'danger' }),
    showSuccess: (message: string, description?: string): void =>
      DisplayToast({ message, description, type: 'success' }),
    showInfo: (message: string, description?: string): void =>
      DisplayToast({ message, description, type: 'info' }),
    showWarning: (message: string, description?: string): void =>
      DisplayToast({ message, description, type: 'warning' }),
  };
};
