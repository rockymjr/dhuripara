// scripts/script.js

// Function to fetch and display links based on JSON data
async function fetchAndDisplayLinks(jsonDataUrl) {
    try {
        const response = await fetch(jsonDataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        let counter = 1;
        const container = document.querySelector(".container");
        if (!container) {
            console.error("Container element not found in the DOM.");
            return;
        }
        for (const data of jsonData) {
            const linkElement = document.createElement("a");
            linkElement.href = data.link;
            linkElement.classList.add("sheet-link");
            linkElement.textContent = counter++ + ". " + data.title;
            container.appendChild(linkElement);
        }
    } catch (error) {
        console.error("Error fetching JSON data:", error);
    }
}

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
    // Get the script tag's initial data-json attribute
    const scriptTag = document.querySelector('script[data-json]');
    const defaultJsonFile = scriptTag.getAttribute('data-json');

    // Fetch the JSON file name from the URL parameter or fallback to the default
    const jsonFile = getQueryParam('json') || defaultJsonFile;

    // Fetch and display links using the JSON file
    if (jsonFile) {
        fetchAndDisplayLinks(jsonFile);
    } else {
        console.error("No JSON file specified.");
    }
});
