import React, { useEffect, useState } from "react";
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
//import { GoogleLogin  } from '@react-oauth/google';
import axios from 'axios';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'

const responseOutput = (response) => {
  console.log(response);
};
const errorOutput = (error) => {
  console.log(error);
};

export default function SignIn() {

  const [userInfo, setUserInfo] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (response) => setUserInfo(response),
    onError: (error) => console.log(`Login Failed: ${error}`,)
  });

  const logOut = () => {
    googleLogout();
    setProfileInfo(null);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (userInfo) {
      // const result = await axios.get("https://api.chucknorris.io/jokes/random");
      // console.log(result.data.value);

      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInfo.access_token}`, {
          headers: {
            Authorization: `Bearer ${userInfo.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          console.log("Got User Pofile")
          console.log(res.data);
          setProfileInfo(res.data.value);
        })
        .catch((err) => console.log(err));
      }    
  };


  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        <GoogleLogin onSuccess={responseOutput} onError={errorOutput} />

        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Sign In
        </button>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
