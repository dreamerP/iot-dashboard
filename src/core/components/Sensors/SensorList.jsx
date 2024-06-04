import React, { useState } from "react";
import SensorTable from "@/core/components/Sensors/SensorTable";
import SensorForm from "@/core/components/Sensors/SensorForm";
import sensorService from "@/services/sensorService";
import ConfirmationModal from "@/core/components/Shared/ConfirmationForm/ConfirmationForm";
import useSensors from "@/core/hooks/useSensors";
import { useAuth } from "@/core/context/AuthContext";

const SensorList = () => {
  const { sensors, fetchSensors, loading } = useSensors();
  const [editingSensor, setEditingSensor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [selectedSensors, setSelectedSensors] = useState([]);
  const { showSnackbar } = useAuth();

  const handleSelectionChanged = (selectedRows) => {
    setSelectedSensors(selectedRows.map((row) => row.id));
  };

  const handleMultipleDelete = async () => {
    try {
      for (const sensorId of selectedSensors) {
        await sensorService.deleteSensor(sensorId);
      }
      setSelectedSensors([]);
      fetchSensors();
      showSnackbar("Sensors deleted successfully!", "success");
    } catch (error) {
      showSnackbar("Failed to delete sensors.", "error");
    }
  };

  const handleEdit = (sensor) => {
    setEditingSensor(sensor);
    setShowForm(true);
  };

  const handleDelete = (sensor) => {
    setSelectedSensor(sensor);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedSensor) {
        await sensorService.deleteSensor(selectedSensor.id);
        fetchSensors();
        showSnackbar("Sensor deleted successfully!", "success");
      }
      setShowModal(false);
      setSelectedSensor(null);
    } catch (error) {
      showSnackbar("Failed to delete sensor.", "error");
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedSensor(null);
  };

  const handleCloseForm = () => {
    setEditingSensor(null);
    setShowForm(false);
    fetchSensors();
  };

  return (
    <div className="grid grid-cols-12 p-4 gap-6">
      <div className="col-span-12 flex justify-between p-3">
        <div className="flex text-2xl font-sans text-slate-600 p-3">
          <h3>Sensor List</h3>
        </div>
        <div className="flex justify-end p-3">
          <button
            className="bg-blue-500 text-white text-md p-1 w-32 rounded-md mr-4 flex items-center"
            onClick={() => setShowForm(true)}
          >
            <img src="plus_ico_white.svg" alt="Edit" className="w-6 h-5" />
            New Sensor
          </button>
          <button
            className="bg-red-500 text-white text-md p-1 w-32 rounded-md flex items-center"
            onClick={handleMultipleDelete}
            disabled={selectedSensors.length === 0}
          >
            <img src="delete_ico_white.svg" alt="Edit" className="w-6 h-5" />
            Delete ({selectedSensors.length})
          </button>
        </div>
      </div>
      <div className="col-span-12">
        <SensorTable
          sensors={sensors}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelectionChanged={handleSelectionChanged}
        />
        {showForm && (
          <div className="modal">
            <SensorForm sensor={editingSensor} onClose={handleCloseForm} />
          </div>
        )}
        {showModal && (
          <ConfirmationModal
            open={showModal}
            title="Confirm Deletion"
            message={`Are you sure you want to delete the sensor: ${selectedSensor?.type}?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </div>
  );
};

export default SensorList;
