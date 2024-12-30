import axios from 'axios';
import axiosInstance, { deleteNurseryId, deleteToken, setNurseryId, setToken ,getNurseryId, setIsSuperAdmin, deleteIsSuperAdmin, setBranchId, getBranchId } from './AxiosApi';

const baseURL = 'https://orchid-aardvark-632100.hostingersite.com/api'; 

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
        setBranchId(response.data.branch_id);
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
    RegisterApi:async (name, email, phone , city,country, address, branches_number,about ,media,generate_branch)=>{
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('city_id', city);
        formData.append('country_id', country);
        formData.append('address', address);
        formData.append('branches_number', branches_number);
        formData.append('about', about);
        formData.append('media', media);
        formData.append('generate_branch', generate_branch?1:0);
        
        const response = await axiosReg.post(`/auth/register`,formData);
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
      const response = await axiosInstance.get(`/classrooms?branch_id=${getBranchId()}`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (name , age_from , age_to , hasMeal , hasSubject)=>{
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('from', age_from);
      formData.append('to', age_to);
      formData.append('has_meals', hasMeal);
      formData.append('has_subjects', hasSubject);
      formData.append('branch_id',getBranchId() );
      formData.append('nursery_id', getNurseryId());
      const response = await axiosInstance.post(`/classrooms` , formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
    }
  },
  Edit: async ( id , name , age_from , age_to , has_meals,has_subjects)=>{
    try {
      const response = await axiosInstance.put(`/classrooms/${id}?name=${name}&from=${age_from}&to=${age_to}&has_meals=${has_meals}&has_subjects=${has_subjects}&branch_id=${getBranchId()}&nursery_id=${getNurseryId()}`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
    }
  },
  Get:async (id)=>{
    try {
      const response = await axiosInstance.get(`/classrooms/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get'); 
    }
  },
  AssignSubject:async (class_id , subjects)=>{
    try {
      var subjects = {
        "subjects":subjects
      }
      const response = await axiosInstance.post(`/classrooms/assign/subject/${class_id}`,subjects);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
    }
  },
}

const KidsServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/kids?branch_id=${getBranchId()}`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  ListClassKids: async (class_id)=>{
    try { 
      const response = await axiosInstance.get(`/kids?class_room_id=${class_id}`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
    }
  },
  Add: async ( 
    name,
    email,
    phone,
    job,
    emergency_phone,
    kids
    
  )=>{
    try {
      console.log(kids);
      const data = {
        name:name ,
        email:email , 
        phone:phone,
        branch_id:getBranchId(),
        nursery_id:getNurseryId(),
        job:job,
        emergency_phone:emergency_phone,
        kids:kids
      } 
      console.log("data data datadata",data);
      // return;
  
      const response = await axiosInstance.post(`/kids` , data);
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
      const response = await axiosInstance.get(`/subjects?branch_id=${getBranchId()}`);
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
      formData.append('nursery_id', getNurseryId());
      formData.append('branch_id', getBranchId());
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
      const response = await axiosInstance.get(`/newsletters?branch_id=${getBranchId()}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to list'); 
    }
  },
  Add: async (content ,title,class_room_id, image)=>{
    const formData = new FormData();
    if(image!=null )
    formData.append('media', image);
    formData.append('content', content);
    formData.append('title', title);
    formData.append('nursery_id', getNurseryId());
    formData.append('branch_id', getBranchId());
    formData.append('is_private', class_room_id!==-1?1:0);

    if(class_room_id !==-1){
      formData.append('class_room_id', class_room_id);
    }


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
      
      const response = await axiosInstance.get(`/schedules?class_room_id=${class_id}&date=${day}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message); 
    //throw new Error('Failed to load data'); 
    }
  },

  AddScheduleContent: async (class_id,subject_id ,content , day)=>{
    try {
      const formData = new FormData();
      // formData.append('class_id', class_id);
      formData.append('subject_id', subject_id);
      formData.append('content', content);
      formData.append('date', day);
      
      const response = await axiosInstance.post(`/schedules/${class_id}`,formData);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to Add'); 
    }
  },
  DeleteContent:async (id)=>{
    try {
      const response = await axiosInstance.delete(`/schedules/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
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
      const response = await axiosInstance.get(`/nurseries/${id}`);
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
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/meals?branch_id=${getBranchId()}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  Add: async (meal  ,type )=>{
    const formData = new FormData();
    formData.append('type', type  );
    formData.append('meal', meal  );
    formData.append('branch_id', getBranchId()  );
    formData.append('nursery_id', getNurseryId()  );
    try {
      const response = await axiosInstance.post(`/meals` , formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  
  Edit: async (id,meal , type)=>{
    try {
      const response = await axiosInstance.put(`/meals/${id}?&type=${type}&meal=${meal}&branch_id=${getBranchId()}&nursery_id=${getNurseryId()}`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
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
      const response = await axiosInstance.get(`/payemntbills?branch_id=${getBranchId()}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to get data'); 
    }
  },
  Add:async (data)=>{
    try {
      const response = await axiosInstance.post(`/payemntbills`,data);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  MarkPaid:async (id)=>{
    try {
      const response = await axiosInstance.post(`payemntbills/paid/${id}`);
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

const BranchesServices = {
  List: async ()=>{
    try {
      const response = await axiosInstance.get(`/branches`);
      return response.data; 
    } catch (error) {
      throw new Error(error.response.data.message); 
    }
  },
  Add: async (description , image)=>{
    const formData = new FormData();
    if(image!=null )
    formData.append('media', image);

    formData.append('description', description);
    formData.append('title', "Test");
    try {
      const response = await axiosInstance.post(`/branches`, formData);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to add'); 
    }
  },
  Delete:async (id)=>{
    try {
      const response = await axiosInstance.delete(`/branches/${id}`);
      return response.data; 

    } catch (error) {
      throw new Error(error.response.data.message); 
//throw new Error('Failed to delete'); 
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
  NurseryServices,BranchesServices
};

