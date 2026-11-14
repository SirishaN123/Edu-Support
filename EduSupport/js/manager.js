function displayTickets() {

    let table = document.getElementById("managerTicketTable");

    let statusFilter = document.getElementById("statusFilter").value;

    let priorityFilter = document.getElementById("priorityFilter").value;

    table.innerHTML = "";


    let filteredTickets = tickets.filter(function(ticket) {

        let statusMatch =
            statusFilter === "All" ||
            ticket.status === statusFilter;

        let priorityMatch =
            priorityFilter === "All" ||
            ticket.priority === priorityFilter;

        return statusMatch && priorityMatch;

    });


    if (filteredTickets.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">No tickets found</td>
            </tr>
        `;

        updateSummary();

        return;
    }


    filteredTickets.forEach(function(ticket) {

        let row = document.createElement("tr");

        row.innerHTML = `

            <td>${ticket.id}</td>

            <td>${ticket.category}</td>

            <td>${ticket.subject}</td>

            <td>${ticket.priority}</td>

            <td>${ticket.status}</td>

            <td>${ticket.assignedTo}</td>

            <td>
                <button type="button" class="view-btn">
                    View
                </button>
            </td>

        `;


        row.querySelector(".view-btn").addEventListener("click", function() {

            viewActivity(ticket.id);

        });


        table.appendChild(row);

    });


    updateSummary();

}


// Update Dashboard Summary

function updateSummary() {

    document.getElementById("totalTickets").textContent =
        tickets.length;


    document.getElementById("openTickets").textContent =
        tickets.filter(function(ticket) {

            return ticket.status === "Open";

        }).length;


    document.getElementById("resolvedTickets").textContent =
        tickets.filter(function(ticket) {

            return ticket.status === "Resolved";

        }).length;

}


// View Ticket Activity

function viewActivity(ticketId) {

    let ticket = tickets.find(function(ticket) {

        return ticket.id === ticketId;

    });


    if (!ticket) {

        alert("Ticket not found");

        return;

    }


    let history = ticket.activity || [];


    if (history.length === 0) {

        alert("No activity found");

        return;

    }


    alert(

        "Activity History - " + ticketId +

        "\n\n" +

        history.join("\n")

    );

}


// Logout

function logout() {

    window.location.href = "index.html";

}


// Load Manager Dashboard

displayTickets();

updateSummary();