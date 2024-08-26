// ---------- Import ---------- //
import axios from "axios";
import Cookies from "universal-cookie";

// ---------- Const Variables ---------- //
const baseURL = 'https://infancia.app/api';
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
// Delete NurseryId
export const deleteNurseryId = () => {
    cookie.remove('nursery_id', { path: '/' });
    localStorage.clear();
    sessionStorage.clear();
}


// Instance From Axios
const axiosInstance = axios.create({
    baseURL: baseURL,
});

// Axios Interceptors Request
axiosInstance.interceptors.request.use(
    async config => {
        const token = getToken();
        const nursery_id = getNurseryId();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.Accept = 'application/json';
            config.headers["Content-Type"] = 'multipart/form-data'
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

        if (error.response.status === 401 && !originalRequest._retry && getToken()) {
            originalRequest._retry = true;
            try {
                // Send the current token in the Authorization header for the refresh request
                const response = await axiosInstance.post('auth/refresh');

                setToken(response.data.token);
                

                originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

                // Update the authorization header and retry the original request
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                console.log(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;