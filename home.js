async function loadStats() {

    try {

        const response =
            await fetch("http://localhost:8080/dashboard");

        const data = await response.json();

        document.getElementById("totalBooks").innerText =
            data.totalBooks;

        document.getElementById("issuedBooks").innerText =
            data.issuedBooks || 0;

        document.getElementById("availableBooks").innerText =
            data.availableBooks || data.totalBooks;
        
        document.getElementById("differentTitles").innerText =
            data.differentTitles;

    } catch (error) {

        console.log("Error loading stats:", error);

    }
}

loadStats();