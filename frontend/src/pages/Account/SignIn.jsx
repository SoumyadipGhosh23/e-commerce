import { Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import authService from '../../appwrite/auth'
import { login as authLogin } from '../../redux/authSlice'
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";



const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0)


  const login = async (data) => {
    setError("");
    try {
      setProgress(progress + 33)
      const session = await authService.login(data);
      setProgress(progress + 33)
      if (session) {
        const userData = await authService.getCurrentUser();
        setProgress(progress + 33)
        if (userData) {
          dispatch(authLogin(userData));
          console.log(userData);
        }
        setProgress(100)
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid Details")
      setProgress(100)
      setError(error.message);
    }
  }

  const loginWithGoogle = () => {
    try {
      authService.loginWithGoogle();
      // After the user is redirected back from Google, handle the callback
      // and complete the authentication process
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex h-screen">
        {/* 1/3 Part */}
        <div className="hidden lg:block w-1/3 h-full p-3" style={{ backgroundColor: "#262626" }}>
          {/* Content for 1/3 part */}
          <div className="p-4 mt-7">
            <Link to="/">
              <h1 className="text-4xl font-extrabold text-blue-300 mb-5">QShop</h1>
            </Link>
            <h1 className="text-white font-semibold text-xl m-3">Stay Sign In For More</h1>
            <p className="text-white m-3">When You Sign In, You&apos;re with us</p>
            <div className="w-[300px] flex items-start gap-3 m-4 mt-7">
              <span className="text-green-500 mt-1">
                <BsCheckCircleFill />
              </span>
              <p className="text-base text-gray-300">
                <span className="text-white font-semibold font-titleFont">
                  Get started fast with QShop
                </span>
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor
                recusandae consectetur!
              </p>
            </div>
            <div className="w-[300px] flex items-start gap-3 m-4">
              <span className="text-green-500 mt-1">
                <BsCheckCircleFill />
              </span>
              <p className="text-base text-gray-300">
                <span className="text-white font-semibold font-titleFont">
                  Access all QShop services
                </span>
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor
                recusandae consectetur!
              </p>
            </div>
            <div className="w-[300px] flex items-start gap-3 m-4 mb-10">
              <span className="text-green-500 mt-1">
                <BsCheckCircleFill />
              </span>
              <p className="text-base text-gray-300">
                <span className="text-white font-semibold font-titleFont">
                  Trusted by online Shoppers
                </span>
                <br />
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis nisi dolor
                recusandae consectetur!
              </p>
            </div>
            <div className="flex items-center justify-center mt-20 ">
              <Link to="/">
                <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300 p-5">
                  ©QShop
                </p>
              </Link>
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300 p-5">
                Terms
              </p>
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300 p-5">
                Privacy
              </p>
              <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300 p-5">
                Security
              </p>
            </div>
          </div>
        </div>



        {/* 2/3 Part */}
        <div className="w-full lg:w-2/3 h-full bg-white">
          {/* Content for 2/3 part */}
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
              <h1 className="text-5xl font-bold mb-8 text-center">Log In</h1>
              {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
              <div className="mb-6">
                <button
                  onClick={loginWithGoogle}
                  className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300 flex items-center justify-center"
                >
                  <FaGoogle className="mr-2" />
                  Log In with Google
                </button>
              </div>
              <form onSubmit={handleSubmit(login)}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    {...register("email", {
                      required: true,
                      validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                          "Email address must be a valid address",
                      }
                    })}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </div>
                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <p className="text-gray-600 text-sm">
                Not registered?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SignIn;
