import React from "react";
import apiService from "../services/auth";
// import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';


export const Login = (props) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const res = await apiService.login(data.username, data.password)
    await props.setLoggedInUser(res)
    navigate('/profile');
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: "Please enter a valid username",
          })}
          placeholder="Username"
          name="username"
        />
        <p>{errors.username?.message}</p>

        <input
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
        <button type="submit">Login</button>
      </form>
  );
};
