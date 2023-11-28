import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";
import React from "react";
import {
  columnsDataDevelopment,
} from "./variables/columnsData";
import tableDataDevelopment from "./variables/tableDataDevelopment.json";
import DevelopmentTable from "./components/DevelopmentTable";
import Form from "components/form";
// chakra

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import InputField from "components/fields/InputField";
import TextField from "components/fields/InputField";
import Checkbox from "components/checkbox";

const fields = [
  {
    label: "Main Dashboard",
    component: <InputField />,
  },
  {
      label: "text field",
      component: <TextField />,
    },
    
  {
    label: "Clients",
    component: <Checkbox />,
  }
];



const ClientOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
      </div>
      <div className="flex w-full flex-col gap-5 z-0">
        <Form icon={<MdChevronLeft className="ml-1 h-6 w-6 " />} title="Test" subtitle="Sub title" fields={fields} />        
      </div>

      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-4 lg:!mb-0">
          <Banner />
        </div>

        <div className="col-span-3 lg:!mb-0">
          <Storage />
        </div>

        <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div>
      </div>
      {/* all project & ... */}

      <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
          <Project />
        </div>
        <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-5">
          <General />
        </div>

        <div className="col-span-5 lg:col-span-12 lg:mb-0 3xl:!col-span-3">
          <Notification />
        </div>
      </div>
    </div>
  );
};

export default ClientOverview;
