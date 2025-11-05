import React, { use, useState } from "react";
import { Link, Links, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { singInUser, singInGoogle } = use(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // password validation chcek
    if (!passwordPattern.test(password)) {
      setPasswordError("Your password format is invalid.");
      return;
    }
    singInUser(email, password)
      .then((result) => {
        console.log(result);

        Swal.fire({
          title: "Login Successful",
          icon: "success",
          draggable: true,
        });
        e.target.reset();
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // singin with google
  const handleSinginGoogle = () => {
    singInGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hero min-h-screen">
            <title>Game Share | Login Now</title>
      <div className="card w-[90%] lg:w-[25%] md:w-[60%] bg-base-100 shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-semibold text-center mb-5">Login</h1>
          <form onSubmit={handleLogin}>
            <fieldset className="fieldset">
              <label className="label text-black">Email</label>
              <input
                type="email"
                className="input w-full text-gray-500 input-success"
                placeholder="Email"
                name="email"
                required
              />
              <label className="label mt-1 text-black">Password</label>
              <input
                type="password"
                className={`input w-full ${
                  passwordError ? "input-error" : "input-success"
                }`}
                placeholder="Password"
                name="password"
                required
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
              <div className="mt-1">
                <Link
                  to={"/forget-password"}
                  className="link link-hover text-base text-blue-600 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <button className="btn btn-neutral mt-2">Login</button>{" "}
            </fieldset>
          </form>
          <div className="text-center mt-1 flex flex-col">
            <span className="font-bold">Or</span>
            {/* Google */}
            <button
              onClick={handleSinginGoogle}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
          <div className="text-center mt-2">
            <p>
              Don't have an account?{" "}
              <Link to={"/register"} className="text-blue-600 font-medium">
                Sign up now
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
