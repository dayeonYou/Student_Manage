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
