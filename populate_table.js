// Define constants
const INVENTORY_URL = "inventory.json";
const DATE_FORMAT_OPTIONS = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
const addItem = document.getElementById("addItem");
const modifyItem = document.getElementById("modifyItem");
const deleteItem = document.getElementById("deleteItem");


// Fetch inventory data from server
fetch(INVENTORY_URL)
  .then(response => response.json())
  .then(data => {
    // Add item to inventory
    addItem.addEventListener('click', () => {
      const addItemForm = document.getElementById("addItemForm");
      addItemForm.innerHTML = `
        <input type= "text" id=itemInput" placeholder="Item" required>
        <input type= "number" id=quantityInput" placeholder="Quantity" required>
        <input type= "text" id="locationInput" placeholder="Location" required> 
        <button type="submit" id="submit">Add</button>
      `;
      addItemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newItem = {
          "Item": document.getElementById("itemInput").value,
          "Qty": document.getElementById("quantityInput").value,
          "Location": document.getElementById("locationInput").value,
          "Last_updated": new Date().toLocaleDateString("en-US", DATE_FORMAT_OPTIONS),
          "Updated_by": "User"
        };
        data.items.push(newItem);
        updateInventory(data);
        
      
    })
  });

    // Get table elements
    const table = document.querySelector("table.inventory");
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");

    // Create table header row
    const headerRow = document.createElement("tr");
    for (let key in data.items[0]) {
      const headerCell = document.createElement("th");
      headerCell.textContent = key.replace(/_/g, ' ');
      headerCell.addEventListener('click', () => sortTable(key));
      headerRow.appendChild(headerCell);
    }
    thead.appendChild(headerRow);

    // Create table rows
    data.items.forEach(item => {
      const row = document.createElement("tr");
      for (let key in item) {
        const cell = document.createElement("td");
        cell.textContent = item[key];
        if (key === 'Last_updated') {
          const currentDate = new Date();
          cell.textContent = currentDate.toLocaleDateString("en-US", DATE_FORMAT_OPTIONS);
        }
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    });

    // Sort table by default column
    sortTable(Object.keys(data.items[0])[0]);
  })
  .catch(error => console.error(error));

// Function to sort the table by a given column key
function sortTable(columnKey) {
  const table = document.querySelector("table.inventory");
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aCellValue = a.querySelector(`td[data-key="${columnKey}"]`).textContent;
    const bCellValue = b.querySelector(`td[data-key="${columnKey}"]`).textContent;

    if (!isNaN(aCellValue) && !isNaN(bCellValue)) {
      return parseFloat(aCellValue) - parseFloat(bCellValue);
    } else {
      return aCellValue.localeCompare(bCellValue);
    }
  });
  
  tbody.innerHTML = "";
  rows.forEach(row => tbody.appendChild(row));
}