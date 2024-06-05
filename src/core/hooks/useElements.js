import { useState, useEffect, useCallback } from "react";
import elementService from "@/services/elementService";
import natsService from "@/services/natsService";
import { useAuth } from "@/core/context/AuthContext";

/**
 * Hook que gestiona el estado de los elementos y sus operaciones relacionadas.
 *
 * @returns {Object} - El estado de los elementos, la función para recargar los elementos y el estado de carga.
 * @property {Array} elements - Lista de elementos.
 * @property {Function} fetchElements - Función para recargar los elementos desde el servicio.
 * @property {Boolean} loading - Indicador de si los elementos están siendo cargados.
 *
 */
const useElements = () => {
  const { showSnackbar } = useAuth();
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchElements = useCallback(async () => {
    try {
      const elements = await elementService.getAllElements();
      setElements(elements);
    } catch (error) {
      showSnackbar("Error fetching sensors: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchElements();

    const handleElementCreated = () => {
      fetchElements();
    };

    const handleElementUpdated = () => {
      fetchElements();
    };

    const handleElementDeleted = () => {
      fetchElements();
    };

    //Me suscribo también a lo cambios en los sensores porque los elementos lo utilizan
    try {
      natsService.subscribe("sensor.created", handleElementCreated);
      natsService.subscribe("sensor.updated", handleElementUpdated);
      natsService.subscribe("element.created", handleElementCreated);
      natsService.subscribe("element.updated", handleElementUpdated);
      natsService.subscribe("element.deleted", handleElementDeleted);
    } catch (error) {
      showSnackbar("Error connecting to NATS: " + error.message, "error");
    }
  }, [fetchElements]);

  return { elements, fetchElements, loading };
};

export default useElements;
