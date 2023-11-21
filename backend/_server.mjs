import 'dotenv/config';
import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;


// const url = `mongodb+srv://silicoflare:${process.env['MONGODB_PASS']}@silicoverse.aoepe6c.mongodb.net/?retryWrites=true&w=majority`;
const url = process.env['MONGODB_URI']
const dbName = 'formista';

async function connectToMongoDB() {
    try {
        const client = await MongoClient.connect(url);
        console.log('Connected to MongoDB successfully');
        return client.db(dbName);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

async function findFormDocument() {
    try {
        const db = await connectToMongoDB();
        const formsCollection = db.collection('forms');
        return formsCollection.findOne({ formID: 'Fyc1RjnjuN' });
    } catch (err) {
        console.error('Error finding document:', err);
        throw err;
    }
}

// Define a route to find the document
app.get('/findForm', async (req, res) => {
    try {
        const result = await findFormDocument();
        // Send the result as JSON
        res.json(result);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// Start the Express server after connecting to MongoDB and finding the document
connectToMongoDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Unable to start server:', err);
    });
