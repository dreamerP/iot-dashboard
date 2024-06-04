import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import sensorService from "@/services/sensorService";
import Modal from "@/core/components/Shared/Modal/Modal";
import { useAuth } from "@/core/context/AuthContext";

const SensorForm = ({ sensor, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      driver: "",
      status: "",
      value: null,
    },
  });

  const { showSnackbar } = useAuth();
  
  useEffect(() => {
    if (sensor) {
      setValue("type", sensor.type);
      setValue("driver", sensor.driver);
      setValue("status", sensor.status);
      setValue("value", sensor.value);
    }
  }, [sensor, setValue]);

  const onSubmit = async (data) => {
    try {
      data.value = parseFloat(data.value);
      if (sensor) {
        await sensorService.updateSensor(sensor.id, data);
        showSnackbar("Sensor updated successfully!", "success");
      } else {
        await sensorService.createSensor(data);
        showSnackbar("Sensor created successfully!", "success");
      }
      onClose();
    } catch (error) {
      showSnackbar("Failed to save sensor.", "error");
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={sensor ? "Edit Sensor" : "Add New Sensor"}
    >
      <form
        className="flex flex-col gap-4 min-w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="type" className="block font-bold text-sm mb-1">
            Type:
          </label>
          <input
            id="type"
            name="type"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            {...register("type", { required: "Type is required" })}
          />
          {errors.type && (
            <p className="text-red-600 text-sm">{errors.type.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="driver" className="block font-bold text-sm mb-1">
            Driver:
          </label>
          <input
            id="driver"
            name="driver"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            {...register("driver", { required: "Driver is required" })}
          />
          {errors.driver && (
            <p className="text-red-600 text-sm">{errors.driver.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="status" className="block font-bold text-sm mb-1">
            Status:
          </label>
          <select
            id="status"
            name="status"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 bg-white rounded"
            {...register("status", { required: "Status is required" })}
          >
            <option value="">Select status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
          {errors.status && (
            <p className="text-red-600 text-sm">{errors.status.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="value" className="block font-bold text-sm mb-1">
            Value:
          </label>
          <input
            id="value"
            name="value"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            {...register("value", {
              required: "Value is required",
              validate: {
                isNumber: (value) =>
                  !isNaN(parseFloat(value)) || "Value must be a number",
              },
            })}
          />
          {errors.value && (
            <p className="text-red-600 text-sm">{errors.value.message}</p>
          )}
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
          >
            {sensor ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SensorForm;
