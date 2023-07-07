document.addEventListener('DOMContentLoaded', () => {
    //Fetches categories from category API
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))

//Function to display categories
    function displayCategories(categories) {
        let categoriesElement = document.getElementById('categories');
        categoriesElement.innerHTML = `
        <h2>Categories</h2>`

        categories.forEach(category => {
        let categoryElement = document.createElement('div')
        categoryElement.innerHTML = `
            <p class="cat"><strong>${category.strCategory}</strong></p>
            <img class="pic" src="${category.strCategoryThumb}" alt="${category.strCategory}">
            <p><strong>Description:</strong>${category.strCategoryDescription}</p><br>`
        categoriesElement.appendChild(categoryElement)

        categoryElement.addEventListener('click', () => categoryData(category))
        })
    }


// Add event listener to the back button
document.getElementById('backButton').addEventListener('click', () => {
    // Clear the category meals element
    document.getElementById('category-meals').innerHTML = '';

    // Show the categories view
    document.getElementById('categories').style.display = 'block'

    // Hide the back button
    document.getElementById('backButton').style.display = 'none'
  })

  // Fetch meals under each category
  function categoryData(category) {
    // Hide the categories view
    document.getElementById('categories').style.display = 'none'

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
      .then(res => res.json())
      .then(data => renderMeals(data))

    // Show the back button
    document.getElementById('backButton').style.display = 'block'
  }

  // Function to render meals
  function renderMeals(data) {
    let mealElement = document.getElementById('category-meals')
    mealElement.innerHTML = `
      <h2 >Meals</h2><br>`

    data.meals.forEach(meal => {
      let mealItem = document.createElement('div')
      mealItem.innerHTML = `
        <img class="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p id="meal-name">${meal.strMeal}</p>
      `
      mealElement.appendChild(mealItem)
    })
  }

  // Hide the back button initially (in case it's not on the meals page)
  document.getElementById('backButton').style.display = 'none';


//Function to search for a meal using the search bar
    function searchMeal(){
        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault()
            let searchText = e.target.searchInput.value
            e.target.reset()
            console.log(searchText)
            mealSearch(searchText)
        })
    }
    searchMeal()

//Fetch search data from search API
//Link function with render meals function
    function mealSearch(searchText) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
        .then(response => response.json())
        .then(data => {
            renderMeals(data)
        })
    }
    })