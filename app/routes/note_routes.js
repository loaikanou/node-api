// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

    // Create New Record
    const collection = app.post('/notes', (req, res) => {
        // You'll create your note here.
        let note = { title: req.body.title, content: req.body.content };
        db.collection('notes').insert(note, (error, result) => {
            if (error) {
                console.log('Created Record');
                res.send({ 'Error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
                // db.close();
            }
        });
    });

    // View All Recoeds
    app.get('/notes/all', (req, res) => {
        var notes = db.collection('notes').find({}).toArray( (err, results) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('View All Recoeds');
                res.send(results);
            }
        });
        // notes.each();
    });

    // View One Record by ID
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('View One Record by ID');
                res.send(item);
            }
        });
    });

    // View One Record by Title
    app.get('/notes/title/:title', (req, res) => {
        let details = { 'title': req.params.title };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('View One Record by Title');
                res.send(item);
            }
        });
    });

    // Update Recoed
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { title: req.body.title, content: req.body.content };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Update Recoed');
                res.send(note);
            } 
        });
    });

    // Delete Recoeds
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Delete Recoeds');
                res.send('Note ' + id + ' deleted!');
            } 
        });
    });

    // test
    app.post('/test', (req, res) => {
        // You'll create your note here.
        // console.log(req.body);        
        res.send('Hello!');
    });
    
}
