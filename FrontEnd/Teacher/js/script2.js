document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    const studentTable = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
    let students = [];

    // 학생 등록/수정 폼 제출
    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const studentId = document.getElementById("studentId").value;
        const name = document.getElementById("name").value;
        const birthDate = document.getElementById("birthDate").value;
        const gender = document.getElementById("gender").value;
        const address = document.getElementById("address").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const grade = document.getElementById("grade").value;
        const classValue = document.getElementById("class").value;

        const studentData = {
            name,
            birthDate,
            gender,
            address,
            phoneNumber,
            grade,
            class: classValue
        };

        if (studentId) {
            // 수정
            students[studentId] = studentData;
        } else {
            // 등록
            students.push(studentData);
        }

        resetForm();
        renderStudentTable();
    });

    // 학생 정보 테이블 렌더링
    function renderStudentTable() {
        studentTable.innerHTML = "";

        students.forEach((student, index) => {
            const row = studentTable.insertRow();

            row.insertCell(0).innerText = student.name;
            row.insertCell(1).innerText = student.birthDate;
            row.insertCell(2).innerText = student.gender;
            row.insertCell(3).innerText = student.address;
            row.insertCell(4).innerText = student.phoneNumber;
            row.insertCell(5).innerText = student.grade;
            row.insertCell(6).innerText = student.class;

            const editCell = row.insertCell(7);
            const deleteCell = row.insertCell(8);

            const editButton = document.createElement("button");
            editButton.innerText = "수정";
            editButton.addEventListener("click", () => editStudent(index));
            editCell.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "삭제";
            deleteButton.addEventListener("click", () => deleteStudent(index));
            deleteCell.appendChild(deleteButton);
        });
    }

    // 학생 정보 수정
    function editStudent(index) {
        const student = students[index];

        document.getElementById("studentId").value = index;
        document.getElementById("name").value = student.name;
        document.getElementById("birthDate").value = student.birthDate;
        document.getElementById("gender").value = student.gender;
        document.getElementById("address").value = student.address;
        document.getElementById("phoneNumber").value = student.phoneNumber;
        document.getElementById("grade").value = student.grade;
        document.getElementById("class").value = student.class;

        document.getElementById("submitButton").innerText = "수정";
    }

    // 학생 정보 삭제
    function deleteStudent(index) {
        students.splice(index, 1);
        renderStudentTable();
    }

    // 폼 초기화
    function resetForm() {
        document.getElementById("studentId").value = "";
        studentForm.reset();
        document.getElementById("submitButton").innerText = "등록";
    }
});
