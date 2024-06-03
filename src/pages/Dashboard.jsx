import DefaultLayout from "@/core/components/Layout/DefaultLayout";
import SensorList from "@/core/components/Sensors/SensorList";
import React from "react";

const Dashboard = () => {
  return (
    <DefaultLayout>
      <SensorList />
    </DefaultLayout>
  );
};

export default Dashboard;
