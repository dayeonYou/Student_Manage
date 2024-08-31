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
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login successful") {
            // Store user data in sessionStorage or localStorage
            sessionStorage.setItem('teacherId', data.teacherId);
            sessionStorage.setItem('name', data.name);
            
            // Redirect to home screen
            if (data.teacherId === 0) {
                window.location.href = '../Manager/manager_home.html'; 
            } else {
                window.location.href = 'teacher_home.html';
            }
        } else {
            alert('Login failed');
        }
    })
    .catch(error => console.error('Error:', error));
});
