import { useState, useEffect, useCallback } from "react";
import sensorService from "@/services/sensorService";
import natsService from "@/services/natsService";

const useSensors = () => {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSensors = useCallback(async () => {
    try {
      const sensors = await sensorService.getAllSensors();
      setSensors(sensors);
    } catch (error) {
      console.error("Error fetching sensors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSensors();

    const handleSensorCreated = () => {
      fetchSensors();
    };

    const handleSensorUpdated = () => {
      fetchSensors();
    };

    const handleSensorDeleted = () => {
      fetchSensors();
    };

    natsService.subscribe("sensor.created", handleSensorCreated);
    natsService.subscribe("sensor.updated", handleSensorUpdated);
    natsService.subscribe("sensor.deleted", handleSensorDeleted);
  }, [fetchSensors]);

  return { sensors, fetchSensors, loading };
};

export default useSensors;
