

document.addEventListener("DOMContentLoaded", () => {


    var xhr = new XMLHttpRequest();
    var url = "donors.json";
    
    xhr.open("GET", url, true);
    
    xhr.responseType = "json";
    
    xhr.onload = ()=> {
    if (xhr.status == 200) {
    var data = xhr.response;
    console.log(xhr.status);

const tableBody = document.querySelector("#report");
const theadRow = tableBody.querySelector("thead");
const headers = Array.from(theadRow.querySelectorAll("th")).slice(1);
const donors = data.donors;

donors.forEach((donor) => {
    const row = document.createElement("tr");
    const donorDate = document.createElement("td");
    const dateObj = new Date(donor.Date);
    donorDate.textContent = dateObj.toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric' });
    row.appendChild(donorDate)
    const donorContact = document.createElement("td");
    donorContact.textContent = donor.Contact;
    row.appendChild(donorContact)
    const donorPhone = document.createElement("td");
    donorPhone.textContent = donor.Phone;
    row.appendChild(donorPhone)
    const donorEmail = document.createElement("td");
    donorEmail.textContent = donor.Email;
    row.appendChild(donorEmail)
    const donorAddress = document.createElement("td");
    donorAddress.textContent = donor.Address;
    row.appendChild(donorAddress)
    const donorAmount = document.createElement("td");
    const amount = parseFloat(donor.Amount); // Convert the string to a number
    const amountObj = amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    donorAmount.textContent = amountObj;
    row.appendChild(donorAmount)

    

    tableBody.appendChild(row);
});

const change = document.getElementById("change");
change.addEventListener("change", sortTable);

function sortTable() {
    const selectedOption = change.value;

    donors.sort((a, b) => {
        if (selectedOption === "Date") {
            return new Date(a.Date) - new Date(b.Date);
        } else if (selectedOption === "Contact"){
            return a.Contact.localeCompare(b.Contact);
        } else if (selectedOption === "Amount"){
            return a.Amount - b.Amount;
        }
    });
        headers.forEach((header, index) => {
            const headerCell = document.createElement("th");
        headerCell.textContent = header.textContent;
        theadRow.appendChild(headerCell);

      });

    clearTable();
    populateTable(donors);
};

function clearTable() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}

function populateTable(donors) {

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Date", "Contact", "Phone", "Email", "Address", "Amount"];

    headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    tableBody.appendChild(thead);

donors.forEach((donor) => {
    const row = document.createElement("tr");
    const donorDate = document.createElement("td");
    donorDate.textContent = donor.Date;
    const dateObj = new Date(donor.Date);
    donorDate.textContent = dateObj.toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric' });
    row.appendChild(donorDate)
    const donorContact = document.createElement("td");
    donorContact.textContent = donor.Contact;
    row.appendChild(donorContact)
    const donorPhone = document.createElement("td");
    donorPhone.textContent = donor.Phone;
    row.appendChild(donorPhone)
    const donorEmail = document.createElement("td");
    donorEmail.textContent = donor.Email;
    row.appendChild(donorEmail)
    const donorAddress = document.createElement("td");
    donorAddress.textContent = donor.Address;
    row.appendChild(donorAddress)
    const donorAmount = document.createElement("td");
    const amount = parseFloat(donor.Amount); // Convert the string to a number
    const amountObj = amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    donorAmount.textContent = amountObj;
    row.appendChild(donorAmount)

    tableBody.appendChild(row);
});

}
}

};


xhr.send();
});

