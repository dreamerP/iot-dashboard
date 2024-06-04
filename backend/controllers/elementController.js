const elementService = require("../services/elementService");

/**
 * Obtiene todos los elementos.
 *
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
exports.getAllElements = (req, res) => {
  const elements = elementService.getAllElements();
  res.json(elements);
};

/**
 * Obtiene un elemento por su ID.
 *
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
exports.getElementById = (req, res) => {
  const element = elementService.getElementById(req.params.id);
  if (!element) {
    return res.status(404).json({ message: "Element not found" });
  }
  res.json(element);
};

/**
 * Crea un nuevo elemento.
 *
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
exports.createElement = (req, res) => {
  const newElement = elementService.createElement(req.body);
  res.status(201).json(newElement);
};

/**
 * Actualiza un elemento existente.
 *
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
exports.updateElement = (req, res) => {
  const updatedElement = elementService.updateElement(req.params.id, req.body);
  if (!updatedElement) {
    return res.status(404).json({ message: "Element not found" });
  }
  res.json(updatedElement);
};

/**
 * Elimina un elemento.
 *
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
exports.deleteElement = (req, res) => {
  const isDeleted = elementService.deleteElement(req.params.id);
  if (!isDeleted) {
    return res.status(404).json({ message: "Element not found" });
  }
  res.status(204).send();
};

/**
 * Añade un sensor a un elemento.
 *
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
exports.addSensorToElement = (req, res) => {
  const { elementId, sensor } = req.body;
  const updatedElement = elementService.addSensorToElement(elementId, sensor);
  if (!updatedElement) {
    return res.status(404).json({ message: "Element not found" });
  }
  res.json(updatedElement);
};

/**
 * Elimina un sensor de un elemento.
 *
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 */
exports.removeSensorFromElement = (req, res) => {
  const { elementId, sensorId } = req.body;
  const updatedElement = elementService.removeSensorFromElement(
    elementId,
    sensorId
  );
  if (!updatedElement) {
    return res.status(404).json({ message: "Element or Sensor not found" });
  }
  res.json(updatedElement);
};
