const express = require("express");
const router = express.Router();
const passport = require("passport");
const sensorController = require("../controllers/sensorController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  sensorController.getAllSensors
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  sensorController.getSensorById
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  sensorController.createSensor
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  sensorController.updateSensor
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  sensorController.deleteSensor
);

module.exports = router;
