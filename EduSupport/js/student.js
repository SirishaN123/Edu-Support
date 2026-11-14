let ticketForm = document.getElementById("ticketForm");

ticketForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let category = document.getElementById("category").value;
    let subject = document.getElementById("subject").value;
    let description = document.getElementById("description").value;
    let priority = document.getElementById("priority").value;

    let ticket = {
        id: "TKT" + String(tickets.length + 1).padStart(3, "0"),
        category: category,
        subject: subject,
        description: description,
        priority: priority,
        status: "Open",
        assignedTo: "Unassigned",
        createdAt: new Date().toLocaleString(),
        resolvedAt: null,
        activity: [
            "Ticket created"
        ]
    };

    tickets.push(ticket);

    saveTickets();

    alert("Ticket created successfully! Ticket ID: " + ticket.id);

    ticketForm.reset();

    displayTickets();
    updateSummary();
});


function displayTickets() {

    let table = document.getElementById("ticketTable");

    table.innerHTML = "";

    tickets.forEach(function(ticket) {

        let row = `
            <tr>
                <td>${ticket.id}</td>
                <td>${ticket.category}</td>
                <td>${ticket.subject}</td>
                <td>${ticket.priority}</td>
                <td>${ticket.status}</td>
            </tr>
        `;

        table.innerHTML += row;
    });
}


function updateSummary() {

    document.getElementById("totalTickets").textContent =
        tickets.length;

    document.getElementById("openTickets").textContent =
        tickets.filter(ticket => ticket.status === "Open").length;

    document.getElementById("resolvedTickets").textContent =
        tickets.filter(ticket => ticket.status === "Resolved").length;
}


function logout() {
    window.location.href = "index.html";
}


displayTickets();
updateSummary();