// start by requiring all your dependencies.

const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
const db            = require('./config/db');

// Start Server Node API

const app = express();
const port = 8800;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url)
    .then(function (database) {
        // Make sure you add the database name and not the collection name

        let db = database.db("notes");
        require('./app/routes')(app, db);

        app.listen(port, () => {
            console.log('NodeApi live on ' + port);
        }).on('error', console.log);
    })
    .catch(function (error) {
        return console.log('Error' + error);
    });

    
// db.close();
/*
MongoClient.connect(db.url, (error, database) => {
    if (error) throw error; // return console.log('Error' + error);
    
    // Make sure you add the database name and not the collection name
    let db = database.db("notes");
    require('./app/routes')(app, db);

    app.listen(port, () => {
        console.log('NodeApi live on ' + port);
    });

});
*/
