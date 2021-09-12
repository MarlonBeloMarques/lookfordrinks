import { DisplayToast } from '../modules';

type MessageType =
  | 'none'
  | 'default'
  | 'info'
  | 'success'
  | 'danger'
  | 'warning';

const showAlert = (
  message: string,
  type: MessageType = 'info',
  description?: string,
): void => {
  DisplayToast({
    message,
    type,
    icon: type,
    description,
  });
};

export default showAlert;
