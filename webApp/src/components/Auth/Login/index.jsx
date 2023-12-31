import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputComponent from "../../helpers/InputComponent";
import { toastFail, toastSuccess } from "../../helpers/ToastNotification";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("pramud@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form Submitted");
      console.log(email, password);

      const rest = await axios.post('https://localhost:44334/api/User/login',
        {
          email,
          password
        }
      )

      console.log(rest);

      if (rest?.data?.active === false) {
        toastFail('Your account is not active. Please contact the BACK OFFICE for more information');
        return;
      }

      if (rest?.data?.role === 'TRAVELER') {
        toastFail('You are not allowed to login to this system');
        return;
      }

      toastSuccess('Login Successful');
      localStorage.setItem('AccessToken', rest?.data?.token);
      localStorage.setItem('user', rest?.data?.email);
      localStorage.setItem('role', rest?.data?.role);
      localStorage.setItem('userID', rest?.data?.nic);

      navigate("/home");

    } catch (error) {
      console.log(error);
      toastFail(`${error?.response?.data ? error.response.data : 'Login Failed'}`);
    }
  }

  return (
    <div className="">
      <div style={{
        backgroundImage: `url(${`${process.env.PUBLIC_URL}assets/images/background.jpg`})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}>
        <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          paddingTop: "15vh",
          paddingBottom: "15vh",
          paddingLeft: "10vw",
          paddingRight: "10vw",
          height: "100vh",
        }}
        >
          <div className="text-center mb-5">
            <div className="display-5" style={{ color: "#7a25a5", fontWeight: 600 }}> Log In</div>
            <div className="shape">
              <svg
                width="172"
                height="29"
                viewBox="0 0 172 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
                  stroke="#D5C0ED"
                />
              </svg>
            </div>
          </div>
          <div className="w-50 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <InputComponent
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  inputHandler={setEmail}
                />
              </div>
              <div className="mb-3">
                <InputComponent
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  inputHandler={setPassword}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button type="submit" className="btn btn-primary">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
