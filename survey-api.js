const express = require('express');
const router = express.Router();
const fs = require('fs');

// Read survey data from the sample-data.json file
const surveyData = JSON.parse(fs.readFileSync('./sample-data.json', 'utf-8'));

// Route to list all available surveys
router.get('/list', (req, res) => {
    res.json(surveyData);
});

// Route to submit a response for a survey from a user
router.post('/submit/:candidateId', (req, res) => {
    const candidateId = req.params.candidateId;
    const response = req.body;

    // Find the candidate by candidateId
    const candidate = surveyData.candidates.find((c) => c.candidateId === candidateId);

    if (candidate) {
        // Store the response in the corresponding object
        candidate.responses.push(response);
        res.json({ message: 'Response submitted successfully' });
    } else {
        res.status(404).json({ error: 'Candidate not found' });
    }
});

module.exports = router;
