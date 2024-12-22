// scripts/script.js

// Function to fetch and display links based on JSON data
async function fetchAndDisplayLinks(jsonDataUrl) {
    try {
        const response = await fetch(jsonDataUrl);
        const jsonData = await response.json();
        let counter = 1;
        for (const data of jsonData) {
            const linkElement = document.createElement("a");
            linkElement.href = data.link;
            linkElement.classList.add("sheet-link");
            linkElement.textContent = counter++ + ". " + data.title;
            const container = document.querySelector(".container");
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
    // Fetch the JSON file name from the URL parameter or fallback to the default
    const jsonFile = getQueryParam('json') || 'data/default.json';

    // Dynamically set the data-json attribute on the script tag
    const scriptTag = document.querySelector('script[data-json]');
    scriptTag.setAttribute('data-json', jsonFile);

    // Fetch and display links using the JSON file
    fetchAndDisplayLinks(jsonFile);
});
