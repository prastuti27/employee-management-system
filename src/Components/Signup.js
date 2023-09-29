import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButton, setSubmitButton] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.name || !values.email || !values.password) {
      setErrorMsg("Fill all fields");
      return;
    }

    setErrorMsg("");

    setSubmitButton(true);
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        setSubmitButton(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        navigate("/login");
        console.log(user);
      })
      .catch((err) => {
        setSubmitButton(false);
        console.log("Error", err);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <>
      <form id="login-form">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={values.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={values.password}
            onChange={handleInputChange}
          />
        </div>
        <b>{errorMsg}</b>
        <button onClick={handleSubmit} disabled={submitButton} type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default Signup;
