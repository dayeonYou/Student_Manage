document.addEventListener('DOMContentLoaded', () => {
    populateYearOptions();
    setStudentId();
    // Handle navigation button clicks
    document.querySelectorAll('.navigation button').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            window.location.href = url; // 페이지 전환
        });
    });

    // Display user info if available
    const studentId = sessionStorage.getItem('studentId');
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

function populateYearOptions() {
    const yearSelect = document.getElementById('year');
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 2000; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

function setStudentId() {
    const studentId = sessionStorage.getItem('studentId');

    if (studentId) {
        const studentIdInput = document.getElementById('studentId');
        studentIdInput.value = studentId;
    } else {
        alert('학생 ID를 찾을 수 없습니다.');
    }
}

function fetchGrades() {
    const studentId = document.getElementById('studentId').value;
    const year = document.getElementById('year').value;
    const semester = document.getElementById('semester').value;

    if (!studentId || !year || !semester) {
        alert('학생 ID, 년도 및 학기를 모두 선택해 주세요.');
        return;
    }

    // API 요청 URL 구성
    const url = `http://localhost:8080/grades/student/${studentId}/semester/${semester}/year/${year}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('성적을 조회하는 데 실패했습니다.');
            }
            return response.json();
        })
        .then(grades => {
            displayGrades(grades);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert('성적을 조회하는 데 실패했습니다.');
        });
}

function displayGrades(grades) {
    const resultContainer = document.getElementById('results');
    resultContainer.innerHTML = '';

    if (grades.length === 0) {
        resultContainer.textContent = '조회된 성적이 없습니다.';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>과목명</th>
                <th>과목 ID</th>
                <th>실점수</th>
                <th>등급</th>
                <th>이수구분</th>
                <th>교수명</th>
            </tr>
        </thead>
        <tbody>
            ${grades.map(item => `
                <tr>
                    <td>${item.subject.subjectName}</td>
                    <td>${item.subject.subjectId}</td>
                    <td>${item.score}</td>
                    <td>${getGrade(item.score)}</td>
                    <td>${item.section}</td>
                    <td>${item.subject.teacher.name}</td>
                </tr>
            `).join('')}
        </tbody>
    `;

    resultContainer.appendChild(table);
}

function getGrade(score) {
    if (score >= 96) return 'A+';
    if (score >= 91) return 'A0';
    if (score >= 86) return 'B+';
    if (score >= 81) return 'B0';
    if (score >= 76) return 'C+';
    if (score >= 71) return 'C0';
    if (score >= 61) return 'D+';
    if (score >= 51) return 'D0';
    return 'F';
}
