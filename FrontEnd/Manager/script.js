document.addEventListener('DOMContentLoaded', () => {
    // 모든 버튼에 클릭 이벤트 리스너 추가
    document.querySelectorAll('.navigation button').forEach(button => {
        button.addEventListener('click', () => {
            // 버튼의 data-url 속성에서 URL을 가져옴
            const url = button.getAttribute('data-url');
            loadPage(url);
        });
    });
    // Display user info if available
    const teacherId = sessionStorage.getItem('teacherId');
    const name = sessionStorage.getItem('name');

    if (teacherId && name) {
        //document.getElementById('username').textContent = `이름: ${name}`;
        document.getElementById('role').textContent = `NUMBER: ${teacherId}`;
    }
    // Logout button event listener
    document.querySelector('.logout-button').addEventListener('click', function() {
        fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            origin: true,
            credentials: 'same-origin',
        })
        .then(response => {
            if (response.ok) {
                // Clear session data
                sessionStorage.removeItem('teacherId');
                sessionStorage.removeItem('name');
                
                // Redirect to login page
                window.location.href = 'teacher_login.html';
            } else {
                alert('Logout failed');
            }
        })
        .catch(error => console.error('Error:', error));
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
            // main-content 영역에 HTML을 삽입
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}
