import React from 'react';

export default function Profile (props) {
  return (
    <div><h2>Hi {props.loggedInUser?.username} this is my profile</h2></div>
  )
}
