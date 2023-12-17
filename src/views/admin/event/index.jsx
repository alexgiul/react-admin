import React, { useState, useEffect, useCallback  } from 'react';
import axios from 'axios';

import DeleteAlert from "components/deleteAlert"

import {
  columnsDataDevelopment,
  columnsEventData
} from "./variables/columnsData";

import Card from "components/card";
import DevelopmentTable from "./components/DevelopmentTable";
import EventCrud from "./components/EventCrud";

const Event = () => {
  // State to store the list of clients in the main table
  const [data, setData] = useState([]);

  const [eventListData, setEventListData] = useState([]);
  const [eventData, setEventData] = useState([]);

  // State to control the visibility of the drawer
  const [isDrawerVisible, setDrawerVisible] = useState(false);

  // State to control the visibility of the drawer
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false);
  
  // State to store the data passed to the drawer
  const [clientData, setClientData] = useState(null);

  // State to store the drawer title
  const [drawerTitle, setDrawerTitle] = useState('Edit a Record');

  const AIRTABLE_API_KEY = 'patKbNvlIAqFrOWxI.0b6e9252581c21670ccf0ef91ada9fdc3ad818d6e8d7f53f5c93ea519974c855';
  const AIRTABLE_APP_ID = 'appUIzUaOX3gMsEUg';


  // Method to retrieve client from the database
  const fetchClientData = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://api.airtable.com/v0/' + AIRTABLE_APP_ID + '/client',
        {
          headers: {
            Authorization: 'Bearer ' + AIRTABLE_API_KEY,
          },
        }
      );

      const map1 = response.data.records.map((x) => {
        return {
          id: x.id,
          id_client:x.fields.id_client,
          "name": x.fields.name,
          "name_spouse": x.fields.name_spouse,
          "birth_date": x.fields.birth_date,
          "birth_date_2": x.fields.birth_date_2,
          "end_date": x.fields.end_date,
          "tax_rate": x.fields.tax_rate,
          "pir_rate": x.fields.pir_rate,
          "investment_assets": x.fields.investment_assets,
          'notes': x.fields.notes,
          "actions": { "actionType": "edit", "actionLabel": "Edit" }
        };
      });
      setData(map1);
      //console.log(response.data.records);
    } catch (error) {
      console.error('Error fetching data from Airtable:', error);
    }
  }, []);

  // Method to retrieve client's events from the database
  const fetchClientEvents = useCallback(async (clientData) => {
    console.log(clientData);

      try {
        const response = await axios.get(
          'https://api.airtable.com/v0/' + AIRTABLE_APP_ID + `/event?filterByFormula=({client}=${clientData.id_client})`,
          {
            headers: {
              Authorization: 'Bearer ' + AIRTABLE_API_KEY,
            },
          }
        );
  
        const map1 = response.data.records.map((x) => {
          return {            
            id: x.id,
            id_event: x.fields.id_event,
            "name": x.fields.name,
            "date": x.fields.date,
            "client": x.fields.client,
            "notes": x.fields.notes,
            "actions": { "actionType": "edit", "actionLabel": "Edit" }
 
          };
        });
        setEventListData(map1);
        //console.log(response.data.records);
      } catch (error) {
        console.error('Error fetching event data from Airtable:', error);
      }
    }, []);

  useEffect(() => {
    fetchClientData();
    setClientData(null);
  }, [fetchClientData]);

   // Method to handle the button click and show the client events 
   const handleEditButtonClick = (data) => {
    console.log("handleEditButtonClick");
    setClientData(data);
    fetchClientEvents(data);
  };

  // Method to handle the button click and show the drawer with data
  const handleNewEventButtonClick = (data) => {
    console.log("handleNewEventButtonClick");    
    setEventData(null);
    setDrawerTitle('Add a event');
    setDrawerVisible(true);
  };

  // Method to handle the button click and show the drawer with data
  const handleEditEventButtonClick = (obj) => {
    console.log("handleEditEventButtonClick");
    console.log(obj);
    setEventData(obj);    
    setDrawerTitle('Update an event');
    setDrawerVisible(true);    
  };

  // Method to handle the button click and show alert before delete an event
  const handleDeleteEventButtonClick = (data) => {
    console.log("handleDeleteEventButtonClick");
    setEventData(data);
    setDeleteAlertVisible(true);
  };  

  // Method to handle the drawer (event crud) close event
  const handleDrawerClose = () => {
    console.log("handleDrawerClose");
    setDrawerVisible(false);
  };

  // Method to handle the drawer (event crud) close event
  const handleOnSaveEventData = (eventData) => {
    console.log("handleOnSaveEventData op:" + eventData.op);
    console.log(eventData);
    setDrawerVisible(false);

    // Call the updateRecord function to update the record on Airtable
    if(eventData.op === 'update')
      updateEventRecord(eventData);
    if(eventData.op === 'insert')
      createEventRecord(clientData, eventData);
    
    // refresh event table table
    fetchClientEvents(clientData);
  };


  const createEventRecord = async (clientData, data) => {
    try {
      var updatedFields = {        
        "name": data.name,
        "date": data.date,
        "notes": data.notes,
        "client": [clientData.id],
      };
      
      const response = await axios.post(
        `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/event`,
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

  const updateEventRecord = async (data) => {
    try {
      var updatedFields = {        
        "name": data.name,
        "date": data.date,
        "notes": data.notes        
      };
      
      // put -> destructive update
      const response = await axios.patch(
        `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/event/${data.id}`,
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

  const deleteEventRecord = async (data) => {
    try {
      
      const response = await axios.delete(
        `https://api.airtable.com/v0/${AIRTABLE_APP_ID}/event/${data.id}`,        
        {
          headers: {
            Authorization: 'Bearer ' + AIRTABLE_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Record deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting data from Airtable:', error);
    }
  };

  // no action on delete
  const handleNoActionOnDelete = () => {
    setDeleteAlertVisible(false);    
  };

  // delete action on database
  const handleActionOnDelete = (data) => {
    console.log("handleActionOnDelete " + data);

    deleteEventRecord(data);
    setDeleteAlertVisible(false);
    fetchClientEvents(clientData);
  };  

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="mt-5  h-full">
        
        <Card extra={"w-full h-full p-4"}>
          <div class="relative flex items-center justify-between">
            <div class="text-xl font-bold text-navy-700 dark:text-white">
              Clients
            </div>

          </div>
          <DevelopmentTable
            columnsData={columnsDataDevelopment}
            tableData={data}
            onActionEditButtonClick={handleEditButtonClick}
            showDelete={false}            
          />
        </Card>
      </div>

      {clientData ? (
      <div className="mt-5  h-full">
        <EventCrud data={eventData} title={drawerTitle} visible={isDrawerVisible} onSubmit={handleOnSaveEventData} onClose={handleDrawerClose} />
        <DeleteAlert data={eventData} visible={isDeleteAlertVisible} onActionCancel={handleNoActionOnDelete} onActionDelete={handleActionOnDelete} />

        <Card extra={"w-full h-full p-4"}>
          <div class="relative flex items-center justify-between">
            <div class="text-xl font-bold text-navy-700 dark:text-white">
              Events
            </div>
            <button onClick={handleNewEventButtonClick} className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
              Add new event
            </button>

          </div>
          <DevelopmentTable
            columnsData={columnsEventData}
            tableData={eventListData}
            onActionEditButtonClick={handleEditEventButtonClick}
            onActionDeleteButtonClick={handleDeleteEventButtonClick}
            showDelete={true}
            
          />
        </Card>
      </div>
      ) : (<></>)}
    </div>
  );
};

export default Event;
