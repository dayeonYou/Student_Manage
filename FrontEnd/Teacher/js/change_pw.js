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

function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const teacherId = sessionStorage.getItem('teacherId');

    if (!teacherId) {
        document.getElementById('message').textContent = "No teacher ID found in session.";
        document.getElementById('message').style.color = 'red';
        return;
    }

    // 새로운 비밀번호가 일치하는지 확인
    if (newPassword !== confirmPassword) {
        document.getElementById('message').textContent = "New passwords do not match.";
        document.getElementById('message').style.color = 'red';
        return;
    }

    // 비밀번호 변경 요청
    fetch('http://localhost:8080/api/auth/changePasswordT', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            teacherId: teacherId,
            currentPassword: currentPassword,
            newPassword: newPassword
        }).toString()
    })
    .then(response => {
        if (!response.ok) {
            // 응답이 성공적이지 않으면 에러로 처리
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const messageElement = document.getElementById('message');
        if (data.message) {
            messageElement.textContent = data.message;
            messageElement.style.color = data.message === 'Password changed successfully' ? 'green' : 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred. Please try again.';
        document.getElementById('message').style.color = 'red';
    });
}
