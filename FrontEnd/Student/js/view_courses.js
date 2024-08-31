document.addEventListener("DOMContentLoaded", function() {
    console.log('Document loaded');

    // 동적으로 년도 선택 옵션 추가
    populateYearOptions();

    // 강의 목록 로드 버튼 클릭 시 호출되는 함수
    document.getElementById('courseForm').addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 제출 방지
        loadCourses(); // 강의 목록 로드
    });

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

    // 예제: 2020년부터 2025년까지 옵션 추가
    for (let year = 2020; year <= 2025; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

function loadCourses() {
    const year = document.getElementById('year').value;
    const semester = document.getElementById('semester').value;

    if (!year || !semester) {
        alert('년도와 학기를 선택해 주세요.');
        return;
    }

    console.log('Loading courses for year:', year, 'semester:', semester);

    fetch(`http://localhost:8080/courses?year=${year}&semester=${semester}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            return response.json();
        })
        .then(courses => {
            console.log('Fetched courses:', courses);

            const tableBody = document.querySelector('#courseTable tbody');
            tableBody.innerHTML = '';  // 기존 행 제거

            courses.forEach(course => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${course.subjectName || 'N/A'}</td>
                    <td>${course.subjectId || 'N/A'}</td>
                    <td>${course.teacherName || 'N/A'}</td>
                    <td>${course.dayOfWeek || 'N/A'}</td>
                    <td>${course.startClassTime || 'N/A'}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('강의 목록을 가져오는 데 실패했습니다.');
        });
}
