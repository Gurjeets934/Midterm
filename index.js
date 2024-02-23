 
// Student's Name: Gurjeet Singh
// Student's ID: 200567055
// Date: 23 Feb 2024

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const recipeRoutes = require('./src/routes/routes.js');
const cors = require('cors');
const fs = require('fs');
const app = express();



app.use(cors({}))
app.use(express.json());    

dotenv.config({ path: './config.env' });

// Initialize MongoDB Connection
const InitiateMongoServer = require('./db');
const Recipe = require('./src/model/recipe.js');
InitiateMongoServer();
    

// Read the data from recipe.json
const data = JSON.parse(fs.readFileSync('./recipe.json', 'utf-8'));

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        importData();
    })
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Function to Import Data from Json file to MongoDB Cluster using Mongoose Model..
const importData = async () => {
    try {
        const Book = require('./src/model/recipe.js');
        // Check if the collection is empty
        const count = await Recipe.countDocuments();
        if (count === 0) {      
            await Book.create(data);
            console.log('Data successfully imported to MongoDB');
        } else {
            console.log('Data already exists in the database');
        }
    } catch (error) {
        console.log("Error importing the data", error);
    }
};

app.get('/', (req, res) => {
    res.send('Welcome to our webpage!');
});

app.use('/recipes', recipeRoutes);
app.use('/ingredients', recipeRoutes);
app.use('/ingredients/:ingredientName', recipeRoutes);
app.use('/recipes/cuisine/:cuisine', recipeRoutes);

// For Listening on the Port Number in the localhost..
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});