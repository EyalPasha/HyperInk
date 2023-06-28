const prefix = 'http://localhost:3001/';

function addProduct() {

  const name = document.getElementById('name').value;
  const category = document.getElementById('category').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const description = document.getElementById('description').value;

  // color inputs
  const colorInputs = document.querySelectorAll('.color-input');
  const colors = [];

  // Iterate over each color
  colorInputs.forEach(colorInput => {
    const colorName = colorInput.value;

    // Get all size inputs for the chosen color
    const sizeInputs = colorInput.parentNode.querySelectorAll('.size-input');
    const sizes = [];

    // Iterate over each size for the chosen color
    sizeInputs.forEach(sizeInput => {
      const stockInput = sizeInput.parentNode.querySelector('.stock-input');
      const stock = parseInt(stockInput.value); // parseInt - convert a string to an integer

      // create a size object
      const size = {
        sizeName: sizeName,
        stock: stock
      };
      sizes.push(size);
    })

    // create a color object
    const color = {
      colorName: colorName,
      size: sizes
    };

    colors.push(color);
  });

  // create a product object
  const product = {
    name: name,
    category: category,
    imageUrl: imageUrl,
    description: description,
    colors: colors
  };

const form = document.getElementById('productForm');
form.addEventListener('submit', function (event) {
  console.log('baa');
  addProduct();
});

// HTML for delete a product in admin page
/*
<div id="productList">
  <ul>
    <li>
      <span>Product 1</span>
      <button class="delete-button" data-product-id="1">Delete</button>
    </li>
    <li>
      <span>Product 2</span>
      <button class="delete-button" data-product-id="2">Delete</button>
    </li>
    // Add more product items as needed 
  </ul>
</div>*/

/*function deleteProduct(itemId) {

  // tell the server to delete the product
  fetch(`/api/admin/delete-item/${itemId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      // Handle the server response
      console.log(data);

      if (data.success) { // boolean value (I added it to the JSON file)

        // Retrieve the product item element 
        const productItem = document.getElementById(`pro-${itemId}`);
        if (productItem) {
          // Remove the product item from the DOM
          productItem.remove();
          console.log(data.message);
        } else {
          console.log('Product not found in the list.');
        }
      } else {
        console.log('Error deleting product:', data.error);
      }
    })

    .catch(error => {
      console.error('Error:', error);
    });
}

const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault();
console.log('aa');
    const itemId = button.dataset.itemId;

    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      deleteProduct(itemId);
    }
  });
});

// HTML form for edit a product in admin page
/*<form id="editProductForm">
  <label for="newName">New Name:</label>
  <input type="text" id="newName" required>

  <label for="newImageUrl">New Image URL:</label>
  <input type="text" id="newImageUrl" required>

  <label for="newDescription">New Description:</label>
  <textarea id="newDescription" required></textarea>

  <button class="edit-button" data-product-id="2">Edit Product</button>
</form>*/

/*function editProduct(event) {
  event.preventDefault();

  const itemId = button.dataset.itemId;
  const newName = event.target.elements.newName.value;
  const newImageUrl = event.target.elements.newImageUrl.value;
  const newDescription = event.target.elements.newDescription.value;

  // create the updated product object
  const updatedProduct = {
    newName: newName,
    newImageUrl: newImageUrl,
    newDescription: newDescription
  };

  // Send the updated product object to the server 
  fetch(`/api/admin/edit-item/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedProduct)
  })
    .then(response => response.json())
    .then(data => {
      // Handle the server response
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const editForm = document.getElementById('editProductForm');
editForm.addEventListener('submit', editProduct);

const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault();

    const itemId = button.dataset.itemId;

    const confirmDelete = confirm('Are you sure you want to edit this product?');
    if (confirmDelete) {
      editProduct(itemId);
    }
  });
});
*/}
