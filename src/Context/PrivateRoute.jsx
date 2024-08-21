import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getNurseryId } from '../Service/AxiosApi';

const PrivateRoute = ({ children }) => {
    // const { isAuthenticated } = useAuth();
    const token = getNurseryId();

    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
