import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
      
      const[userName, setUserName] =useState("");
      const dispatch = useDispatch();

      const navigate = useNavigate();

      const submit= e => {
            e.preventDefault();
            console.log(userName)
            dispatch({
                  type:"GET_USERNAME",
                  payload: userName
            });
            setUserName("");
            navigate("/pokedex");
      };

      return (
            <div>
                <form action="" onSubmit={submit}>
                      <input className="login-userName"
                              type="text" 
                              value={userName} 
                              onChange={(e) => setUserName(e.target.value)}  
                        />
                      <button className="button-submit"><i className="fa-regular fa-arrow-right-to-arc"></i>Submit</button>
                </form>
            </div>
      );
};

export default Login;