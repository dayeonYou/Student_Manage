let globalSubjectId = null;

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

    // Set year and semester automatically
    setYearAndSemester();

    // Fetch courses and populate them based on current year and semester
    fetchCourses();

    // Handle course selection and fetch students
    document.getElementById('course').addEventListener('change', function() {
        const courseId = this.value;

        if (courseId) {
            fetch(`http://localhost:8080/students/course/${courseId}`)
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
                                        <td>${student.studentId}</td>
                                        <td>${student.name}</td>
                                        <td><input type="number" name="score_${student.studentId}" step="0.01" min="0" max="100" required></td>
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

    // Form submission to add grades
    document.getElementById('gradeForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        const grades = [];
        const RealsubjectId = globalSubjectId;

        // Collect scores from the form
        for (let [key, value] of formData.entries()) {
            if (key.startsWith('score_')) {
                const studentId = key.split('_')[1];
                grades.push({
                    studentId: studentId,
                    score: parseFloat(value) // Ensure score is a number
                });
            }
        }

        // Build request data
        const requestData = {
            semester: formData.get('semester'),
            year: formData.get('year'),
            course_id: RealsubjectId,
            grades: grades
        };

        // POST request to add grades
        fetch('http://localhost:8080/grades/grades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(({ status, body }) => {
            if (status >= 200 && status < 300) {
                alert('성적이 성공적으로 등록되었습니다!');
            } else {
                throw new Error(body.message || 'Unknown error');
            }
        })
        .catch(error => {
            console.error('성적 등록 중 오류 발생:', error);
            alert(`성적 등록 중 오류가 발생했습니다: ${error.message}`);
        });
    });


});

function setYearAndSemester() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.

    let semester = '';
    if (currentMonth >= 1 && currentMonth <= 2) {
        semester = 'Winter';
    } else if (currentMonth >= 3 && currentMonth <= 6) {
        semester = 'Spring';
    } else if (currentMonth >= 7 && currentMonth <= 8) {
        semester = 'Summer';
    } else {
        semester = 'Fall';
    }

    document.getElementById('year').value = currentYear;
    document.getElementById('semester').value = semester;
}
function fetchCourses() {
    const semester = document.getElementById('semester').value;
    const year = document.getElementById('year').value;
    const teacherId = sessionStorage.getItem('teacherId');

    if (semester && year && teacherId) {
        fetch(`http://localhost:8080/teachers/${teacherId}/course-offerings?year=${year}&semester=${semester}`)
        .then(response => response.json())
        .then(data => {
            const courseSelect = document.getElementById('course');
            courseSelect.innerHTML = '<option value="">강의 선택</option>';

            data.forEach(course => {
                const option = document.createElement('option');
                option.value = course.offeringId;
                option.textContent = `과목ID: ${course.subject.subjectId} / ${course.subject.subjectName} / 요일: ${course.dayOfWeek} / 시작 시간: ${course.startClassTime}`;
                courseSelect.appendChild(option);

                // 전역 변수에 값을 저장
                if (!globalSubjectId) { // 첫 번째로 로드된 과목ID를 저장
                    globalSubjectId = course.subject.subjectId;
                }
            });
        })
        .catch(error => {
            console.error('강의 목록을 불러오는 중 오류 발생:', error);
        });
    }
}
