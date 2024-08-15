import axiosInstance, { deleteToken, setToken } from './AxiosApi';

const baseURL = 'https://infancia.app/api'; 


const AuthService = {
    Login: async (email , password) =>{
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const response = await axiosInstance.post(`/auth/login`, formData);
        setToken(response.data.token);
        console.log(response);
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
    },
    RegisterApi:async (name, email, phone, password, province, address, branches_number, classes_number, kids_number, employees_number, start_fees, about)=>{
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('password', password);
        formData.append('province', province);
        formData.append('address', address);
        formData.append('branches_number', branches_number);
        formData.append('classes_number', classes_number);
        formData.append('kids_number', kids_number);
        formData.append('employees_number', employees_number);
        formData.append('start_fees', start_fees);
        formData.append('about', about);

        const response = await axiosInstance.post(`/nurseries`,formData);
        return response.data; 
  
      } catch (error) {
        throw new Error('Failed to register'); 
  }
    }
}

const ClassService = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/classes`);
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
  },

  Edit: async ( id , name , age_from , age_to)=>{
    try {


      const response = await axiosInstance.put(`/classes/${id}?name=${name}&age_from=${age_from}&age_to=${age_to}`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to edit'); 
    }
  },
  Get:async (id)=>{
    try {
      const response = await axiosInstance.get(`/classes/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to get'); 
    }
  },

}
const KidsServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/kids`);
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
  },
  Edit: async (
    id,
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
  ) => {
    try {
      const queryParams = new URLSearchParams({
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
        // emergency_phone
      }).toString();
      console.log(`/kids/${id}?${queryParams}`)
      const response = await axiosInstance.put(`/kids/${id}?${queryParams}`);
  
      return response.data;
  
    } catch (error) {
      throw new Error('Failed to edit');
    }
  },
  
  profile:async (id)=>{
    try {
      const response = await axiosInstance.get(`/kids/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to get data'); 
    }
  },
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
  },
  Assign: async (subject_id , class_id)=>{
    try {
      const formData = new FormData();
      formData.append('subject_id', subject_id);
      formData.append('class_id', class_id);
 
      const response = await axiosInstance.post(`/assign-subject` , formData);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to assign'); 
    }
  },
  Delete:async (id)=>{
    try {
      const response = await axiosInstance.delete(`/subjects/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to delete'); 
    }
  },
  ListWithClassId: async (class_id)=>{
    try {
      const response = await axiosInstance.get(`/classes-subject/${class_id}`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to list'); 
    }
  },
  DeleteAssign:async (assign_id)=>{
    try {
      const response = await axiosInstance.delete(`/remove-subject/${assign_id}`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to list'); 
    }
  },
}

const NewsLetterServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/newsletters`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to list'); 
    }
  },
  Add: async (description , image)=>{
    const formData = new FormData();
    // formData.append('image', image);
    formData.append('description', description);
    formData.append('title', "Test");
    try {
      const response = await axiosInstance.post(`/newsletters`, formData);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to add'); 
    }
  },
  Delete:async (id)=>{
    try {
      const response = await axiosInstance.delete(`/newsletters/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to delete'); 
    }
  },
  
}
const FAQServices = {
  Add: async (question , answer)=>{
    try {
      const formData = new FormData();
      formData.append('questions', question);
      formData.append('answer', answer);
      
      const response = await axiosInstance.post(`/faq` , formData);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to add'); 
    }
  },
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/faq`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to list'); 
    }
  },
  Delete: async (id)=>{
    try {
      const response = await axiosInstance.delete(`/faq/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error('Failed to delete'); 
    }
  },
}
export { 
  AuthService , ClassService ,
  KidsServices , SubjectServices , 
  NewsLetterServices,
  FAQServices
};

