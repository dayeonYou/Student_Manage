document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const student = {
        studentId: document.getElementById('studentId').value,
        name: document.getElementById('name').value,
        department: document.getElementById('major').value,
        phoneNumber: document.getElementById('phone_number').value,
        studentGrade: document.getElementById('student_grade').value,
        birthDate: document.getElementById('birth_date').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:8080/api/auth/student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    .then(response => {
        if (response.ok) {
            alert('Student created successfully');
        } else {
            response.text().then(text => alert('Failed to create student: ' + text));
        }
    })
    .catch(error => console.error('Error:', error));
});
