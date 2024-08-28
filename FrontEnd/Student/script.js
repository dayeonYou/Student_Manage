document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navigation button').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            loadPage(url);
        });
    });
});

function loadPage(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            // Ensure the CSS is applied correctly
            applyStyles();
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

function applyStyles() {
    // Apply any additional styles or reinitialize elements if needed
}
