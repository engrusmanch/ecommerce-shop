import React from 'react';
import { Route, Navigate ,Routes} from 'react-router-dom';
import { Home } from './pages/Home';


export function PrivateRoute(props) {
    // logic to check if user is authenticated
    const {isAuthenticated,category,setCategory} = props;
  
    return isAuthenticated ? (
        <Home category={category} setCategory={setCategory}/>
    ) : (
      <Navigate to="/login" />
    );
  }


