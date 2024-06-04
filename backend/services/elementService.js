const fs = require('fs');
const path = require('path');
const elementsFilePath = path.join(__dirname, '../utils/data/elements.json');

// Cargar los elementos del archivo JSON
let elements = JSON.parse(fs.readFileSync(elementsFilePath, 'utf-8'));

/**
 * Obtiene todos los elementos.
 * 
 * @returns {Array} Lista de todos los elementos.
 */
exports.getAllElements = () => {
  return elements;
};

/**
 * Obtiene un elemento por su ID.
 * 
 * @param {string} id - ID del elemento.
 * @returns {Object|null} Elemento encontrado o null si no existe.
 */
exports.getElementById = (id) => {
  return elements.find(element => element.id === id);
};

/**
 * Crea un nuevo elemento.
 * 
 * @param {Object} elementData - Datos del nuevo elemento.
 * @returns {Object} Elemento creado.
 */
exports.createElement = (elementData) => {
  const newElement = { id: String(elements.length + 1), sensors: [], ...elementData };
  elements.push(newElement);
  fs.writeFileSync(elementsFilePath, JSON.stringify(elements, null, 2));
  return newElement;
};

/**
 * Actualiza un elemento existente.
 * 
 * @param {string} id - ID del elemento a actualizar.
 * @param {Object} elementData - Datos del elemento actualizado.
 * @returns {Object|null} Elemento actualizado o null si no existe.
 */
exports.updateElement = (id, elementData) => {
  const index = elements.findIndex(element => element.id === id);
  if (index === -1) {
    return null;
  }
  elements[index] = { ...elements[index], ...elementData };
  fs.writeFileSync(elementsFilePath, JSON.stringify(elements, null, 2));
  return elements[index];
};

/**
 * Elimina un elemento.
 * 
 * @param {string} id - ID del elemento a eliminar.
 * @returns {boolean} True si el elemento fue eliminado, false si no existe.
 */
exports.deleteElement = (id) => {
  const index = elements.findIndex(element => element.id === id);
  if (index === -1) {
    return false;
  }
  elements.splice(index, 1);
  fs.writeFileSync(elementsFilePath, JSON.stringify(elements, null, 2));
  return true;
};

/**
 * Añade un sensor existente a un elemento.
 * 
 * @param {string} elementId - ID del elemento.
 * @param {Object} sensor - Sensor a añadir.
 * @returns {Object|null} Elemento actualizado o null si no existe.
 */
exports.addSensorToElement = (elementId, sensor) => {
  const element = elements.find(element => element.id === elementId);
  if (!element) {
    return null;
  }
  element.sensors.push(sensor);
  fs.writeFileSync(elementsFilePath, JSON.stringify(elements, null, 2));
  return element;
};

/**
 * Elimina un sensor de un elemento.
 * 
 * @param {string} elementId - ID del elemento.
 * @param {string} sensorId - ID del sensor a eliminar.
 * @returns {Object|null} Elemento actualizado o null si no existe.
 */
exports.removeSensorFromElement = (elementId, sensorId) => {
  const element = elements.find(element => element.id === elementId);
  if (!element) {
    return null;
  }
  element.sensors = element.sensors.filter(sensor => sensor.id !== sensorId);
  fs.writeFileSync(elementsFilePath, JSON.stringify(elements, null, 2));
  return element;
};
