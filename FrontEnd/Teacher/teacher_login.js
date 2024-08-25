document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const teacherId = document.getElementById('teacherId').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            teacherId: teacherId,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Login successful');
            window.location.href = 'add_student.html'; // 로그인 성공 시 리다이렉션
        } else {
            alert('Login failed');
        }
    })
    .catch(error => console.error('Error:', error));
});
