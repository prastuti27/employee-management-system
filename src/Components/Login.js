import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButton, setSubmitButton] = useState(false);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      return navigate("/login");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.email || !values.password) {
      return toast.error("Fill all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    const usersCollectionRef = collection(db, "users");
    const response = await getDocs(usersCollectionRef);
    console.log(values.email);
    let userExists = false;
    response.forEach((doc) => {
      const user = doc.data();
      console.log("user", user);
      if (user.email === values.email) {
        userExists = true;
      }
    });

    if (!userExists) {
      return toast.error("User does not exist", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setErrorMsg("");

    setSubmitButton(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        setSubmitButton(false);
        console.log("logged in");
        const user = res.user;
        console.log(user);
        localStorage.setItem("accessToken", user.accessToken);
        navigate("/");
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
      <div className="logincontainer">
        <div className="loginbox">
          <ToastContainer />

          <form id="login-form">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="login_email"
                name="email"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="login_password"
                name="password"
                required
                onChange={handleInputChange}
              />
            </div>
            <b>{errorMsg}</b>
            <button
              onClick={handleSubmit}
              disabled={submitButton}
              type="submit"
              className="login_button mt-3"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
