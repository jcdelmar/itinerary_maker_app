const express = require("express");
const cors = require("cors");
const routes = require("./src/itinerary/routes");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log("App is listening on PORT : ", PORT);
});
