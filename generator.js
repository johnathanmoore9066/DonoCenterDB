var xhr = new XMLHttpRequest();
var url = "donors.json";

xhr.open("GET", url, true);

xhr.responseType = "json";

xhr.onload = function() {
    if (xhr.status == 200) {
        var data = xhr.response;
        console.log(xhr.status);
    }
    
};

const tableBody = document.querySelector("#report");

fetch('donors.json')
.then(response => response.json())
.then(data => {
    const donors = data.donors;

    donors.forEach(function(donor) {
        const row = document.createElement("tr");
        const donorDate = document.createElement("td");
        donorDate.textContent = donor.date;
        row.appendChild(donorDate)
        const donorContact = document.createElement("td");
        donorContact.textContent = donor.contact;
        row.appendChild(donorContact)
        const donorOrg = document.createElement("td");
        donorOrg.textContent = donor.org;
        row.appendChild(donorOrg)
        const donorPhone = document.createElement("td");
        donorPhone.textContent = donor.phone;
        row.appendChild(donorPhone)
        const donorEmail = document.createElement("td");
        donorEmail.textContent = donor.email;
        row.appendChild(donorEmail)
        const donorAddress = document.createElement("td");
        donorAddress.textContent = donor.address;
        row.appendChild(donorAddress)
        const donorAmount = document.createElement("td");
        donorAmount.textContent = donor.amount;
        row.appendChild(donorAmount)

        tableBody.appendChild(row);

    });
    console.log(donors)
});


