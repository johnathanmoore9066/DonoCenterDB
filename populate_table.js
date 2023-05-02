document.addEventListener('DOMContentLoaded', () => {
  let inventoryData = {};

  const inventoryTableBody = document.getElementById('inventory-tbody');
  const submitButton = document.getElementById('submit');
  const deleteButton = document.getElementById('delete');
  const itemInput = document.getElementById('item');
  const qtyInput = document.getElementById('qty');
  const locationInput = document.getElementById('location');
  const inventorySearch = document.getElementById('inventorySearch');
  const recommendations = document.getElementById('recommendations');


    // Add a new column for checkboxes in the table header
    const inventoryTableHead = document.querySelector('#inventory thead tr');
    const checkboxHeader = document.createElement('th');
    inventoryTableHead.insertBefore(checkboxHeader, inventoryTableHead.firstChild);

    function populateTable() {
      inventoryTableBody.innerHTML = '';

      inventoryData.items.forEach((item, index) => {
        const row = document.createElement('tr');


    // Checkbox cell
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.index = index;
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    // Data cells
    Object.keys(item).forEach(key => {
      const cell = document.createElement('td');
      cell.textContent = item[key];
      row.appendChild(cell);
    });

    inventoryTableBody.appendChild(row);
  })
}

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    const newItem = {
      Item: itemInput.value,
      Quantity: qtyInput.value,
      Location: locationInput.value,
      Date_added: new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date()),
      Added_by: 'Current user',
    };

    inventoryData.items.push(newItem);
    saveInventoryData(); 
    populateTable();

    itemInput.value = '';
    qtyInput.value = '';
    locationInput.value = '';
  });

  deleteButton.addEventListener('click', () => {
    const checkboxes = Array.from(inventoryTableBody.getElementsByTagName('input'));

    const checkedIndexes = checkboxes
      .map((checkbox, index) => checkbox.checked ? index : -1)
      .filter(index => index !== -1);

    inventoryData.items = inventoryData.items.filter((_, index) => !checkedIndexes.includes(index));
    saveInventoryData(); // Save the inventory data
    populateTable();
  });

  function saveInventoryData() {
    localStorage.setItem('inventoryData', JSON.stringify(inventoryData));
  }

  const savedInventoryData = localStorage.getItem('inventoryData');
  if (savedInventoryData) {
    inventoryData = JSON.parse(savedInventoryData);
    populateTable();
  } else {
    fetch('inventory.json')
      .then(response => response.json())
      .then(data => {
        inventoryData = data;
        saveInventoryData();
        populateTable();
      })
      .catch(error => {
        console.error('Error fetching items.json:', error);
      });
  }
  
  function filterTable(searchText) {
    const rows = inventoryTableBody.getElementsByTagName('tr');
    searchText = searchText.toLowerCase();
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      let foundInRow = false;
      for (let j = 0; j < cells.length; j++) {
        const cellText = cells[j].textContent || cells[j].innerText;
        if (cellText.toLowerCase().includes(searchText)) {
          foundInRow = true;
          break;
        }
      }
      rows[i].style.display = foundInRow ? '' : 'none';
    }
  }
  
  function showRecommendations(searchText) {
    recommendations.innerHTML = '';
    if (searchText === '') {
      recommendations.classList.remove('visible');
      recommendations.classList.add('hidden');
      return;
    }
  
    const uniqueItems = new Set(
      inventoryData.items.map((item) => item.Item.toLowerCase())
    );
  
    const filteredItems = Array.from(uniqueItems).filter((item) =>
      item.includes(searchText.toLowerCase())
    );
  
    if (filteredItems.length > 0) {
      filteredItems.forEach((item) => {
        const recommendation = document.createElement('div');
        recommendation.textContent = item;
        recommendation.classList.add('recommendation');
        recommendation.addEventListener('click', () => {
          inventorySearch.value = item;
          filterTable(item);
          recommendations.classList.remove('visible');
          recommendations.classList.add('hidden');
        });
        recommendations.appendChild(recommendation);
      });
  
      recommendations.classList.remove('hidden');
      recommendations.classList.add('visible');
    } else {
      recommendations.classList.remove('visible');
      recommendations.classList.add('hidden');
    }
  }


inventorySearch.addEventListener('keyup', (e) => {
  filterTable(e.target.value);
  showRecommendations(e.target.value);
});
});



