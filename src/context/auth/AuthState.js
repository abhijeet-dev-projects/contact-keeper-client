import React, { useReducer } from "react";

import axios from "axios";

import setAuthToken from '../../utils/setAuthToken';

import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    user: null,
    loading: true,
    isAuthenticated: null,
    error: null
  };

  const userLoaded = async () => {

    if(localStorage.getItem('token')){
      setAuthToken(localStorage.getItem('token'));
    }

    try{

      const res = await axios.get('/api/auth');

      console.log(res,'check')

      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.msg
      })
    }
  }

  const logout = () => dispatch({
    type: LOGOUT
  })

  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/auth',formData,config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      })
    }

    userLoaded();
  }

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    try {
      const res = await axios.post(
        "/api/users",
        formData,
        config
      );
      console.log(res, "check");

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      userLoaded();

    } catch (err) {
        console.log(err,'getting error')
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  const clearErrors = () => dispatch({
    type: CLEAR_ERRORS
  })

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        user: state.user,
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        register,
        clearErrors,
        userLoaded,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
