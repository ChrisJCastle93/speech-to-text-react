import React from "react";
import apiService from "../services/auth";
// import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

export const UpdateUserForm = (props) => {
  // const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const id =props.loggedInUser._id
  console.log("props",props);
  const onSubmit = async (data) => {

  const res=  await apiService.update(data.username, data.password,id)
    props.setLoggedInUser(res)
  };

  console.log(props.loggedInUser?.username)
  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
        // defaultValues={props.loggedInUser.username}
        defaultValue={props.loggedInUser?.username}
          {...register("username", {
            // required: "Please enter a valid username",
          })}
          placeholder="Username"
          name="username"
        />
        <p>{errors.username?.message}</p>

        <input type="password" 
        defaultValue={props.loggedInUser?.password}
          {...register("password", {
            // required: "This is required",
            minLength: {
              value: 8,
              message: "Password must be over 8 characters",
            },
          })}
          placeholder="enter a password"
          name="password"
        />
        <p>{errors.password?.message}</p>
        <button type="submit">Save changes</button>
      </form>
  );
};
