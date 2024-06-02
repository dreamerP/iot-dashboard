import DefaultLayout from '@/components/Layout/DefaultLayout';
import React, { useState, useEffect } from 'react';
import SensorTable from '@/components/Sensors/SensorList';
import SensorForm from '@/components/Sensors/SensorForm';
import sensorService from '@/services/sensorService';

const Dashboard = () => {
  const [sensors, setSensors] = useState([]);
  const [editingSensor, setEditingSensor] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchSensors = async () => {
      const sensors = await sensorService.getAllSensors();
      setSensors(sensors);
    };
    fetchSensors();
  }, []);

  const handleEdit = (sensor) => {
    setEditingSensor(sensor);
    setShowForm(true);
  };

  const handleDelete = async (sensor) => {
    await sensorService.deleteSensor(sensor.id);
    setSensors(sensors.filter((s) => s.id !== sensor.id));
  };

  const handleCloseForm = () => {
    setEditingSensor(null);
    setShowForm(false);
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-12 p-4 gap-6 ">
        <div className="col-span-12 flex justify-between p-3">
          <div className=" flex text-2xl font-sans text-slate-600 p-3">
            <h3>Sensor List</h3>
          </div>
          <div className=" flex justify-end p-3">
            <button
              className="bg-blue-500 text-white text-md p-1 w-32 rounded-md mr-4 flex items-center"
              onClick={() => setShowForm(true)}
            >
              <img src="plus_ico_white.svg" alt="Edit" className="w-6 h-5" />
              New Sensor
            </button>
            <button
              className="bg-red-500 text-white text-md p-1 w-32 rounded-md flex items-center"
              onClick={() => setShowForm(true)}
            >
              <img src="delete_ico_white.svg" alt="Edit" className="w-6 h-5" />
              Delete (0)
            </button>
          </div>
        </div>
        <div className="col-span-12">
          <SensorTable
            
            sensors={sensors}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {showForm && (
            <div className="modal">
              <SensorForm sensor={editingSensor} onClose={handleCloseForm} />
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
