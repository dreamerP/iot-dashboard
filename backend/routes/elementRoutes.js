const express = require("express");
const router = express.Router();
const passport = require("passport");
const elementController = require("../controllers/elementController");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  elementController.getAllElements
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  elementController.getElementById
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  elementController.createElement
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  elementController.updateElement
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  elementController.deleteElement
);
router.post("/elements/:id/sensors", elementController.addSensorToElement);
router.delete(
  "/elements/:id/sensors/:sensorId",
  elementController.removeSensorFromElement
);

module.exports = router;
