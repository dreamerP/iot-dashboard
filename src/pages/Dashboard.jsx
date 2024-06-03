import DefaultLayout from '@/components/Layout/DefaultLayout';
import React from 'react';
import SensorList from '@/components/Sensors/SensorList';

const Dashboard = () => {
  return (
    <DefaultLayout>
      <SensorList />
    </DefaultLayout>
  );
};

export default Dashboard;
