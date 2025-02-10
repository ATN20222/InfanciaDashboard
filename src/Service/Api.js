import axios from "axios";
import axiosInstance, {
  deleteNurseryId,
  deleteToken,
  setNurseryId,
  setToken,
  getNurseryId,
  setIsSuperAdmin,
  deleteIsSuperAdmin,
  setBranchId,
  getBranchId,
  setName,
  getUserId,
  setUserId,
} from "./AxiosApi";

const baseURL = "https://dashboard.infancia.app/api";

const axiosReg = axios.create({
  baseURL: baseURL,
});
const AuthService = {
  ApprovedNursery: async (transaction_id) => {
    try {
      const formData = new FormData();
      formData.append("transaction_id", transaction_id);
      const response = await axiosInstance.post(`/nursery-approved`, formData);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to change');
    }
  },
  GetCities: async () => {
    try {
      const response = await axiosInstance.get(`/cities`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to change');
    }
  },
  AssignClasses: async (data) => {
    try {
      const response = await axiosInstance.post(`/classrooms/manages`, data);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to change');
    }
  },
  GetAssignedClasses: async (user_id) => {
    try {
      const response = await axiosInstance.get(`/classroom/manages/${user_id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error(`Failed to get data`);
    }
  },

  AddImageGallery: async (album_id, media) => {
    try {
      const formData = new FormData();
      formData.append("gallery_id", album_id);
      formData.append("media", media);
      const response = await axiosInstance.post(`/gallery/medias`, formData);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  GenerateNursery: async (
    name,
    email,
    phone,
    country,
    city,
    address,
    about,
    branches_number,
    media
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("about", about);
      formData.append("branches_number", branches_number);
      formData.append("media", media);
      const response = await axiosInstance.post(`/nurseries`, formData);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },

  SuperAdminHome: async () => {
    try {
      const response = await axiosInstance.get(`/dashboard/mind`);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  AddNewAdmin: async (data) => {
    try {
      const response = await axiosInstance.post(`/users`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  changeStatus: async (nursery_id, status) => {
    try {
      const formData = new FormData();
      formData.append("nursery_id", nursery_id);
      formData.append("status", status);
      const response = await axiosInstance.post(
        `/nursery-set-status`,
        formData
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to change');
    }
  },
  Login: async (email, password) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await axiosInstance.post(`/auth/login`, formData);
      setToken(response.data.token);
      setNurseryId(response.data.nursery_id);
      setIsSuperAdmin(response.data.role === "superadmin");
      setName(response.data.name);
      setBranchId(response.data.branch_id);
      setUserId(response.data.user_id);
      // return;
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
      //throw new Error(error.response.data.message);
    }
  },
  VerifyOTP: async (otp, email) => {
    try {
      const formData = new FormData();
      formData.append("otp", otp);
      formData.append("email", email);
      const response = await axiosInstance.post(`/auth/otp/check`, formData);

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
      //throw new Error(error.response.data.message);
    }
  },
  ResendOTP: async (email) => {
    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axiosInstance.post(`/auth/resendotp`, formData);

      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
      //throw new Error(error.response.data.message);
    }
  },
  Logout: async () => {
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

  RequestPasswordReset: async (email) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      const response = await axiosInstance.post(
        `/auth/password/forget`,
        formData
      );
      deleteToken();
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to send email');
    }
  },
  ResetPassword: async (token, email, password, password_confirmation) => {
    try {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", password_confirmation);
      const response = await axiosInstance.post(
        `/auth/password/reset`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to reset password');
    }
  },
  RegisterApi: async (
    name,
    email,
    phone,
    city,
    country,
    address,
    branches_number,
    about,
    media,
    generate_branch
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("address", address);
      formData.append("branches_number", branches_number);
      formData.append("about", about);
      formData.append("media", media);
      formData.append("generate_branch", generate_branch ? 1 : 0);

      const response = await axiosReg.post(`/auth/register`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to register');
    }
  },
  AuthRole: async () => {
    try {
      const response = await axiosInstance.post(`/auth/permissions`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get roles');
    }
  },
};

const ClassService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/classrooms?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  Add: async (
    name,
    age_from,
    age_to,
    hasMeal,
    hasSubject,
    hasNap,
    hasToilet
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("from", age_from);
      formData.append("to", age_to);
      formData.append("has_meals", hasMeal);
      formData.append("has_subjects", hasSubject);
      formData.append("has_toilet", hasToilet);
      formData.append("has_nap", hasNap);
      formData.append("branch_id", getBranchId());
      formData.append("nursery_id", getNurseryId());
      const response = await axiosInstance.post(`/classrooms`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  Edit: async (
    id,
    name,
    age_from,
    age_to,
    has_meals,
    has_subjects,
    hasNap,
    hasToilet
  ) => {
    try {
      const response = await axiosInstance.put(
        `/classrooms/${id}?name=${name}&from=${age_from}&to=${age_to}&has_nap=${hasNap}&has_toilet=${hasToilet}&has_meals=${has_meals}&has_subjects=${has_subjects}&branch_id=${getBranchId()}&nursery_id=${getNurseryId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  Get: async (id) => {
    try {
      const response = await axiosInstance.get(`/classrooms/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get');
    }
  },
  AssignSubject: async (class_id, subjects) => {
    try {
      var subjects = {
        subjects: subjects,
      };
      const response = await axiosInstance.post(
        `/classrooms/assign/subject/${class_id}`,
        subjects
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};

const NotificationService = {
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/notifications?user_id=${getUserId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};

const KidsServices = {
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/kids?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  ListClassKids: async (class_id) => {
    try {
      const response = await axiosInstance.get(
        `/kids?class_room_id=${class_id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  Add: async (name, email, phone, job, emergency_phone, kids) => {
    try {
      const data = {
        name: name,
        email: email,
        phone: phone,
        branch_id: getBranchId(),
        nursery_id: getNurseryId(),
        job: job,
        emergency_phone: emergency_phone,
        kids: kids,
      };
      // return;

      const response = await axiosInstance.post(`/kids`, data);
      return response.data;
    } catch (error) {
      console.log("res", error);

      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  Edit: async (
    id,
    first_name,
    last_name,
    birth_date,
    has_medical_case,
    description_medical_case,
    classroom_id,
    gender,
    media
  ) => {
    try {
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("birth_date", birth_date);
      formData.append("has_medical_case", has_medical_case);
      formData.append("description_medical_case", description_medical_case);
      formData.append("class_room_id", classroom_id);
      formData.append("gender", gender);
      formData.append("branch_id", getBranchId());
      formData.append("nursery_id", getNurseryId());
      formData.append("media", media);

      const response = await axiosInstance.post(`/kids/${id}`, formData);

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to edit');
    }
  },

  profile: async (id) => {
    try {
      const response = await axiosInstance.get(`/kids/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/kids/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};
const SubjectServices = {
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/subjects?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  Add: async (title, description = "") => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("nursery_id", getNurseryId());
      formData.append("branch_id", getBranchId());
      formData.append("description", "description");

      const response = await axiosInstance.post(`/subjects`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  Edit: async (id, title) => {
    try {
      const response = await axiosInstance.put(
        `/subjects/${id}?title=${title}&branch_id=${getBranchId()}&nursery_id=${getNurseryId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  Assign: async (subject_id, class_id) => {
    try {
      const formData = new FormData();
      formData.append("subject_id", subject_id);
      formData.append("class_id", class_id);

      const response = await axiosInstance.post(`/assign-subject`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to assign');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/subjects/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
  ListWithClassId: async (class_id) => {
    try {
      const response = await axiosInstance.get(`/classes-subject/${class_id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  DeleteAssign: async (assign_id) => {
    try {
      const response = await axiosInstance.delete(
        `/remove-subject/${assign_id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
};

const NewsLetterServices = {
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/newsletters?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  Add: async (content, title, class_room_id, image) => {
    const formData = new FormData();
    if (image != null) formData.append("media", image);
    formData.append("content", content);
    formData.append("title", title);
    formData.append("nursery_id", getNurseryId());
    formData.append("branch_id", getBranchId());
    formData.append("is_private", class_room_id !== -1 ? 1 : 0);

    if (class_room_id !== -1) {
      formData.append("class_room_id", class_room_id);
    }

    try {
      const response = await axiosInstance.post(`/newsletters`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  Edit: async (id, content, title, class_room_id, image) => {
    const formData = new FormData();
    if (image != null) formData.append("media", image);

    formData.append("content", content);
    formData.append("title", title);
    formData.append("nursery_id", getNurseryId());
    formData.append("branch_id", getBranchId());
    formData.append("is_private", class_room_id !== -1 ? 1 : 0);

    if (class_room_id !== -1) {
      formData.append("class_room_id", class_room_id);
    }
    console.log(formData);
    try {
      const response = await axiosInstance.post(`/newsletters/${id}`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/newsletters/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};

const BlogesServices = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/blogs`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  Add: async (title, description, image, tags) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    if (image != null) formData.append("media", image);

    try {
      const response = await axiosInstance.post(`/blogs`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};

const FAQServices = {
  Add: async (question, answer) => {
    try {
      const formData = new FormData();
      formData.append("question", question);
      formData.append("answer", answer);
      formData.append("nursery_id", getNurseryId());
      const response = await axiosInstance.post(`/faqs`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/faqs?nursery_id=${getNurseryId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/faqs/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};
const PolicyServices = {
  Add: async (title, description) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", description);
      formData.append("nursery_id", getNurseryId());
      const response = await axiosInstance.post(`/policies`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/policies?nursery_id=${getNurseryId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to list');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/policies/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};

const ScheduleServices = {
  getClassSchedule: async (class_id, day) => {
    try {
      const response = await axiosInstance.get(
        `/schedules?class_room_id=${class_id}&date=${day}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to load data');
    }
  },

  AddScheduleContent: async (class_id, subject_id, content, day) => {
    try {
      const formData = new FormData();
      // formData.append('class_id', class_id);
      formData.append("subject_id", subject_id);
      formData.append("content", content);
      formData.append("date", day);

      const response = await axiosInstance.post(
        `/schedules/${class_id}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to Add');
    }
  },
  EditScheduleContent: async (id, subject_id, content, day) => {
    try {
      const response = await axiosInstance.put(
        `/schedules/${id}?subject_id=${subject_id}&content=${content}&date=${day}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to Add');
    }
  },
  DeleteContent: async (id) => {
    try {
      const response = await axiosInstance.delete(`/schedules/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};

const NurseryProfileService = {
  DeleteGalleryImage: async (album_id, image_id) => {
    try {
      const response = await axiosInstance.delete(
        `/gallery/medias/${image_id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  ListInfo: async () => {
    const id = getNurseryId();
    try {
      const response = await axiosInstance.get(`/nurseries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  HomeInfo: async () => {
    try {
      const response = await axiosInstance.get(
        `/dashboard/nursery?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  ListPaymentHistory: async () => {
    const id = getNurseryId();
    try {
      const response = await axiosInstance.get(
        `/nursery-payment/histories/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  ListReviews: async () => {
    try {
      const response = await axiosInstance.get(
        `/reviews?nursery_id=${getNurseryId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  ListGallery: async () => {
    try {
      const id = getNurseryId();
      const response = await axiosInstance.get(`/galleries?nursery_id=${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  AddAlbum: async (title) => {
    try {
      const formData = new FormData();
      formData.append("name", title);
      formData.append("nursery_id", getNurseryId());

      const response = await axiosInstance.post(`/galleries`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  EditAlbum: async (id, title) => {
    try {
      const response = await axiosInstance.put(
        `/galleries/${id}?name=${title}&nursery_id=${getNurseryId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to edit');
    }
  },
  ListGalleryImages: async (id) => {
    try {
      const response = await axiosInstance.get(`/galleries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  DeleteGallery: async (id) => {
    try {
      const response = await axiosInstance.delete(`/galleries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
  UploadGalleryImage: async (album_id, media) => {
    try {
      console.log(album_id, media);
      const formData = new FormData();
      formData.append("album_id", album_id);
      formData.append("media", media);
      const response = await axiosInstance.post(
        `/nursery-album/add-photo/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to upload');
    }
  },
  UpdateNurseryProfile: async (data) => {
    try {
      const response = await axiosInstance.post(
        `/nurseries/${getNurseryId()}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to upload');
    }
  },
};
const MealsServices = {
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/meals?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  Add: async (meal, type) => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("meal", meal);
    formData.append("branch_id", getBranchId());
    formData.append("nursery_id", getNurseryId());
    try {
      const response = await axiosInstance.post(`/meals`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },

  Edit: async (id, meal, type) => {
    try {
      const response = await axiosInstance.put(
        `/meals/${id}?&type=${type}&meal=${meal}&branch_id=${getBranchId()}&nursery_id=${getNurseryId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/meals/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};

const ParentRequestServices = {
  ListRequests: async () => {
    try {
      const response = await axiosInstance.get(
        `/chats?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  ListParents: async () => {
    try {
      const response = await axiosInstance.get(
        `/parents?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  ListMessages: async (chat_id) => {
    try {
      const response = await axiosInstance.get(`/chats/${chat_id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },

  SendMessages: async (chat_id, message) => {
    try {
      const formData = new FormData();
      formData.append("chat_id", chat_id);
      formData.append("sender_id", getBranchId());
      formData.append("message", message);
      const response = await axiosInstance.post(
        `/chats/send/message`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to send');
    }
  },
  AddChat: async (id) => {
    try {
      const formData = new FormData();
      formData.append("branch_id", getBranchId());
      formData.append("user_id", id);
      const response = await axiosInstance.post(`/chats`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to send');
    }
  },
};
const RolesServices = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/roles`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  Add: async (data) => {
    try {
      const response = await axiosInstance.post(`/roles`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/roles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};

const PaymentRequestServices = {
  List: async () => {
    try {
      const response = await axiosInstance.get(
        `/paymentbills?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  GetById: async (id) => {
    try {
      const response = await axiosInstance.get(`/paymentbills/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  Add: async (data) => {
    try {
      const response = await axiosInstance.post(`/paymentbills`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  MarkPaid: async (id) => {
    try {
      const response = await axiosInstance.post(
        `kidpaymentbills/${id}?status=accepted`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`paymentbills/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};

const NurseryServices = {
  List: async (type) => {
    // const id = getNurseryId();
    try {
      const response = await axiosInstance.get(`/nurseries?status=${type}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/nurseries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  ListById: async (id) => {
    // const id = getNurseryId();
    try {
      const response = await axiosInstance.get(`/nurseries/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  ChangeStatus: async (id, status) => {
    // const id = getNurseryId();
    const formData = new FormData();
    formData.append("status", status);
    try {
      const response = await axiosInstance.post(
        `/nurseries/status/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to get data');
    }
  },
  ApplicationAction: async (id, type) => {
    try {
      const formData = new FormData();
      formData.append("status", type);
      formData.append("nursery_id", id);
      const response = await axiosInstance.post(`/nursery-approve/`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error(`Failed to ${type} application`);
    }
  },
  ListAdmins: async () => {
    try {
      const response = await axiosInstance.get(
        `/users?branch_id=${getBranchId()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error(`Failed to get data`);
    }
  },

  DeleteAdmin: async (id) => {
    try {
      const response = await axiosInstance.delete(`/accounts/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error(`Failed to delete`);
    }
  },
};

const BranchesServices = {
  List: async () => {
    try {
      const response = await axiosInstance.get(`/branches`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  SetMainBranch: async (id) => {
    try {
      const response = await axiosInstance.post(`/branches/main/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
  Add: async (name, phone, email, city, country, address) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("address", address);
    formData.append("nursery_id", getNurseryId());

    try {
      const response = await axiosInstance.post(`/branches`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to add');
    }
  },
  Delete: async (id) => {
    try {
      const response = await axiosInstance.delete(`/branches/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
      //throw new Error('Failed to delete');
    }
  },
};

export {
  NotificationService,
  AuthService,
  ClassService,
  KidsServices,
  SubjectServices,
  NewsLetterServices,
  FAQServices,
  ScheduleServices,
  PolicyServices,
  NurseryProfileService,
  MealsServices,
  ParentRequestServices,
  RolesServices,
  PaymentRequestServices,
  NurseryServices,
  BranchesServices,
  BlogesServices,
};
