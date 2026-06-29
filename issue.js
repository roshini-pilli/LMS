async function loadIssues() {

    const response =
        await fetch("http://localhost:8080/issues");

    const issues =
        await response.json();

    const body =
        document.getElementById("issueTableBody");

    body.innerHTML = "";

    issues.forEach(issue => {

        body.innerHTML += `
        <tr>
            <td>${issue.id}</td>
            <td>${issue.studentName}</td>
            <td>${issue.bookTitle}</td>
            <td>
                <button class="return-btn"
                        onclick="returnBook(${issue.id})">
                    Return
                </button>
            </td>
        </tr>
        `;
    });
}

async function issueBook(event){

    event.preventDefault();

    const studentName =
        document.getElementById("studentName").value;

    const bookTitle =
        document.getElementById("bookTitle").value;

    await fetch("http://localhost:8080/issues",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            studentName,
            bookTitle
        })
    });

    document.querySelector("form").reset();

    loadIssues();
}

async function returnBook(id){

    await fetch(
        `http://localhost:8080/issues/${id}`,
        {method:"DELETE"}
    );

    loadIssues();
}

loadIssues();