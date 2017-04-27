"use strict";

const express = require("express"),
    body_Parser = require("body-parser"),
    cors = require("cors");

const express_App = express();
express_App.use(cors());

express_App.use(body_Parser.json());

express_App.use(express.static('../client'));

express_App.use('/node_modules', express.static('node_modules'));

const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://admin:admin@ds151060.mlab.com:51060/ticket-system', (err, database) => {
    if (err) {
        return console.log(err);
    }

    db = database;

    require('./utils/authorize-user')(express_App, db);

    // User routes
    const users_Controller = require("../server/controllers/users-controller")(db);
    express_App.get("/api/users", users_Controller.get);
    express_App.post("/api/users", users_Controller.post);
    express_App.put("/api/auth", users_Controller.put);

    // New ticket routes
    const new_Ticket_Controller = require("../server/controllers/newTicket-controller.js")(db);
    express_App.get("/api/newticket", new_Ticket_Controller.get);
    express_App.post("/api/newticket", new_Ticket_Controller.post);
    express_App.put("/api/newticket", new_Ticket_Controller.put);

    // Listing the tickets routine
    const listing_Controller = require("../server/controllers/listings-controller.js")(db);
    express_App.post("/listing/page:page_Index/amount:number_Of_Pages", listing_Controller.post_For_Tickets);
    express_App.post("/listlength", listing_Controller.post_For_Length);

    // Start the server
    const port = 3000;
    express_App.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
})
