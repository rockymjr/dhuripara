// scripts/script.js

// Fetch and display links from a JSON file
async function fetchAndDisplayLinks(jsonUrl) {
  try {
    const response = await fetch(jsonUrl);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const jsonData = await response.json();

    const container = document.querySelector(".container");
    if (!container) return console.error("Container not found");

    jsonData.forEach((data, i) => {
      const link = document.createElement("a");
      link.href = data.link;
      link.classList.add("sheet-link");
      link.textContent = `${i + 1}. ${data.title}`;
      container.appendChild(link);
    });
  } catch (err) {
    console.error("Error loading JSON:", err);
  }
}

// Get URL query parameter
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", () => {
  const scriptTag = document.querySelector('script[data-json]');
  const defaultJson = scriptTag.getAttribute('data-json');

  // Get year parameter from URL
  const name = getQueryParam("name");

  // Choose JSON file
  const jsonFile = name ? `data/${name}.json` : defaultJson;

  // Fetch and display data
  fetchAndDisplayLinks(jsonFile);

  // Set dynamic footer year
  document.getElementById("current-year").textContent = new Date().getFullYear();
});
