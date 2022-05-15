import React from "react";
import apiService from "../services/auth";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import "../../css/authForm.css"

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
      <form className="signup" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: "Please enter a valid username",
          })}
          placeholder="Username"
          name="username"
        />
        <p>{errors.username?.message}</p>

        <input className="label"
          {...register("email", { required: "Please enter a valid email" })}
          placeholder="Email"
          name="email"
        />
        <p>{errors.email?.message}</p>

        <input className="label" type="password"
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
  );
};
