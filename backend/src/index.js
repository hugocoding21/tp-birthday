const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 3001;

const server = express();

mongoose.connect(`mongodb://0.0.0.0:27017/birthday`);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Erreur de connexion à MongoDB:", err);
});

db.once("open", () => {
  console.log("Connexion à MongoDB réussie");
});

server.use(express.json());
server.use(cors());
const route = require("./api/routes/route");
route(server);
server.listen(port, () => {
  console.log(`App listening on localhost port ${port}`);
});
