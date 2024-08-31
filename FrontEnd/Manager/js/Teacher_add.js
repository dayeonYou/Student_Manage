document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation button clicks
    document.querySelectorAll('.navigation button').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            window.location.href = url; // 페이지 전환
        });
    });

    // Display user info if available
    const teacherId = sessionStorage.getItem('teacherId');
    const name = sessionStorage.getItem('name');

    if (teacherId && name) {
        document.getElementById('username').textContent = `이름: ${name}`;
        document.getElementById('role').textContent = `관리자 (ID: ${teacherId})`;
    }

    // Logout button event listener
    document.querySelector('.logout-button').addEventListener('click', function() {
        fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            credentials: 'same-origin',
        })
        .then(response => {
            if (response.ok) {
                // Clear session data
                sessionStorage.removeItem('teacherId');
                sessionStorage.removeItem('name');
                
                // Redirect to login page
                window.location.href = '../../../Home.html';
            } else {
                alert('로그아웃 실패');
            }
        })
        .catch(error => console.error('오류:', error));
    });
});


document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const teacher = {
        teacherId: document.getElementById('teacherId').value,
        name: document.getElementById('name').value,
        department: document.getElementById('department').value,
        phoneNumber: document.getElementById('phone_number').value,
        email: document.getElementById('email').value,
        birthDate: document.getElementById('birth_date').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:8080/api/auth/teacher', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacher)
    })
    .then(response => {
        if (response.ok) {
            alert('Teacher created successfully');
        } else {
            response.text().then(text => alert('Failed to create teacher: ' + text));
        }
    })
    .catch(error => console.error('Error:', error));
});
