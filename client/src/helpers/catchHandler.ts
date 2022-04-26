import { toast } from 'react-toastify';

export const catchHandler = (response: any) => {
  response.data.errors.map((item: { message: string; field: string }) => toast.error(item.message));
};
