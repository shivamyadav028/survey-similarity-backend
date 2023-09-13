# survey-similarity-backend

This API provides endpoints to manage survey data and calculate the similarity between different candidates' responses. It offers features for listing surveys, submitting responses, calculating similarity, filtering, pagination, and searching for candidates.


## Getting Started
To set up and run this API, follow these steps:

- Clone this repository to your local machine.
- Install Node.js if you haven't already.
- In the project directory, run npm install to install the required dependencies.
- Start the server by running node app.js.
- The API will be available at http://localhost:3000.
## Endpoints
* List Surveys
URL: /api/survey/list
Method: GET
Description: Lists all available surveys.
Response: Returns a JSON array of surveys with candidate details and responses.
* Submit Survey Response
URL: /api/survey/submit/:candidateId
Method: POST
Description: Submits a survey response for a specific candidate.
Request Body: Expects a JSON object with the survey response.
Response: Returns a success message if the response is submitted successfully.
* Calculate Similarity
URL: /api/similarity/calculate
Method: GET
Description: Calculates the similarity among different candidates based on their survey responses.
Response: Returns a JSON array of similarity results between candidates.
* Filter Similarity Results
URL: /api/similarity/filter/:candidateId
Method: GET
Description: Filters similarity results based on a specific candidate.
Response: Returns a JSON array of filtered similarity results for the specified candidate.
* Paginate Similarity Results
URL: /api/similarity/paginate
Method: GET
Description: Provides paginated similarity results.
Query Parameters:
page: Page number (default is 1).
limit: Number of results per page (default is 5).
Response: Returns a JSON array of similarity results for the specified page and limit.
* Search Candidates
URL: /api/similarity/search/:searchText
Method: GET
Description: Searches for candidates by name and calculates similarity for matching candidates.
Response: Returns a JSON array of similarity results for matching candidates.
## How to Use
You can interact with this API using HTTP requests, for example, by using tools like curl or Postman. Here are some sample requests:

List all surveys: GET http://localhost:3000/api/survey/list: 
Submit a survey response: POST http://localhost:3000/api/survey/submit/:candidateId (replace :candidateId with the actual candidate ID).
Calculate similarity: GET http://localhost:3000/api/similarity/calculate.
Filter similarity results: GET http://localhost:3000/api/similarity/filter/:candidateId (replace :candidateId with the actual candidate ID).
Paginate similarity results: GET http://localhost:3000/api/similarity/paginate?page=1&limit=5.
Search candidates: GET http://localhost:3000/api/similarity/search/:searchText (replace :searchText with the search text).
### Sample Data
The API uses sample survey and similarity data. You can replace this data with your own in the sample-data.json and sample-similarity-data.json files.

## Dependencies
This API uses the following dependencies:

express: A web application framework for Node.js.
fs: The Node.js file system module for reading JSON data.
