import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import elementService from "@/services/elementService"; // Actualiza la importación
import Modal from "@/core/components/Shared/Modal/Modal";
import { useAuth } from "@/core/context/AuthContext";
import useSensors from "@/core/hooks/useSensors";

const ElementForm = ({ element, onClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      location: "",
      sensors: [],
    },
  });
  const { sensors } = useSensors();
  const { showSnackbar } = useAuth();

  useEffect(() => {
    if (element) {
      setValue("name", element.name);
      setValue("location", element.location);
      setValue(
        "sensors",
        element.sensors.map((sensor) => sensor.id)
      );
    }
  }, [element, setValue]);

  const onSubmit = async (data) => {
    try {
      const selectedSensors = sensors.filter((sensor) =>
        data.sensors.includes(sensor.id)
      );
      const updatedElement = { ...data, sensors: selectedSensors };
      if (element) {
        await elementService.updateElement(element.id, updatedElement);
        showSnackbar("Element updated successfully!", "success");
      } else {
        await elementService.createElement(updatedElement);
        showSnackbar("Element created successfully!", "success");
      }
      onClose();
    } catch (error) {
      showSnackbar("Failed to save element.", "error");
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      title={element ? "Edit Element" : "Add New Element"}
    >
      <form
        className="flex flex-col gap-4 min-w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="name" className="block font-bold text-sm mb-1">
            Name:
          </label>
          <input
            id="name"
            name="name"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="location" className="block font-bold text-sm mb-1">
            Location:
          </label>
          <input
            id="location"
            name="location"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && (
            <p className="text-red-600 text-sm">{errors.location.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="sensors" className="block font-bold text-sm mb-1">
            Sensors:
          </label>
          <select
            id="sensors"
            name="sensors"
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 bg-white rounded"
            multiple
            {...register("sensors", {
              
            })}
          >
            {sensors.map((sensor) => (
              <option key={sensor.id} value={sensor.id}>
                {sensor.type} -{sensor.value}- {sensor.driver} -{" "}
                {sensor.status ? "Active" : "Inactive"}
              </option>
            ))}
          </select>
          {errors.sensors && (
            <p className="text-red-600 text-sm">{errors.sensors.message}</p>
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
            {element ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ElementForm;
