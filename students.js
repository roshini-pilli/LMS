const API_URL = "http://localhost:8080/students";

// Load students when page opens
window.onload = function () {
    loadStudents();
};

// Fetch all students
async function loadStudents() {

    const response = await fetch(API_URL);
    const students = await response.json();

    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    students.forEach(student => {

        tableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.rollNo}</td>
                <td>${student.department}</td>
                <td>
                    <button class="delete-btn"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

// Add student
async function addStudent(event) {

    event.preventDefault();

    const student = {

        name: document.getElementById("name").value,
        rollNo: document.getElementById("rollNo").value,
        department: document.getElementById("department").value

    };

    await fetch(API_URL, {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)

    });

    document.querySelector("form").reset();

    loadStudents();

}

// Delete student
async function deleteStudent(id) {

    if (!confirm("Delete this student?"))
        return;

    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });

    loadStudents();

}