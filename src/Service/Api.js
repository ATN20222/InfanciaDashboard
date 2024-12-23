import axios from 'axios';
import axiosInstance, { deleteNurseryId, deleteToken, setNurseryId, setToken ,getNurseryId, setIsSuperAdmin, deleteIsSuperAdmin } from './AxiosApi';

const baseURL = 'https://dashboard.infancia.app/api'; 

const axiosReg = axios.create({
  baseURL: baseURL,
});
const AuthService = {
  ApprovedNursery:async(transaction_id)=>{
    try {
      const formData = new FormData();
      formData.append('transaction_id', transaction_id);
      const response = await axiosInstance.post(`/nursery-approved`, formData);
      
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to change'); 
    }
  },

  AddImageGallery:async(album_id  , media)=>{
    try {
      const formData = new FormData();
      formData.append('album_id', album_id);
      formData.append('media', media);
      const response = await axiosInstance.post(`nursery-album/add-photo`, formData);
      
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },

  SuperAdminHome:async()=>{
    try {
      const response = await axiosInstance.get(`/superAdmin-statistics`);
      
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
    AddNewAdmin:async(name,email , phone , role , password , classes)=>{
      try {
        const data = {
          'name':name  ,
          'email': email,
          'phone': phone,
          'role':role,
          'password':password,
          'password_confirmation':password,
          'classes':classes['classes']
        }
        const formData = new FormData();
        formData.append('name', name  );
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('role', role);
        formData.append('password', password);
        formData.append('password_confirmation', password);
        formData.append('classes', classes);
        console.log("data",data)
        const response = await axiosInstance.post(`/accounts/users`, data);
        
        return response.data; 

      } catch (error) {
        throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
      }
    },
    changeStatus:async(nursery_id , status)=>{
      try {
        const formData = new FormData();
        formData.append('nursery_id', nursery_id);
        formData.append('status', status);
        const response = await axiosInstance.post(`/nursery-set-status`, formData);
        
        return response.data; 

      } catch (error) {
        throw new Error(error.response.data.message); 
//throw new Error('Failed to change'); 
      }
    },
    Login: async (email , password) =>{
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const response = await axiosInstance.post(`/auth/login`, formData);
        setToken(response.data.token);
        setNurseryId(response.data.nursery_id);
        setIsSuperAdmin(response.data.role==="superAdmin");
        console.log(response);
        return response.data; 

      } catch (error) {
        console.log(error)
        throw new Error(error.response.data.message); 
//throw new Error(error.response.data.message); 
      }
    },
    Logout: async () =>{
        try {
          const response = await axiosInstance.post(`/auth/logout`);
          deleteToken();
          deleteNurseryId();
          deleteIsSuperAdmin();
          localStorage.clear();
          return response.data;
        } catch (error) {
          throw new Error(error.response.data.message); 
//throw new Error('Failed to logout'); 
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
            throw new Error(error.response.data.message); 
//throw new Error('Failed to send email'); 
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
            throw new Error(error.response.data.message); 
//throw new Error('Failed to reset password'); 
          }
    },
    RegisterApi:async (name, email, phone , city,country, address, branches_number, classes_number, kids_number, employees_number, start_fees, about , provided_services , media)=>{
      try {
        console.log(name, email, phone , city,country, address, branches_number, classes_number, kids_number, employees_number, start_fees, about , provided_services , media);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('city', city);
        formData.append('country', country);
        formData.append('province', country);
        formData.append('address', address);
        formData.append('branches_number', branches_number);
        formData.append('classes_number', classes_number);
        formData.append('children_number', kids_number);
        formData.append('employees_number', employees_number);
        formData.append('start_fees', start_fees);
        formData.append('about', about);
        formData.append('services', provided_services);
        formData.append('media', media);
        
        const response = await axiosReg.post(`https://dashboard.infancia.app/api/nurseries-create`,formData);
        return response.data; 
  
      } catch (error) {
        throw new Error(error.response.data.message); 
//throw new Error('Failed to register'); 
  }
    },
    AuthRole:async ()=>{
      try {
          
          const response = await axiosInstance.post(`/auth/auth-role`);
          return response.data; 
        } catch (error) {
          throw new Error(error.response.data.message); 
//throw new Error('Failed to get roles'); 
        }
  },
}

const ClassService = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/classes`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
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
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },

  Edit: async ( id , name , age_from , age_to)=>{
    try {


      const response = await axiosInstance.put(`/classes/${id}?name=${name}&age_from=${age_from}&age_to=${age_to}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to edit'); 
    }
  },
  Get:async (id)=>{
    try {
      const response = await axiosInstance.get(`/classes/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get'); 
    }
  },

}
const KidsServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/kids`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  ListClassKids: async (class_id)=>{
    try {
      const response = await axiosInstance.get(`/classes/${class_id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
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
    emergency_phone,
    media
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
      if(media!=null){
        formData.append('media', media);
      }
      const response = await axiosInstance.post(`/kids` , formData);
      return response.data; 

    } catch (error) {
      console.log("res" , error);

      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
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
    emergency_phone,
    media
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
        // media,
        // emergency_phone
      }).toString();
      console.log(`/kids/${id}?${queryParams}`)
      const response = await axiosInstance.put(`/kids/${id}?${queryParams}`);
  
      return response.data;
  
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to edit');
    }
  },
  
  profile:async (id)=>{
    try {
      const response = await axiosInstance.get(`/kids/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  Delete:async (id)=>{
    try {
      const response = await axiosInstance.delete(`/kids/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },
}
const SubjectServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/subjects`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
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
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
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
      throw new Error(error.response.data.message); 
//throw new Error('Failed to assign'); 
    }
  },
  Delete:async (id)=>{
    try {
      const response = await axiosInstance.delete(`/subjects/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },
  ListWithClassId: async (class_id)=>{
    try {
      const response = await axiosInstance.get(`/classes-subject/${class_id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  DeleteAssign:async (assign_id)=>{
    try {
      const response = await axiosInstance.delete(`/remove-subject/${assign_id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
}

const NewsLetterServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/newsletters`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  Add: async (description , image)=>{
    const formData = new FormData();
    if(image!=null )
    formData.append('media', image);

    formData.append('description', description);
    formData.append('title', "Test");
    try {
      const response = await axiosInstance.post(`/newsletters`, formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  Delete:async (id)=>{
    try {
      const response = await axiosInstance.delete(`/newsletters/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
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
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/faq`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  Delete: async (id)=>{
    try {
      const response = await axiosInstance.delete(`/faq/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },
}
const PolicyServices = {
  Add: async (title, description )=>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      
      const response = await axiosInstance.post(`/policies` , formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/policies`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  Delete: async (id)=>{
    try {
      const response = await axiosInstance.delete(`/policies/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },
}

const ScheduleServices = {
  getClassSchedule: async (class_id,day)=>{
    try {
      
      
      const response = await axiosInstance.get(`/schedules/${class_id}/${day}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to load data'); 
    }
  },
  AddScheduleContent: async (class_id,subject_id ,content , day)=>{
    try {
      const formData = new FormData();
      formData.append('class_id', class_id);
      formData.append('subject_id', subject_id);
      formData.append('content', content);
      formData.append('days', day);
      
      const response = await axiosInstance.post(`/schedules`,formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to Add'); 
    }
  },
 
}

const NurseryProfileService = {
  DeleteGalleryImage:async (album_id , image_id)=>{
    console.log(`/nursery-album/delete-photo/${album_id}/${image_id}`);
    try {
      const response = await axiosInstance.delete(`/nursery-album/delete-photo/${album_id}/${image_id}`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
    }
  },
  ListInfo: async ()=>{
    const id = getNurseryId();
    try {
      const response = await axiosInstance.get(`/guest/nurseries/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  HomeInfo: async ()=>{
    try {
      const response = await axiosInstance.get(`/nurseies-statistics`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  ListPaymentHistory: async ()=>{
    const id = getNurseryId();
    try {
      const response = await axiosInstance.get(`/nursery-payment/histories/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  ListReviews: async ()=>{
    try {
      const response = await axiosInstance.get(`/reviews`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  ListGallery: async ()=>{
    try {
      const id = getNurseryId();
      const response = await axiosInstance.get(`/nurseies-albums/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  AddAlbum: async (title)=>{
    try {
      const formData = new FormData();
      formData.append('title', title);
      
      const response = await axiosInstance.post(`/nursery-album` , formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  EditAlbum: async (id , title)=>{
    try {
      const response = await axiosInstance.put(`/nursery-album/${id}?title=${title}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to edit'); 
    }
  },
  ListGalleryImages: async (id)=>{
    try {
      const response = await axiosInstance.get(`/nursery-album/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  DeleteGallery: async (id)=>{
    try {
      const response = await axiosInstance.delete(`/nursery-album/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },
  UploadGalleryImage: async (album_id  , media)=>{
    try {
      console.log(album_id  , media);
      const formData = new FormData();
      formData.append('album_id', album_id);
      formData.append('media', media);
      const response = await axiosInstance.post(`/nursery-album/add-photo/`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
        withCredentials: true,
      });
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to upload'); 
    }
  },



}
const MealsServices = {
  List: async (id)=>{
    try {
      const response = await axiosInstance.get(`/meals/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  Add: async (meal , day ,type , class_id)=>{
    const data = {
      "meals": [
          { "days": day, "type":type, "description": meal, "class_id" : class_id},
      ],
      
      "class_id":class_id
  }
    try {

      const response = await axiosInstance.post(`/meals` , data);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  
  Edit: async ( id , class_id , type , days, description)=>{
    try {


      const response = await axiosInstance.put(`/meals/${id}?class_id=${class_id}&type=${type}&days=${days}&description=${description}`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to edit'); 
    }
  },

  Delete: async (id)=>{
    try {
      const response = await axiosInstance.delete(`/meals/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },

}

const ParentRequestServices = {
  ListRequests: async () => {
    try {
      const id = getNurseryId();
      const response = await axiosInstance.get(`/chat/get-request/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data');
    }
  },
  ListMessages: async (reciver_id ,chat_id ) => {
    try {
      const response = await axiosInstance.get(`/chat/messages/${reciver_id}/${chat_id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data');
    }
  },

  SendMessages: async (receiver , message) => {
    try {
      const response = await axiosInstance.post(`/chat/send-message`,
        {
        receiver: receiver,
        message: message,
      }
      // , {
      //   headers: {
      //     Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2xpZ2h0c2t5Ymx1ZS1wb3Jwb2lzZS05MDMyNzEuaG9zdGluZ2Vyc2l0ZS5jb20vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3MjQxODYzNTMsImV4cCI6MTcyNDM2OTk1MywibmJmIjoxNzI0MTg2MzUzLCJqdGkiOiI1djVrMTk5VUNqdTRUcktzIiwic3ViIjoiMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.teF8h9rW1xUPvs2GkZ1xU7Ot2a-NOimIQMqeyELUmuk`,
      //   },
      // }
    );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to send');
    }
  },

};
const RolesServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/roles`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  Add:async (data)=>{
    try {
      const response = await axiosInstance.post(`/roles`,data);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  Delete:async (id)=>{
    try {
      const response = await axiosInstance.delete(`/roles/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
    }
  },
}

const PaymentRequestServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/payment-request`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  Add:async (data)=>{
    try {
      const response = await axiosInstance.post(`/payment-request`,data);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  MarkPaid:async (id)=>{
    try {
      const response = await axiosInstance.post(`payment-request/paid/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to change state'); 
    }
  },


}


const NurseryServices = {
  List: async (type)=>{
    // const id = getNurseryId();
    try {
      const response = await axiosInstance.get(`/all-nurseries/${type}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  ListById: async (id)=>{
    // const id = getNurseryId();
    try {
      const response = await axiosInstance.get(`/nurseries/${id}`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  ApplicationAction: async (id,type)=>{
    try {
      const formData = new FormData();
      formData.append('status', type  );
      formData.append('nursery_id', id);
      const response = await axiosInstance.post(`/nursery-approve/`,formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error(`Failed to ${type} application`); 
    }
  },
  ListAdmins:async ()=>{
    try {
      const response = await axiosInstance.get(`/accounts/users`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error(`Failed to get data`); 
    }
  },
  DeleteAdmin:async (id)=>{
    try {
      const response = await axiosInstance.delete(`/accounts/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error(`Failed to delete`); 
    }
  },




}


export { 
  AuthService , ClassService ,
  KidsServices , SubjectServices , 
  NewsLetterServices,
  FAQServices,ScheduleServices,
  PolicyServices,NurseryProfileService,
  MealsServices,ParentRequestServices,
  RolesServices,PaymentRequestServices,
  NurseryServices
};

