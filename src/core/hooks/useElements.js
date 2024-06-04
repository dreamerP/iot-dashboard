import { useState, useEffect, useCallback } from "react";
import elementService from "@/services/elementService";
import natsService from "@/services/natsService";

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
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchElements = useCallback(async () => {
    try {
      const elements = await elementService.getAllElements();
      setElements(elements);
    } catch (error) {
      console.error("Error fetching elements:", error);
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
    natsService.subscribe("sensor.created", handleSensorCreated);
    natsService.subscribe("sensor.updated", handleSensorUpdated);
    natsService.subscribe("element.created", handleElementCreated);
    natsService.subscribe("element.updated", handleElementUpdated);
    natsService.subscribe("element.deleted", handleElementDeleted);
  }, [fetchElements]);

  return { elements, fetchElements, loading };
};

export default useElements;
