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
const ClassService = {
  List: async ()=>{
    try {
      const response = await axiosInstance.post(`/classTest`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to list'); 
    }
  },
  Add: async (name , age_from , age_to)=>{
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age_from', age_from);
      formData.append('age_to', age_to);
      const response = await axiosInstance.post(`/classes` , formData);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to add'); 
    }
  }
}
const KidsServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.post(`/classTest`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to list'); 
    }
  },
  Add: async ( 
    kid_name,
    name,
    email,
    phone,
    gender,
    birthdate,
    city,
    address,
    class_id,
    father_name,
    father_mobile,
    father_job,
    mother_name,
    mother_mobile,
    mother_job,
    has_medical_case,
    emergency_phone
  )=>{
    try {
      const formData = new FormData();
      formData.append('kid_name', kid_name);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('gender', gender);
      formData.append('birthdate', birthdate);
      formData.append('city', city);
      formData.append('address', address);
      formData.append('class_id', class_id);
      formData.append('father_name', father_name);
      formData.append('father_mobile', father_mobile);
      formData.append('father_job', father_job);
      formData.append('mother_name', mother_name);
      formData.append('mother_mobile', mother_mobile);
      formData.append('mother_job', mother_job);
      formData.append('has_medical_case', has_medical_case);
      formData.append('emergency_phone', emergency_phone);
      const response = await axiosInstance.post(`/kids` , formData);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to add'); 
    }
  }
}
const SubjectServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/subjects`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to list'); 
    }
  },
  Add: async (title , description="")=>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', "description");
 
      const response = await axiosInstance.post(`/subjects` , formData);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to add'); 
    }
  }
}
export { AuthService , ClassService , KidsServices , SubjectServices };

