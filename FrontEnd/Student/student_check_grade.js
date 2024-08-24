document.addEventListener('DOMContentLoaded', () => {
    populateYearOptions();
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

