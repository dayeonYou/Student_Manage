document.addEventListener('DOMContentLoaded', () => {
    // 모든 버튼에 클릭 이벤트 리스너 추가
    document.querySelectorAll('.navigation button').forEach(button => {
        button.addEventListener('click', () => {
            // 버튼의 data-url 속성에서 URL을 가져옴
            const url = button.getAttribute('data-url');
            loadPage(url);
        });
    });
});

function loadPage(url) {
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(html => {
            // main-content 영역에 HTML을 삽입
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}
