import React from "react";
import apiService from "../services/auth";
// import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import authLamp from "../../assets/authLamp.png";
import "../../css/authForm.css";

export const Login = (props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await apiService.login(data.username, data.password);
    console.log(props);
    props.setLoggedInUser(res);
    if (props.isComingFromCart) {
      navigate("/cart");
    } else {
      navigate("/profile");
    }
  };

  return (
    <container className="auth-container">
      <div className="auth-div">
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label" for="login">
            Username:
          </label>
          <input
            className="input"
            {...register("username", {
              required: "Please enter a valid username",
            })}
            placeholder="Username"
            name="username"
          />
          <p>{errors.username?.message}</p>

          <label className="label" for="password">
            Password:
          </label>
          <input
            type="password"
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
          <button className="btn" type="submit">
            Login
          </button>
        </form>
        <h2>Don't have an account?</h2>
        <NavLink to="/signup" className="auth-btn">
          Sign up
        </NavLink>
      </div>
      <img className="auth-img" src={authLamp} alt="lamp-setting" />
    </container>
  );
};
