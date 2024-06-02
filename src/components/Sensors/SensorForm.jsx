import React, { useState, useEffect } from 'react';
import sensorService from '@/services/sensorService';
import Modal from '@/components/Shared/Modal/Modal';

const SensorForm = ({ sensor, onClose }) => {
  const [type, setType] = useState(sensor ? sensor.type : '');
  const [driver, setDriver] = useState(sensor ? sensor.driver : '');
  const [status, setStatus] = useState(sensor ? sensor.status : '');
  const [value, setValue] = useState(sensor ? sensor.value : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sensorData = { type, driver, status, value };
    if (sensor) {
      await sensorService.updateSensor(sensor.id, sensorData);
    } else {
      await sensorService.createSensor(sensorData);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={'Add new sensor'}>
      <form className="flex flex-col gap-4 min-w-96" onSubmit={handleSubmit}>
        <div>
          <label className="block font-bold text-sm mb-1">Type:</label>
          <input
            className='className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"'
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-sm mb-1">Driver:</label>
          <input
            className='className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"'
            type="text"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-bold text-sm mb-1">Status:</label>
          <select
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 bg-white rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block font-bold text-sm mb-1">Value:</label>
          <input
            className='className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"'
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="mr-4 border border-solid border-blue-500 hover:bg-gray-200 text-md p-1 w-24 rounded-md"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-md p-1 w-24 rounded-md"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SensorForm;
