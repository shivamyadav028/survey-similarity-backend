const express = require('express');
const router = express.Router();
const fs = require('fs');

// Read survey data from the sample-data.json file
const surveyData = JSON.parse(fs.readFileSync('./sample-data.json', 'utf-8'));

// Function to calculate cosine similarity between two arrays of numbers
function cosineSimilarity(arr1, arr2) {
    const dotProduct = arr1.reduce((acc, val, index) => acc + val * arr2[index], 0);
    const magnitude1 = Math.sqrt(arr1.reduce((acc, val) => acc + val * val, 0));
    const magnitude2 = Math.sqrt(arr2.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (magnitude1 * magnitude2);
}

// Function to calculate similarity between two candidates
function calculateSimilarity(candidate1, candidate2) {
    const responses1 = candidate1.responses.map((response) => response.toLowerCase());
    const responses2 = candidate2.responses.map((response) => response.toLowerCase());

    // Create a vocabulary of all unique words in both candidates' responses
    const vocabulary = Array.from(new Set([...responses1, ...responses2]));

    // Convert responses to numeric vectors based on the vocabulary
    const vector1 = vocabulary.map((word) => responses1.includes(word) ? 1 : 0);
    const vector2 = vocabulary.map((word) => responses2.includes(word) ? 1 : 0);

    // Calculate cosine similarity between the vectors
    const similarity = cosineSimilarity(vector1, vector2);
    return similarity;
}

// Route to calculate similarity among different candidates
router.get('/calculate', (req, res) => {
    // Implement logic to calculate similarity among different candidates
    const candidates = surveyData.candidates;
    const similarityResults = [];

    for (let i = 0; i < candidates.length; i++) {
        for (let j = i + 1; j < candidates.length; j++) {
            const candidate1 = candidates[i];
            const candidate2 = candidates[j];
            const similarity = calculateSimilarity(candidate1, candidate2);

            similarityResults.push({
                candidate1: candidate1.name,
                candidate2: candidate2.name,
                similarity: (similarity * 100).toFixed(2) + '%',
            });
        }
    }

    // Return the calculated similarity results
    res.json(similarityResults);
});

// Route to filter similarity results based on a specific candidate
router.get('/filter/:candidateId', (req, res) => {
    const candidateId = parseInt(req.params.candidateId);

    // Find the candidate based on the provided candidateId
    const candidate = surveyData.candidates.find((c) => c.candidateId === candidateId);

    if (!candidate) {
        return res.status(404).json({ error: 'Candidate not found' });
    }

    // Calculate similarity with the specified candidate
    const filteredResults = surveyData.candidates
        .filter((c) => c.candidateId !== candidateId)
        .map((otherCandidate) => ({
            candidate1: candidate.name,
            candidate2: otherCandidate.name,
            similarity: (calculateSimilarity(candidate, otherCandidate) * 100).toFixed(2) + '%',
        }));

    // Return the filtered similarity results
    res.json(filteredResults);
});

// Route to provide paginated similarity results
router.get('/paginate', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    // Calculate the starting index based on the page and limit
    const startIndex = (page - 1) * limit;

    // Slice the similarity data to get the results for the current page
    const paginatedResults = similarityData.slice(startIndex, startIndex + limit);

    res.json(paginatedResults);
});

// Route to search for candidates by name and get similarity results
router.get('/search/:searchText', (req, res) => {
    const searchText = req.params.searchText.toLowerCase(); // Convert to lowercase for case-insensitive search

    // Find candidates whose name contains the search text
    const matchingCandidates = surveyData.candidates.filter((candidate) => {
        const candidateName = candidate.name.toLowerCase();
        return candidateName.includes(searchText);
    });

    if (matchingCandidates.length === 0) {
        // No matching candidates found
        res.json({ message: 'No matching candidates found' });
    } else {
        // Calculate similarity for the search results
        const similarityResults = [];

        for (const candidate of matchingCandidates) {
            const similarity = calculateSimilarity(candidate, surveyData.candidates[0]); // Assuming the first candidate for reference
            similarityResults.push({
                candidate1: candidate.name,
                candidate2: surveyData.candidates[0].name,
                similarity: (similarity * 100).toFixed(2) + '%',
            });
        }

        // Return the similarity results for matching candidates
        res.json(similarityResults);
    }
});

module.exports = router;
