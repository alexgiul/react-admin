import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';


export default function Register() {

  const navigate = useNavigate();

  const adminEmail = 'admin@example.com';
  const adminPassword = 'qwerty';

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('qwerty');

  const googleLogin = () => {

    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");

    var auth_provider = "google-oidc"
    var login_url = process.env.REACT_APP_BACKEND + '/signup-redirect?auth_provider=' + auth_provider
    window.location.href = login_url
  }

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
          localStorage.setItem('userInfo', JSON.stringify({ "sub": "116655830157832967236", "name": "AChuck Norris", "given_name": "Chuck", "family_name": "Norris", "picture": "https://lh3.googleusercontent.com/a/ACg8ocKr2_xSChXoJh707_7Io8KG9pU-54Lyd0PRfvx25nMALIg=s96-c", "email": "chuck.norris@gmail.com", "email_verified": true, "locale": "en" }));


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

        <div className="mb-6 mt-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <p className="text-base text-gray-600 dark:text-white"> or </p>
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        <form onSubmit={(e) => handleLogin(e)}>
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
          
          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}
