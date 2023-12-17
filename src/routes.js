import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

import Client from "views/admin/client";
import Cashflow from "views/admin/cashflow";
import Event from "views/admin/event";
import Profile from "views/admin/profile";

import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/admin/tables";
//import RTLDefault from "views/rtl/default";

// Auth Imports
//import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdEvent,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },

  {
    name: "Clients",
    layout: "/admin",
    path: "clients",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Client />,
  },

  {
    name: "Cash flows",
    layout: "/admin",
    path: "cashflow",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Cashflow />,
  },
  {
    name: "Event",
    layout: "/admin",
    path: "event",
    icon: <MdEvent className="h-6 w-6" />,
    component: <Event />,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },


  {
    name: "(Sample) NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "(Sample) Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },

];
export default routes;
