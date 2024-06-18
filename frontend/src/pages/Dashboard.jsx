import React from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Userscomponent } from "../components/Userscomponent";

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <Balance value={"10,000"} />
      <Userscomponent />
    </div>
  );
};

export default Dashboard;
