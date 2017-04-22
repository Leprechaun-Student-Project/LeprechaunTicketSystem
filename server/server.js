"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    lowdb = require("lowdb"),
    cors = require("cors");

const db = lowdb("./data/data.json");
db._.mixin(require("underscore-db"));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('../client'));
app.use('/node_modules', express.static('node_modules'));

require('./utils/authorize-user')(app, db);

//User routes
const usersController = require("./controllers/users-controller")(db);
app.get("/api/users", usersController.get);
app.post("/api/users", usersController.post);
app.put("/api/auth", usersController.put);


const port = 3000;
app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
