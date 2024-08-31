document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation button clicks
    document.querySelectorAll('.navigation button').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            loadPage(url);
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

function runScripts(html) {
    // 임시 DOM 요소를 생성하여 스크립트를 추출
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // 스크립트를 추출하고 실행
    tempDiv.querySelectorAll('script').forEach(script => {
        // 스크립트 태그의 src 속성이 있으면 외부 스크립트 로딩 시도
        if (script.src) {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.defer = true; // defer 속성 추가
            document.head.appendChild(newScript);
        } else {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            newScript.defer = true; // defer 속성 추가
            document.body.appendChild(newScript);
        }
    });
}

function loadPage(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('네트워크 응답이 좋지 않습니다.');
        })
        .then(html => {
            const mainContent = document.getElementById('main-content');
            mainContent.innerHTML = html;
            // 로드된 HTML의 스크립트를 실행
            runScripts(html);
            // 추가 스타일 적용 또는 요소 초기화
            applyStyles();
        })
        .catch(error => {
            console.error('페이지 로드 오류:', error);
        });
}

function applyStyles() {
    // 추가 스타일 적용 또는 요소 초기화 로직
}
