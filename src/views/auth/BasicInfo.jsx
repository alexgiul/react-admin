import React, { useState, useEffect } from "react";
import InputField from "components/fields/InputField";
import SelectField from "components/fields/SelectField";
import { useNavigate } from "react-router-dom"
import apiService from 'apiService';

export default function BasicInfo() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [company, setCompany] = useState('');
  const [language, setLanguage] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userRegistrationData = {
      'email': email,
      'givenName': givenName,
      'familyName': familyName,
      'company': company,
      'language': language

    }
    //console.log(userRegistrationData);

    // some checks
    /*
    if (notesInput !== '' && ownerSelect !== '' && categorySelect !== '' && assocContactSelect !== '' && assocCompanySelect !== '') {
        console.log(addClientObject);
    }
    */
    apiService.post(process.env.REACT_APP_BACKEND + '/auth/register', userRegistrationData)
      .then((response) => {
        console.log("Got User Pofile")
        navigate("/admin");
      })
      .catch(function (error) {
        if (error.response) {
          setErrorMessage(error.response.data['detail'] + 'Please proceed with <a href="/" class="underline" >login</>');
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

  }


  useEffect(() => {
    // Decode the token
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setEmail(userInfo.email);
      setGivenName(userInfo.given_name);
      setFamilyName(userInfo.family_name);
    } catch (error) {
      console.error('Error decoding token:', error.message);
    }

  }, []);




  return (
    <div className="mt-10 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-center">
      {/* Sign in section */}
      <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Welcome to WideOpen!
        </h4>

        <p className="mb-4 font-bold text-navy-700 dark:text-white">
          Let's start with few things about you
        </p>


        <form onSubmit={(e) => handleSubmit(e)} >


          <InputField
            extra="mb-3"
            label="Email*"
            placeholder="email"
            id="email"
            type="text"
            value={email}
            required={true}
            disabled={true}
            errorMessage={errorMessage}
            onChange={e => setEmail(e.target.value)}
          />

          <InputField
            extra="mb-3"
            label="First Name*"
            placeholder="givenName"
            id="givenName"
            type="text"
            required={true}
            value={givenName}
            onChange={e => setGivenName(e.target.value)}
          />

          <InputField
            extra="mb-3"
            label="Last Name*"
            placeholder="familyName"
            id="familyName"
            type="text"
            required={true}
            value={familyName}
            onChange={e => setFamilyName(e.target.value)}
          />

          <InputField
            extra="mb-3"
            label="Company*"
            placeholder="company"
            id="company"
            type="text"
            value={company}
            required={true}
            onChange={e => setCompany(e.target.value)}
          />

          <SelectField
            extra="mb-3"
            label="language*"
            id="language"
            value={company}
            onChange={e => setLanguage(e.target.value)}
          />

          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            Complete Onboarding
          </button>

        </form>
      </div>
    </div>
  );
}
