document.addEventListener("DOMContentLoaded", () => {
    const url = "donors.json";
  
    function fetchDonors() {
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          const donors = data.donors;
          populateTable(donors);
          setupSort(donors);
        })
        .catch(error => console.log(error));
    }
  
    function setupSort(donors) {
      const change = document.getElementById("change");
      change.addEventListener("change", () => sortTable(donors, change.value));
    }
  
    function sortTable(donors, selectedOption) {
      donors.sort((a, b) => {
        if (selectedOption === "Date") {
          return new Date(a.Date) - new Date(b.Date);
        } else if (selectedOption === "Contact"){
          return a.Contact.localeCompare(b.Contact);
        } else if (selectedOption === "Amount"){
          return a.Amount - b.Amount;
        }
      });
      clearTable();
      populateTable(donors);
    }
  
    function clearTable() {
      const tableBody = document.querySelector("#report");
      while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
      }
    }
  
    function populateTable(donors) {
      const tableBody = document.querySelector("#report");
      const theadRow = document.createElement("tr");
      const headers = ["Date", "Contact", "Phone", "Email", "Address", "Amount"];
  
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        theadRow.appendChild(th);
      });
  
      const thead = document.createElement("thead");
      thead.appendChild(theadRow);
      tableBody.appendChild(thead);
  
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
    }
  
    fetchDonors();
  });