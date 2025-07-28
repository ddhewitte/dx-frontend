import React from 'react';
import { Navigate } from 'react-router-dom';
import { decryptData } from '../utils/encrypt';

export default function GuardRoute({ children, allowedRole }){
  const getToken = localStorage.getItem('token');
  const getEncryptedRole = localStorage.getItem('role');

  //no login > redirect to login
  if (!getToken || !getEncryptedRole) {
    return <Navigate to="/login" replace />;
  }
  const role = decryptData(getEncryptedRole);

  // Role is wrong
  if (role !== allowedRole) {
    return <Navigate to={`/${role.toLowerCase()}`} replace />;
  }

  return children;
};
