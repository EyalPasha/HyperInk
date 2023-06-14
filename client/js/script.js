  // Retrieve product data from the JSON file
  var xhr = new XMLHttpRequest();
  var filePath = '../server/data/add-product.json'; 
  xhr.open('GET', filePath, true);
  xhr.responseType = 'json';
  
  xhr.onload = function() {
    if (xhr.status === 200) {
        var jsonData = xhr.response;
        console.log(jsonData);
      
        var products = []; // Array to store the products
      
        // Iterate over the JSON data and create product objects
        for (var i = 0; i < jsonData.length; i++) {
          var productData = jsonData[i];
          var product = {
            name: productData.name,
            category: productData.category,
            imageUrl: productData.imageUrl,
            description: productData.description,
            colors: productData.colors
          };
          products.push(product); // Add the product to the array
        }
    
        console.log(products);
      }
   
      var itemName = product.name;
      var itemCategory = product.category;
      var itemColors = product.colors;
      
      var itemNameElement = document.querySelector(".pro");

      if (itemNameElement) {
        itemNameElement.textContent = itemName;
      } else {
        console.error('Element with class "pro" not found.');
      }
  };
  
  xhr.send();
