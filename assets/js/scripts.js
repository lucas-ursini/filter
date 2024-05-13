document.addEventListener('DOMContentLoaded', function () {
    const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
    const selectedCategoriesContainer = document.getElementById('selectedCategories');
  
    categoryCheckboxes.forEach(function (checkbox) {
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          moveCategory(checkbox);
        } else {
          removeCategory(checkbox);
        }
        filterItems();
      });
    });
  
    function moveCategory(checkbox) {
      const category = checkbox.getAttribute('data-category');
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('selected-category');
      categoryDiv.dataset.category = category;
      categoryDiv.textContent = category;
      const removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.classList.add('btn', 'btn-sm', 'btn-danger', 'btn-remove-category');
      removeButton.dataset.category = category;
      removeButton.innerHTML = '<span aria-hidden="true">&times;</span>';
      removeButton.addEventListener('click', function () {
        checkbox.checked = false;
        removeCategory(checkbox);
        filterItems();
      });
      categoryDiv.appendChild(removeButton);
      selectedCategoriesContainer.appendChild(categoryDiv);
      
      // Oculta o checkbox correspondente na área de filtro
      checkbox.closest('.form-check').style.display = 'none';
    }
  
    function removeCategory(checkbox) {
      const category = checkbox.getAttribute('data-category');
      const categoryDiv = selectedCategoriesContainer.querySelector(`.selected-category[data-category="${category}"]`);
      if (categoryDiv) {
        categoryDiv.remove();
        
        // Exibe o checkbox correspondente na área de filtro
        checkbox.closest('.form-check').style.display = 'block';
      }
    }
  
    function filterItems() {
      const selectedCategories = [];
      categoryCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          selectedCategories.push(checkbox.getAttribute('data-category'));
        }
      });
  
      const items = document.querySelectorAll('#itemList li');
      items.forEach(function (item) {
        const category = item.dataset.category;
        const isMatchingCategory = selectedCategories.includes(category) || selectedCategories.length === 0;
        if (isMatchingCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  });
  