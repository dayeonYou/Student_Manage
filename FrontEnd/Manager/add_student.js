document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작 방지

    const student = {
        studentId: document.getElementById('studentId').value,
        name: document.getElementById('name').value,
        birthDate: document.getElementById('birthDate').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        studentGrade: document.getElementById('grade').value,
        major: document.getElementById('class').value
    };

    fetch('http://localhost:8080/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    })
    .then(response => {
        if (response.status === 201) {
            alert('학생이 성공적으로 추가되었습니다!');
            document.getElementById('studentForm').reset(); // 폼 초기화
        } else {
            throw new Error('학생 추가에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
});
