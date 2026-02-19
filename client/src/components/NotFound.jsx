import React from "react";
import { Navigate } from 'react-router-dom';

const RedirectToNotFound = () => {
  return <Navigate to="/notfound" replace/>;
};

export default RedirectToNotFound;