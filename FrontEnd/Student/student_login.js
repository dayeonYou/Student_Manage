document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/api/auth/loginSt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            studentId: studentId,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login successful") {
            // Store user data in sessionStorage or localStorage
            sessionStorage.setItem('studentId', data.studentId);
            sessionStorage.setItem('name', data.name);
            
            // Redirect to home screen
            window.location.href = 'student_home.html'; 
        } else {
            alert('Login failed');
        }
    })
    .catch(error => console.error('Error:', error));
});
