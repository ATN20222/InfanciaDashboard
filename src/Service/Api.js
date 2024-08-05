import axiosInstance, { deleteToken, setToken } from './AxiosApi';

const baseURL = 'https://in-centrally-viper.ngrok-free.app/api'; 


const AuthService = {
    Login: async (email , password) =>{
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const response = await axiosInstance.post(`/auth/login`, formData);
        setToken(response.data.token);
        return response.data; 

      } catch (error) {
        throw new Error('Failed to login'); 
      }
    },
    Logout: async () =>{
        try {
          const response = await axiosInstance.post(`/auth/logout`);
          deleteToken();
          localStorage.clear();
          return response.data;
        } catch (error) {
          throw new Error('Failed to logout'); 
        }
      },
    
    RequestPasswordReset: async (email)=>{
        try {
            const formData = new FormData();
            formData.append('email', email);
            const response = await axiosInstance.post(`/auth/forgot-password`,formData);
            deleteToken();
            return response.data; 
          } catch (error) {
            throw new Error('Failed to send email'); 
          }
    },
    ResetPassword:async (token, email , password, password_confirmation)=>{
        try {
            
            const response = await axiosInstance.post(`/auth/reset-password`,null, {
                params: {
                    token: token,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation
                }
            });
            return response.data; 
          } catch (error) {
            throw new Error('Failed to reset password'); 
          }
    }
}

export { AuthService };
