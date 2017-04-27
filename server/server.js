"use strict";

const express = require("express"),
    /*Parse incoming request bodies in a middleware before your handlers, available under the req.body property.*/
    body_Parser = require("body-parser"),
    /*A small local database*/
    //    lowdb = require("lowdb"),
    /*        CORS defines a way in which a browser and server can interact to
            determine whether or not it is safe to allow the cross-origserver_Appin request*/
    cors = require("cors");

//const db = lowdb("./data/data.json");

// underscore-db adds functions to Underscore/Lodash for manipulating database- like objects.
//var underscore_DB = require("underscore-db");

// Database lodash instance("db._"). Use it to add your own utility functions or third-party mixins
//db._.mixin(underscore_DB);

const express_App = express();
//express_App.use(cors());

// "express_App.use":
// Mounts the specified middleware function or functions at the specified path:
//      the middleware function is executed when the base of the requested path matches path.
express_App.use(body_Parser.json());

// serve staticj content form the req.url + root-path
express_App.use(express.static('../client'));

// gives static access to the modules over the internet for SystemJS to use
// Is this a sequrity concern? if not, why? if yes, why?
express_App.use('/node_modules', express.static('node_modules'));

const MongoClient = require('mongodb').MongoClient;
let db;

MongoClient.connect('mongodb://admin:admin@ds151060.mlab.com:51060/ticket-system', (err, database) => {
    if (err) {
        return console.log(err);
    }

    db = database;

    console.log(db.collection('users').find().toArray().then(function(numItems) {
        console.log(numItems);
    }));

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
