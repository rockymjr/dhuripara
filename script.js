
    const jsonDataUrl = "data.json"; 
    async function fetchAndDisplayLinks() {
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
    fetchAndDisplayLinks();
