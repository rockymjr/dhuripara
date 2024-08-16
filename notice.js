document.addEventListener('DOMContentLoaded', function() {
    fetch('notices.json') // Adjust the path if necessary
        .then(response => response.json())
        .then(data => {
            const noticesContainer = document.querySelector('#notices-container');
            data.forEach(notice => {
                const noticeElement = document.createElement('div');
                noticeElement.classList.add('notice-item'); // Apply the new style class
                noticeElement.innerHTML = `
                    <h2>${notice.title}</h2>
                    <p><b>${notice.date}</b></p>
                    <p>${notice.content}</p>
                `;
                noticesContainer.appendChild(noticeElement);
            });
        })
        .catch(error => console.error('Error loading the JSON data:', error));
});
