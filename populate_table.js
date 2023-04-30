// Create an XMLHttpRequest object
var xhr = new XMLHttpRequest();

// Open the connection to the JSON file
xhr.open("GET", "inventory.json", true);

// Set the response format to JSON
xhr.responseType = "json";

// Specify what to do when the response is loaded
xhr.onload = function() {
  // Get the JSON data
  let data = xhr.response;

  // Get the table header element
  let thead = document.querySelector("table.inventory thead");

  // Create a new row for the header
  let headerRow = document.createElement("tr");

  // Loop through the keys of the first item in the data array
  for (let key in data.items[0]) {
    // Create a new header cell with the key text as the content
    const headerCell = document.createElement("th");
    headerCell.textContent = key.replace(/_/g, ' '); // Replace underscores with spaces

    // Add an event listener to sort the table by clicking on the column header
    headerCell.addEventListener('click', function() {
      sortTable(this.cellIndex);
    });

    headerRow.appendChild(headerCell);
  }

  // Append the header row to the table header
  thead.appendChild(headerRow);

  // Get the table body element
  const tbody = document.querySelector("table.inventory tbody");

  // Loop through the data and create table rows
  for (let i = 0; i < data.items.length; i++) {
    // Create a new row
    const row = document.createElement("tr");

    // Loop through the keys of the current item
    for (let key in data.items[i]) {
      // Create a new cell with the current item value as the content
      var cell = document.createElement("td");
      cell.textContent = data.items[i][key];

      // Add current date and time to the "Last updated" column
      if (key === 'Last_updated') {
        const currentDate = new Date();
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        cell.textContent = currentDate.toLocaleDateString("en-US", {year: 'numeric', month: 'numeric', day: 'numeric' }) + " " + currentDate.toLocaleTimeString("en-US", timeOptions);
      }

      row.appendChild(cell);
    }

    // Append the row to the table body
    tbody.appendChild(row);
  }

  // Sort the table by the first column on initial load
  sortTable(0);
};

// Send the request
xhr.send();

// Function to sort the table by a given column index
function sortTable(columnIndex) {
  const table = document.querySelector("table.inventory");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  // Sort the rows based on the data in the selected column
  rows.sort(function(a, b) {
    const aCellValue = a.querySelector("td:nth-child(" + (columnIndex + 1) + ")").textContent;
    const bCellValue = b.querySelector("td:nth-child(" + (columnIndex + 1) + ")").textContent;

    // If the cell value is a number, convert it to a number for proper sorting
    if (!isNaN(aCellValue) && !isNaN(bCellValue)) {
      aCellValue = parseFloat(aCellValue);
      bCellValue = parseFloat(bCellValue);
    }

    if (aCellValue > bCellValue) {
      return 1;
    } else if (aCellValue < bCellValue) {
      return -1;
    } else {
      return 0;
    }
  });

  // Append the sorted rows back to the table body
  for (var i = 0; i < rows.length; i++) {
    tbody.appendChild(rows[i]);
  }
}