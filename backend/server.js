const express = require("express");
const passport = require("passport");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const elementRoutes = require("./routes/elementRoutes");

require("./config/passport")(passport);

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/elements", elementRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
