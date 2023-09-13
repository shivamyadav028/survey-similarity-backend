document.addEventListener("DOMContentLoaded", function () {
    const fetchSurveyButton = document.getElementById("fetchSurveyButton");
    const surveyDataElement = document.getElementById("survey-data");
    const fetchSimilarityButton = document.getElementById("fetchSimilarityButton");
    const similarityDataElement = document.getElementById("similarity-data");

    // Function to fetch and display survey data in a table
    function fetchSurveyData() {
        fetch("/api/survey/list")
            .then((response) => response.json())
            .then((data) => {
                // Create an HTML table
                const table = document.createElement("table");
                table.classList.add("survey-table");

                // Create the table header
                const headerRow = table.createTHead().insertRow(0);
                const headers = ["Candidate ID", "Name", "Responses"];
                headers.forEach((headerText, index) => {
                    const th = document.createElement("th");
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });

                // Create table rows for each candidate
                data.candidates.forEach((candidate) => {
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    const cell3 = row.insertCell(2);

                    cell1.textContent = candidate.candidateId;
                    cell2.textContent = candidate.name;
                    cell3.textContent = candidate.responses.join(", ");
                });

                // Clear any existing data and append the table to the HTML element
                surveyDataElement.innerHTML = "";
                surveyDataElement.appendChild(table);
            })
            .catch((error) => {
                console.error("Error fetching survey data:", error);
            });
    }

    // Function to fetch and display similarity data in a table
    function fetchSimilarityData() {
        fetch("/api/similarity/calculate")
            .then((response) => response.json())
            .then((data) => {
                // Create an HTML table
                const table = document.createElement("table");
                table.classList.add("similarity-table");

                // Create the table header
                const headerRow = table.createTHead().insertRow(0);
                const headers = ["Candidate 1", "Candidate 2", "Similarity (%)"];
                headers.forEach((headerText, index) => {
                    const th = document.createElement("th");
                    th.textContent = headerText;
                    headerRow.appendChild(th);
                });

                // Create table rows for each similarity entry
                data.similarity.forEach((entry) => {
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    const cell3 = row.insertCell(2);

                    cell1.textContent = entry.candidate1;
                    cell2.textContent = entry.candidate2;
                    cell3.textContent = entry.similarity + "%";
                });

                // Clear any existing data and append the table to the HTML element
                similarityDataElement.innerHTML = "";
                similarityDataElement.appendChild(table);
            })
            .catch((error) => {
                console.error("Error fetching similarity data:", error);
            });
    }

    // Event listener for the Fetch Survey button
    fetchSurveyButton.addEventListener("click", function () {
        fetchSurveyData();
    });

    // Event listener for the Fetch Similarity button
    fetchSimilarityButton.addEventListener("click", function () {
        fetchSimilarityData();
    });
});
