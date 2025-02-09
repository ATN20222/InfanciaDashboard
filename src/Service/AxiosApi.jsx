// ---------- Import ---------- //
import axios from "axios";
import Cookies from "universal-cookie";

// ---------- Const Variables ---------- //
const baseURL = 'https://dashboard.infancia.app/api';
const cookie = new Cookies();

// ---------- Functions ---------- //
// Set Token
export const setToken = (token) => {
    cookie.set('token', token, { path: '/' });
};
// Get Token
export const getToken = () => {
    return cookie.get('token');
};
// Delete Token
export const deleteToken = () => {
    cookie.remove('token', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
};

export const setIsSuperAdmin = (state) => {
    cookie.set('IsSuperAdmin', state, { path: '/' });
};
export const getIsSuperAdmin = () => {
    return cookie.get('IsSuperAdmin');
};
// Delete IsSuperAdmin
export const deleteIsSuperAdmin = () => {
    cookie.remove('IsSuperAdmin', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
}


// Set NurseryId
export const setNurseryId = (nursery_id) => {
    cookie.set('nursery_id', nursery_id, { path: '/' });
};
// Get NurseryId
export const getNurseryId = () => {
    return cookie.get('nursery_id');
};
export const setUserId = (nursery_id) => {
    cookie.set('user_id', nursery_id, { path: '/' });
};
// Get NurseryId
export const    getUserId = () => {
    return cookie.get('user_id');
};

export const setFCM = (fcm) => {
    cookie.set('fcm', fcm, { path: '/' });
};
// Get NurseryId
export const  getFCM = () => {
    return cookie.get('fcm');
};



export const setBranchId = (nursery_id) => {
    cookie.set('branch_id', nursery_id, { path: '/' });
};
// Get NurseryId
export const getBranchId = () => {
    return cookie.get('branch_id');
};


export const setName = (name) => {
    cookie.set('Name', name, { path: '/' });
};
// Get NurseryName
export const getName = () => {
    return cookie.get('Name');
};


// Delete NurseryId
export const deleteNurseryId = () => {
    cookie.remove('nursery_id', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
}
export const deleteBranchId = () => {
    cookie.remove('branch_id', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
}


// Instance From Axios
const axiosInstance = axios.create({
    baseURL: baseURL,
    Accept:'application/json',
    'Device-Token': getFCM(),

});

// Axios Interceptors Request
axiosInstance.interceptors.request.use(
    async config => {
        const token = getToken();
        const nursery_id = getNurseryId();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = 'application/json';
            config.headers["Content-Type"] = 'multipart/form-data';
            config.headers["Device-Token"] = getFCM();

        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Axios Interceptors Response
axiosInstance.interceptors.response.use(
    response => response,
    async error => {      
        const originalRequest = error.config;

        // if (error.response.status === 401 && !originalRequest._retry && getToken()) {
        //     originalRequest._retry = true;
        //     try {
        //         // Send the current token in the Authorization header for the refresh request
        //         const response = await axiosInstance.post('auth/refresh');
        //         // console.log(response);
        //         console.log(getToken());
        //         setToken(response.data.token);
        //         // console.log(setToken(response.data.token));
                
    
        //         originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

        //         // Update the authorization header and retry the original request
        //         return axiosInstance(originalRequest);

        //     } catch (refreshError) {
        //         console.log(getToken());
        //         // console.log(refreshError);
        //     }
        // }else
        
        if(error.response.status === 460){
            deleteToken();
            deleteNurseryId();
            deleteIsSuperAdmin();
            localStorage.clear();
            window.location.href = '/login'
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;