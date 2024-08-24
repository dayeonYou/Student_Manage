document.getElementById('teacherForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼의 기본 제출 동작 방지

    const teacher = {
        teacherId: document.getElementById('teacherId').value,
        name: document.getElementById('name').value,
        birthDate: document.getElementById('birthDate').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value
    };

    fetch('http://localhost:8080/teachers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacher)
    })
    .then(response => {
        if (response.status === 201) {
            alert('정보가 성공적으로 추가되었습니다!');
            document.getElementById('teacherForm').reset(); // 폼 초기화
        } else {
            throw new Error('정보 추가에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(error.message);
    });
});
