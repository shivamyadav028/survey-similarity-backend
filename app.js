// app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Include and use the survey API routes
const surveyApiRoutes = require('./survey-api');
app.use('/api/survey', surveyApiRoutes);

// Include and use the similarity API routes
const similarityApiRoutes = require('./similarity-api');
app.use('/api/similarity', similarityApiRoutes);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Start the Express.js server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
