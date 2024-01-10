import React, { useState, useEffect, useCallback  } from 'react';
import axios from 'axios';
import apiService from 'apiService';
import  { jwtDecode } from 'jwt-decode';

import {
  Button,
} from '@chakra-ui/react'
import DeleteAlert from "components/deleteAlert"

import {
  columnsDataDevelopment,
} from "./variables/columnsData";

import Card from "components/card";
import DevelopmentTable from "./components/DevelopmentTable";
import UserCrud from "./components/UserCrud";

const UserOverview = () => {
  const [data, setData] = useState([]);

  // State to control the visibility of the drawer
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  // State to control the visibility of the drawer
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
  
  // State to store the data passed to the drawer
  const [drawerData, setDrawerData] = useState(null);

  // State to store the drawer title
  const [drawerTitle, setDrawerTitle] = useState('Edit a Record');

  const AIRTABLE_API_KEY = 'patKbNvlIAqFrOWxI.0b6e9252581c21670ccf0ef91ada9fdc3ad818d6e8d7f53f5c93ea519974c855';
  const AIRTABLE_APP_ID = 'appUIzUaOX3gMsEUg';
  

  // Method to retrieve data from the database
  const fetchData = useCallback(async () => {
    try {
      const response = await apiService.get('http://127.0.0.1:8000/v1/users');

      const map1 = response.data.map((x) => {
        return {
          id: x.id,
          "username": x.username,          
          "actions": { "actionType": "edit", "actionLabel": "Edit" }
        };
      });
      setData(map1);
      //console.log(response.data.records);
    } catch (error) {
      console.error('Error fetching data from backend:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  // Method to handle the button click and show the drawer with data
  const handleNewButtonClick = (data) => {
    console.log("handleNewButtonClick");
    setDrawerData(null);
    setDrawerTitle('Add a user');
    setDrawerVisible(true);
  };

  // Method to handle the button click and show the drawer with data
  const handleEditButtonClick = (data) => {
    console.log("handleEditButtonClick");
    setDrawerData(data);
    setDrawerTitle('Edit a user');
    setDrawerVisible(true);
  };

  // Method to handle the button click and show the drawer with data
  const handleDeleteButtonClick = (data) => {
    console.log("handleDeleteButtonClick");
    setDrawerData(data);
    setDeleteAlertVisible(true);
  };  

  // Method to handle the drawer close event
  const handleDrawerClose = () => {
    console.log("handleDrawerClose");
    setDrawerVisible(false);
  };

  // Method to handle the drawer close event
  const handleOnSaveData = (data) => {
    console.log("handleOnSaveData op:" + data.op);
    console.log(data);
    setDrawerVisible(false);

    // Call the updateRecord function to update the record on Airtable
    if(data.op === 'update')
      updateRecord(data);
    if(data.op === 'insert')
      createRecord(data);
    
    // refresh table
    fetchData();
  };


  const createRecord = async (data) => {
    try {
      var updatedFields = {        
        "name": data.name,
        "name_spouse": data.name_spouse,
        "birth_date": data.birth_date,
        "birth_date_2": data.birth_date_2,
        "end_date": data.end_date,
        "tax_rate": parseFloat(data.tax_rate),
        "pir_rate": parseFloat(data.pir_rate),
        "investment_assets": parseFloat(data.investment_assets),
      };
      
      const response = await axios.post(
        `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/client`,
        { fields: updatedFields },
        {
          headers: {
            Authorization: 'Bearer ' + AIRTABLE_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Record created successfully:', response.data);
    } catch (error) {
      console.error('Error creating data from Airtable:', error);
    }
  };

  const updateRecord = async (data) => {
    try {
      var updatedFields = {        
        "name": data.name,
        "name_spouse": data.name_spouse,
        "birth_date": data.birth_date,
        "birth_date_2": data.birth_date_2,
        "end_date": data.end_date,
        "tax_rate": data.tax_rate,
        "pir_rate": data.pir_rate,
        "investment_assets": data.investment_assets,
      };
      
      const response = await axios.put(
        `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/client/${data.id}`,
        { fields: updatedFields },
        {
          headers: {
            Authorization: 'Bearer ' + AIRTABLE_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Record updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating data from Airtable:', error);
    }
  };

  const deleteRecord = async (data) => {
    try {
      
      const response = await axios.delete(
        `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/client/${data.id}`,        
        {
          headers: {
            Authorization: 'Bearer ' + AIRTABLE_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Record deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deeting data from Airtable:', error);
    }
  };

  // no action on delete
  const handleNoActionOnDelete = () => {
    setDeleteAlertVisible(false);    
  };

  // delete action on database
  const handleActionOnDelete = (data) => {
    deleteRecord(data);
    setDeleteAlertVisible(false);
    fetchData();
  };  

  // Method to retrieve data from the database
  const refreshToken = async () => {

    
    try {
      const response = await axios.post('http://localhost:8000/refresh-token',  {},       
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("authToken"),
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
  
      console.log(response.data);

      const decodedToken = jwtDecode(response.data.access_token);

      if (decodedToken.exp) {
        const expirationTimestamp = decodedToken.exp;
        const currentTimestamp = Math.floor(Date.now() / 1000);
  
        console.log(expirationTimestamp);
        console.log(currentTimestamp);
        console.log(expirationTimestamp - currentTimestamp);
      }

    } catch (error) {
      console.error('Error fetching tokens from backend:', error);
    }
  };

  return (


    <div className="flex w-full flex-col gap-5">
      <div className="mt-5  h-full">

        <Button variant='outline' mr={3} onClick={refreshToken}>   Refresh token </Button>


        <UserCrud data={drawerData} title={drawerTitle} visible={isDrawerVisible} onSubmit={handleOnSaveData} onClose={handleDrawerClose} />
        <DeleteAlert data={drawerData} visible={isDeleteAlertVisible} onActionCancel={handleNoActionOnDelete} onActionDelete={handleActionOnDelete} />

        <Card extra={"w-full h-full p-4"}>
          <div class="relative flex items-center justify-between">
            <div class="text-xl font-bold text-navy-700 dark:text-white">
              Users
            </div>
            <button onClick={handleNewButtonClick} className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
              Add new record
            </button>

          </div>
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={data}
            onActionEditButtonClick={handleEditButtonClick}
            onActionDeleteButtonClick={handleDeleteButtonClick}
          />
        </Card>
      </div>

    </div>
  );
};

export default UserOverview;
