import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = window.localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/admin/signin" />;
}

export default PrivateRoute;