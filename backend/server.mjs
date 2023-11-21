import 'dotenv/config';
import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

app.use(express.json());

const url = process.env['MONGODB_URI'];
const dbName = 'formista';
let forms_coll;

try {
    const client = await MongoClient.connect(url);
    console.log('Connected to MongoDB successfully');
    forms_coll = client.db(dbName).collection('forms');
}
catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
}


app.get('/', (req, res) => {
    res.json({
        message: "Hello World!!"
    });
});


app.get('/ping', (req, res) => {
    res.json({
        message: 'Pong!'
    });
});


app.get('/exists/:formID', async (req, res) => {
    try {
        const formID = req.params.formID;
        const form = await forms_coll.findOne({ formID });
        res.json(form !== null);
    } catch (err) {
        res.status(500).send(`Internal error: ${err}`);
    }
})

app.get('/:formID', async (req, res) => {
    try {
        const fID = req.params.formID;
        const form = await forms_coll.findOne({ formID: fID });

        if (form) {
            res.json(form);
        } else {
            res.status(404).json({ message: "Form not found!" });
        }
    } catch (err) {
        res.status(500).send(`Internal error: ${err}`);
    }
});


app.post('/new', async (req, res) => {
    try {
        const formData = req.body;

        const existingForm = await forms_coll.findOne({ formID: formData.formID });

        if (existingForm) {
            return res.json({
                message: 'Form already exists',
                formID: existingForm.formID
            });
        } 
        else    {
            formData.responses = [];
            await forms_coll.insertOne(formData);

            return res.json({
                message: 'Created new form',
                formID: formData.formID
            });
        }
    } catch (err) {
        console.error('Error creating new form:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});