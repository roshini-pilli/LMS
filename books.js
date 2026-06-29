async function loadBooks() {
    const response = await fetch("http://localhost:8080/books");
    const books = await response.json();

    const tableBody = document.getElementById("bookTableBody");
    tableBody.innerHTML = "";

    books.forEach(book => {
        tableBody.innerHTML += `
        <tr>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.quantity}</td>
            <td>
                <button class="edit"
                    onclick="editBook(${book.id},
                    '${book.title}',
                    '${book.author}',
                    ${book.quantity})">
                    Edit
                </button>

                <button class="delete"
                    onclick="deleteBook(${book.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

async function addBook(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const quantity = document.getElementById("quantity").value;

    await fetch("http://localhost:8080/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            author,
            quantity
        })
    });

    document.querySelector("form").reset();
    loadBooks();
}

async function deleteBook(id) {
    await fetch(`http://localhost:8080/books/${id}`, {
        method: "DELETE"
    });

    loadBooks();
}
async function editBook(id, title, author, quantity) {

    const newTitle = prompt("Enter new title:", title);
    const newAuthor = prompt("Enter new author:", author);
    const newQuantity = prompt("Enter new quantity:", quantity);

    await fetch(`http://localhost:8080/books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newTitle,
            author: newAuthor,
            quantity: newQuantity
        })
    });

    loadBooks();
}
loadBooks();