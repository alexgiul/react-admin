import FixedPlugin from "components/fixedPlugin/FixedPlugin";

import Register from "views/auth/Register";
import BasicInfo from "views/auth/BasicInfo";

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export default function OnboardingLayout() {

  const [onboardingState, setOnbardingState] = useState(0);

  useEffect(() => {

    // Retrieve the JWT token from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const jwtToken = urlParams.get('authToken');

    if (jwtToken) {

      // You can now use the JWT token as needed, for example, store it in state or local storage
      // console.log('JWT Token:', jwtToken);
      // Optionally, you can remove the token from the URL to enhance security
      window.history.replaceState({}, document.title, window.location.pathname);

      // Decode the token
      try {
        const decoded = jwtDecode(jwtToken);
        localStorage.setItem("userInfo", JSON.stringify(decoded))
        localStorage.setItem("authToken", jwtToken)
        setOnbardingState(1);

      } catch (error) {
        console.error('Error decoding token:', error.message);
      }


    } else {
      console.error('JWT Token not found in the URL');
    }


  }, []);


  let componentToRender;

  if (onboardingState === 0) {
    componentToRender = <Register />;
  } else {
    componentToRender = <BasicInfo />;
  }

  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">

                {componentToRender}

              </div>
              {/* <Footer /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
