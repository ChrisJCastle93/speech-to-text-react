import React from "react";
import apiService from "../services/auth";
import { useNavigate, NavLink } from 'react-router-dom';
import { useForm } from "react-hook-form";
import "../../css/authForm.css";
import authLamp from "../../assets/authLamp.png"

export const Signup = (props) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const res = await apiService.signup(data.username, data.email, data.password)
    console.log(res)
    props.setLoggedInUser(res);
  };
  

  // const [username, setUsername] = React.useState('');
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

  console.log(errors);

  navigate("/profile");

  //  const submitUserRegisteration= ()=>{
  //     signup(username,email,password).then(user=>{
  //         props.setLoggedInUser(user)
  //         navigate('/');
  //     })
  //  }
  return (
    <container className="auth-container">
      <div className="auth-div">
        <h1 >Become a Laddy</h1>
          <form className="signup" onSubmit={handleSubmit(onSubmit)}>
          <label className="label" for="signup">Username:</label>
            <input
              {...register("username", {
                required: "Please enter a valid username",
              })}
              placeholder="Username"
              name="username"
            />
            <p>{errors.username?.message}</p>
            
            <label className="label" for="email">Email:</label>
            <input type="email"
              {...register("email", { required: "Please enter a valid email" })}
              placeholder="Email"
              name="email"
            />
            <p>{errors.email?.message}</p>
            
            <label className="label" for="password">Password:</label>
            <input type="password"
              {...register("password", {
                required: "This is required",
                minLength: {
                  value: 8,
                  message: "Password must be over 8 characters",
                },
              })}
              placeholder="enter a password"
              name="password"
            />
            <p>{errors.password?.message}</p>
            <button className="btn" type="submit">Sign up</button>
          </form>
          <h2>Already have an account?</h2>
          <NavLink to="/login" className="auth-btn">Log in</NavLink>
          </div>
          <img className="auth-img" src ={authLamp} alt="lamp-setting" />
    </container>
  );
};
