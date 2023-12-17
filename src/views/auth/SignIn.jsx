import React, { useState } from "react";
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';


export default function SignIn() {

  const navigate = useNavigate();



  const adminEmail = 'admin@example.com';
  const adminPassword = 'qwerty';

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('qwerty');

  const login = useGoogleLogin({

    onSuccess: async (response) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          },
        })
        if (res) {
          localStorage.setItem("userInfo", JSON.stringify(res.data))
          console.log(res.data)
          navigate("/admin")
        }
      } catch (error) {
        console.log(error)
      }
    }
  });


  const handleLogin = e => {
    e.preventDefault();
    console.log(e);
    console.log(email + " - " + password);
    if (email === adminEmail && password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('userInfo', JSON.stringify({"sub":"116655830157832967236","name":"AChuck Norris","given_name":"Chuck","family_name":"Norris","picture":"https://lh3.googleusercontent.com/a/ACg8ocKr2_xSChXoJh707_7Io8KG9pU-54Lyd0PRfvx25nMALIg=s96-c","email":"chuck.norris@gmail.com","email_verified":true,"locale":"en"}));
          

          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/admin")
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  };

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
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        {/* <GoogleLogin onSuccess={responseOutput} onError={errorOutput} /> */}
        <button onClick={() => login()} className="border-2 p-2 rounded-md flex items-center space-x-2">
          <img width="30" height="30" src="https://img.icons8.com/color/30/google-logo.png" alt="google-logo" />
          <span>Sign in with Google</span>
        </button>

        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        <form onSubmit={(e) =>handleLogin(e)}>
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}            
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
        </form>
      </div>
    </div>
  );
}
