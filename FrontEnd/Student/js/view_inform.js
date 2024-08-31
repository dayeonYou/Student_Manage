document.addEventListener("DOMContentLoaded", function() {
    const studentId = sessionStorage.getItem('studentId');
    loadStudentInfo(studentId);

    document.querySelectorAll('.navigation button').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            window.location.href = url; // 페이지 전환
        });
    });

    // Display user info if available
    const name = sessionStorage.getItem('name');

    if (studentId && name) {
        document.getElementById('username').textContent = `이름: ${name}`;
        document.getElementById('role').textContent = `학생 (ID: ${studentId})`;
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
                sessionStorage.removeItem('studentId');
                sessionStorage.removeItem('name');
                
                // Redirect to login page
                window.location.href = 'student_login.html';
            } else {
                alert('로그아웃 실패');
            }
        })
        .catch(error => console.error('오류:', error));
    });
});

function loadStudentInfo(studentId) {
    fetch(`http://localhost:8080/students/${studentId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(student => {
            console.log('Student data:', student); // Console log to check the data

            const studentInfoTbody = document.getElementById('studentInfo');
            studentInfoTbody.innerHTML = `
                <tr><td>학번</td><td>${student.studentId || 'N/A'}</td></tr>
                <tr><td>이름</td><td>${student.name || 'N/A'}</td></tr>
                <tr><td>생년월일</td><td>${formatDate(student.birthDate) || 'N/A'}</td></tr>
                <tr><td>성별</td><td>${student.gender || 'N/A'}</td></tr>
                <tr><td>주소</td><td>${student.address || 'N/A'}</td></tr>
                <tr><td>전화번호</td><td>${student.phoneNumber || 'N/A'}</td></tr>
                <tr><td>학년</td><td>${student.studentGrade || 'N/A'}</td></tr>
                <tr><td>전공</td><td>${student.major || 'N/A'}</td></tr>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('학생 정보를 가져오는 데 실패했습니다.');
        });
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
}
