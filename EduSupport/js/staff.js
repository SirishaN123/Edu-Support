function displayTickets() {

    let table = document.getElementById("staffTicketTable");

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


    filteredTickets.forEach(function(ticket) {

        let row = document.createElement("tr");

        row.innerHTML = `

            <td>${ticket.id}</td>

            <td>${ticket.category}</td>

            <td>${ticket.subject}</td>

            <td>${ticket.priority}</td>

            <td>${ticket.status}</td>

            <td>
                <select onchange="assignTicket('${ticket.id}', this.value)">

                    <option value="">
                        Select Staff
                    </option>

                    <option value="Ravi"
                        ${ticket.assignedTo === "Ravi" ? "selected" : ""}>
                        Ravi
                    </option>

                    <option value="Priya"
                        ${ticket.assignedTo === "Priya" ? "selected" : ""}>
                        Priya
                    </option>

                    <option value="Anil"
                        ${ticket.assignedTo === "Anil" ? "selected" : ""}>
                        Anil
                    </option>

                </select>
            </td>

            <td>

                <select onchange="updateStatus('${ticket.id}', this.value)">

                    <option value="">Update</option>

                    <option value="Assigned">
                        Assigned
                    </option>

                    <option value="In Progress">
                        In Progress
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                    <option value="Resolved">
                        Resolved
                    </option>

                    <option value="Closed">
                        Closed
                    </option>

                </select>

            </td>

            <td>
                <button type="button" class="view-btn">
                    view
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


function assignTicket(ticketId, staffName) {

    if (staffName === "") {
        return;
    }

    let ticket = tickets.find(function(ticket) {
        return ticket.id === ticketId;
    });

    if (!ticket) {
        return;
    }

    ticket.assignedTo = staffName;

    ticket.activity.push(
        "Ticket assigned to " + staffName
    );

    if (ticket.status === "Open") {
        ticket.status = "Assigned";
    }

    saveTickets();

    alert(
        ticketId + " assigned to " + staffName
    );

    displayTickets();
}


function updateStatus(ticketId, newStatus) {

    if (newStatus === "") {
        return;
    }

    let ticket = tickets.find(function(ticket) {
        return ticket.id === ticketId;
    });

    if (!ticket) {
        return;
    }

    ticket.status = newStatus;

    ticket.activity.push(
        "Status changed to " + newStatus
    );

    if (newStatus === "Resolved") {
        ticket.resolvedAt = new Date().toLocaleString();
    }

    saveTickets();

    alert(
        ticketId + " updated to " + newStatus
    );

    displayTickets();
}


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


function logout() {

    window.location.href = "index.html";
}

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
        alert("No activity found for " + ticketId);
        return;
    }

    alert(
        "Activity History - " + ticketId +
        "\n\n" +
        history.join("\n")
    );
}


displayTickets();