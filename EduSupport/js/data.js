let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

function saveTickets() {
    localStorage.setItem("tickets", JSON.stringify(tickets));
}