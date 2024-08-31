// script.js

document.addEventListener("DOMContentLoaded", function() {
    console.log('Document loaded');

    // 동적으로 년도 선택 옵션 추가
    populateYearOptions();

    // 강의 목록 로드 버튼 클릭 시 호출되는 함수
    document.getElementById('scheduleForm').addEventListener('submit', function(event) {
        event.preventDefault(); // 폼 제출 방지
        loadSchedule(); // 시간표 로드
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

function loadSchedule() {
    const year = document.getElementById('year').value;
    const semester = document.getElementById('semester').value;

    if (!year || !semester) {
        alert('년도와 학기를 선택해 주세요.');
        return;
    }

    console.log('Loading schedule for year:', year, 'semester:', semester);

    fetch(`http://localhost:8080/schedule?year=${year}&semester=${semester}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch schedule');
            }
            return response.json();
        })
        .then(schedule => {
            console.log('Fetched schedule:', schedule);

            const tableBody = document.querySelector('#scheduleTable tbody');
            tableBody.innerHTML = '';  // 기존 행 제거

            schedule.forEach(entry => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${entry.teacher ? entry.teacher.name : 'N/A'}</td>
                    <td>${entry.subjectId || 'N/A'}</td>
                    <td>${entry.subjectName || 'N/A'}</td>
                    <td>${entry.dayOfWeek || 'N/A'}</td>
                    <td>${entry.subjectTime || 'N/A'}</td>
                    <td>${entry.classroom || 'N/A'}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('시간표를 가져오는 데 실패했습니다.');
        });
}
