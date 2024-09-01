document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation button clicks
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

    // Call populateYearOptions to populate the year dropdown
    populateYearOptions();
});

document.getElementById('courseOfferingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const year = document.getElementById('year').value;
    const semester = document.getElementById('semester').value;

    // Validate year and semester
    if (!year) {
        alert('년도 선택이 필요합니다.');
        return;
    }

    if (!semester) {
        alert('학기 선택이 필요합니다.');
        return;
    }

    const teacherId = sessionStorage.getItem('teacherId');

    fetch(`http://localhost:8080/teachers/${teacherId}/course-offerings?year=${year}&semester=${semester}`)
    .then(response => response.json())
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function populateTable(courseOfferings) {
    const tableBody = document.getElementById('courseOfferingsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // 기존 행 지우기

    courseOfferings.forEach(course => {
        const row = tableBody.insertRow();

        row.insertCell(0).textContent = course.offeringId;
        row.insertCell(1).textContent = course.subject.subjectId;
        row.insertCell(2).textContent = course.subject.subjectName; // 과목 이름 추가
        row.insertCell(3).textContent = course.year;
        row.insertCell(4).textContent = course.semester;
        row.insertCell(5).textContent = course.dayOfWeek || 'N/A';
        row.insertCell(6).textContent = course.startClassTime || 'N/A';
    });
}

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
