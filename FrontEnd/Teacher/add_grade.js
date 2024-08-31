
document.addEventListener('DOMContentLoaded', () => {
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
        document.getElementById('role').textContent = `교수 (ID: ${teacherId})`;
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
                window.location.href = 'teacher_login.html';
            } else {
                alert('로그아웃 실패');
            }
        })
        .catch(error => console.error('오류:', error));
    });
});

document.getElementById('semester').addEventListener('change', fetchCourses);
document.getElementById('year').addEventListener('change', fetchCourses);

function fetchCourses() {
    const semester = document.getElementById('semester').value;
    const year = document.getElementById('year').value;

    if (semester && year) {
        fetch(`/api/courses?semester=${semester}&year=${year}`)
            .then(response => response.json())
            .then(data => {
                const courseSelect = document.getElementById('course');
                courseSelect.innerHTML = '<option value="">강의 선택</option>';

                data.forEach(course => {
                    const option = document.createElement('option');
                    option.value = course.course_id;
                    option.textContent = course.course_name;
                    courseSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('강의 목록을 불러오는 중 오류 발생:', error);
            });
    }
}

document.getElementById('course').addEventListener('change', function() {
    const courseId = this.value;

    if (courseId) {
        fetch(`/api/students?course_id=${courseId}`)
            .then(response => response.json())
            .then(data => {
                const studentsTable = document.getElementById('studentsTable');
                studentsTable.innerHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>학번</th>
                                <th>이름</th>
                                <th>점수</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(student => `
                                <tr>
                                    <td>${student.student_id}</td>
                                    <td>${student.name}</td>
                                    <td><input type="number" name="score_${student.student_id}" step="0.01" min="0" max="100" required></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            })
            .catch(error => {
                console.error('학생 목록을 불러오는 중 오류 발생:', error);
            });
    }
});

document.getElementById('gradeForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const scores = {};

    for (let [key, value] of formData.entries()) {
        if (key.startsWith('score_')) {
            const studentId = key.split('_')[1];
            scores[studentId] = value;
        }
    }

    const requestData = {
        semester: formData.get('semester'),
        year: formData.get('year'),
        course_id: formData.get('course'),
        scores: scores
    };

    fetch('/api/grades', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .then(data => {
            alert('성적이 성공적으로 등록되었습니다!');
        })
        .catch(error => {
            console.error('성적 등록 중 오류 발생:', error);
            alert('성적 등록 중 오류가 발생했습니다.');
        });
});
