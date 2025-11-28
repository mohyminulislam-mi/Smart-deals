import { Link, NavLink, useNavigate } from "react-router";
import UserImg from "../../assets/user.png";
import { use } from "react";

import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { user, singOutUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleSingOut = () => {
    singOutUser()
      .then(() => {
        Swal.fire({
          title: "Log Out Successful",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const menus = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={"/allproduct"}>All Product</NavLink>
          </li>
          <li>
            <NavLink to={"/My-Products"}>MyProducts</NavLink>
          </li>
          <li>
            <NavLink to={"/My-Bids"}>MyBids</NavLink>
          </li>
          <li>
            <NavLink to={"/Create-Product"}>CreateProduct</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to={"/login"}>Login</NavLink>
      </li>
      <li>
        <NavLink to={"/registration"}>Register</NavLink>
      </li>
    </>
  );
  return (
    <div className="w-11/12 mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {menus}
              </ul>
            </div>
            <Link to="/" className="w-[200px]">
              <h1 className="font-bold text-3xl">
                Smart<span className="text-purple-500">Deals</span>
              </h1>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{menus}</ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt={UserImg}
                      src={user?.photoURL || user?.reloadUserInfo.photoUrl}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">Profile</a>
                  </li>
                  <button
                    className="btn btn-neutral ml-2"
                    onClick={handleSingOut}
                  >
                    Logout
                  </button>
                </ul>
              </div>
            ) : (
              <>
                <Link to={"/login"} className="btn btn-neutral">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-neutral ml-2">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      
    </div>
  );
};

export default Header;
