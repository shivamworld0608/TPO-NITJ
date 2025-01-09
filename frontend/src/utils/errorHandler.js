import { toast } from 'react-hot-toast';
import { logout } from '../Redux/authSlice';
import axios from 'axios';

export const setupAxiosInterceptors = (store) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        // Handle specific error codes
        switch (error.response.status) {
          case 401:
            store.dispatch(logout());
            toast.error(error.response.data.message || 'Authentication failed');
            return Promise.reject(error);
          
          case 500:
            window.location.href = '/error';
            return Promise.reject(error);
            
          default:
            toast.error(error.response.data.message || 'Something went wrong');
            return Promise.reject(error);
        }
      } else if (error.request) {
        // Network error
        window.location.href = '/error';
        return Promise.reject(error);
      }
      
      toast.error('An unexpected error occurred');
      return Promise.reject(error);
    }
  );
};

export const handleApiError = (error, navigate) => {
  if (error.response) {
    const message = error.response.data.message || 'Something went wrong';
    
    switch (error.response.status) {
      case 401:
        toast.error(message);
        navigate('/login');
        break;
      
      case 500:
        navigate('/error');
        break;
        
      default:
        toast.error(message);
    }
  } else {
    navigate('/error');
  }
};