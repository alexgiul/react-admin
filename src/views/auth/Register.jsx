import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';


export default function Register() {

  const navigate = useNavigate();

  const googleLogin = () => {

    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");

    var auth_provider = "google-oidc"
    var login_url = process.env.REACT_APP_BACKEND + '/signup-redirect?auth_provider=' + auth_provider
    window.location.href = login_url
  }


  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   if (userInfo) {
  //     // const result = await axios.get("https://api.chucknorris.io/jokes/random");
  //     // console.log(result.data.value);

  //     axios
  //       .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInfo.access_token}`, {
  //         headers: {
  //           Authorization: `Bearer ${userInfo.access_token}`,
  //           Accept: 'application/json'
  //         }
  //       })
  //       .then((res) => {
  //         console.log("Got User Pofile")
  //         console.log(res.data);
  //         setProfileInfo(res.data.value);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };


  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">

      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Create a new account
        </h4>

        <div className="mb-6 mt-6 flex items-center  gap-3 justify-center">
          <button onClick={() => googleLogin()} className="border-2 p-2 rounded-md flex items-center space-x-2">
            <img width="30" height="30" src="https://img.icons8.com/color/30/google-logo.png" alt="google-logo" />
            <span>Sign up with Google</span>
          </button>
        </div>

      </div>
    </div>
  );
}
