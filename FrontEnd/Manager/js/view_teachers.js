document.addEventListener("DOMContentLoaded", function() {
    console.log('Document loaded');  // 페이지 로드 시 로그 출력

    // Fetch 학생 목록을 가져오는 요청
    fetch('http://localhost:8080/teachers') // API 주소를 절대 URL로 수정
        .then(response => response.text()) // JSON이 아닌 텍스트로 응답을 받아 확인
        .then(data => {
            console.log('Response data:', data); // 응답 데이터 출력
        })
        .catch(error => {
            console.error('Fetch error:', error); // 오류 메시지 출력
        });

    fetchTeachers(); // 실제 데이터 처리를 위한 함수 호출
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
        document.getElementById('role').textContent = `관리자 (ID: ${teacherId})`;
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
                window.location.href = '../../../Home.html';
            } else {
                alert('로그아웃 실패');
            }
        })
        .catch(error => console.error('오류:', error));
    });
});

function fetchTeachers() {
    console.log('Fetching teachers...');

    const tableBody = document.querySelector('#teacherTable tbody');
    console.log('Table body:', tableBody); // 로그 추가

    if (!tableBody) {
        console.error('Table body not found');
        return; // 테이블 바디가 없으면 함수 종료
    }

    // Fetch 요청 보내기
    fetch('http://localhost:8080/teachers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch teacher');
        }
        return response.json();
    })
    .then(teachers => {
        console.log('Fetched teachers:', teachers);

        tableBody.innerHTML = '';  // Clear existing rows

        teachers.forEach(teacher => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${teacher.name}</td>
                <td>${teacher.birthDate}</td>
                <td>${teacher.gender}</td>
                <td>${teacher.address}</td>
                <td>${teacher.phoneNumber}</td>
                <td>${teacher.department || 'N/A'}</td>
                <td>${teacher.email}</td>
            `;

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('교수 목록을 가져오는 데 실패했습니다.');
    });
}

