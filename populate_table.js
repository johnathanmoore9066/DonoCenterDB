// Add items to inventory table

document.addEventListener('DOMContentLoaded', () => {
  const addItemButton = document.getElementById('submit');
  const inventoryTableBody = document.querySelector('#inventory tbody');

  addItemButton.addEventListener('click', (event) => {
      event.preventDefault();
      
      const itemInput = document.getElementById('item');
      const qtyInput = document.getElementById('qty');
      const locationInput = document.getElementById('location');
      const descriptionInput = document.getElementById('description');

      const itemValue = itemInput.value;
      const qtyValue = qtyInput.value;
      const locationValue = locationInput.value;
      const descriptionValue = descriptionInput.value;

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
          <td>${itemValue}</td>
          <td>${qtyValue}</td>
          <td>${locationValue}</td>
          <td>${new Date().toLocaleString()}</td>
          <td>Current user</td>
          <td>${descriptionValue}</td>
      `;

      inventoryTableBody.appendChild(newRow);

      itemInput.value = '';
      qtyInput.value = '';
      locationInput.value = '';
      descriptionInput.value = '';
  });


});