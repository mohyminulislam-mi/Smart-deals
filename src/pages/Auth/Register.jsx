import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
// import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const [singIn, setSingIn] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const { createUser, singInGoogle } = use(AuthContext);
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

  const location = useLocation();
  const nevigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    // const password = e.target.password.value;
    const photo = e.target.photo.value;
    const checkbox = e.target.checkbox.checked;

    console.log("submit your details", name, email, password, photo, checkbox);
    // password validation chcek
    if (!passwordPattern.test(password)) {
      setPasswordError("Your password format is invalid.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, { displayName: name, photoURL: photo });
        // Swal.fire({
        //   title: "Successful",
        //   icon: "success",
        //   draggable: true,
        // });
        e.target.reset();
        nevigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });

    // set scusess or Error
    setError("");
    setSingIn(false);

    if (!checkbox) {
      setError("please accept our conditions");
      return;
    }
  };

  // singin with google
  const handleSinginGoogle = () => {
    singInGoogle()
      .then((result) => {
        console.log(result.user);
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // crete user in the databae
        fetch("http://localhost:3000/users", {
          method: 'POST',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify(newUser)
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data after user save", data);
          });

        nevigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="hero min-h-screen py-[60px]">
      <title>Game Share | Register Now</title>
      <div className="card w-[90%] lg:w-[25%] md:w-[60%] bg-base-100 shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-semibold text-center mb-5">Register</h1>
          <form onSubmit={handleRegister}>
            <fieldset className="fieldset">
              <label className="label text-sm text-black">Full Name</label>
              <input
                type="text"
                className="input w-full input-success"
                placeholder="Enter Your Name"
                name="name"
                required
              />
              <label className="label text-sm mt-1 text-black">Email</label>
              <input
                type="email"
                className="input w-full input-success"
                placeholder="Email"
                name="email"
                required
              />
              <label className="label text-sm mt-1 text-black">Password</label>
              <input
                type="password"
                className={`input w-full ${
                  passwordError ? "input-error" : "input-success"
                }`}
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
              {!passwordError && password.length > 0 && (
                <p className="text-green-600 text-sm mt-1">
                  ✓ Password looks good!
                </p>
              )}
              <label className="label text-sm mt-1 text-black">Photo</label>
              <input
                type="url"
                className="input w-full input-success"
                placeholder="Provide Your Photo Url"
                name="photo"
                required
              />
              <label className="label text-sm text-black">
                <input
                  type="checkbox"
                  className="checkbox mt-1 text-black"
                  name="checkbox"
                  required
                />
                Accept condition
              </label>
              <button className="btn btn-neutral mt-2">Submit</button>{" "}
              {/* messgaes  */}
              {error && <p className="text-red-500">{error}</p>}
              {singIn && (
                <p className="text-green-500">Account create Success</p>
              )}
            </fieldset>
          </form>
          <div className="text-center mt-1 flex flex-col">
            <span className="font-bold">Or</span>
            {/* Google */}
            <button
              className="btn bg-white text-black border-[#e5e5e5]"
              onClick={handleSinginGoogle}
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
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600 font-medium">
                Login Here
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
