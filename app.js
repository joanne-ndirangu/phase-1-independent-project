document.addEventListener('DOMContentLoaded', () => {
    //Fetches categories from category API
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))

//Function to display categories
    function displayCategories(categories) {
        let categoriesElement = document.getElementById('categories');

        categories.forEach(category => {
        let categoryElement = document.createElement('div')
        categoryElement.innerHTML = `
            <img class="pic" src="${category.strCategoryThumb}" alt="${category.strCategory}">
            <p class="cat">${category.strCategory}</p>`
        categoriesElement.appendChild(categoryElement)

        categoryElement.addEventListener('click', () => categoryData(category));
        })
    }
})


//Fetch meals under each category
function categoryData(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
    .then(res => res.json())
    .then(data => renderMeals(data))}

function renderMeals(data){
    let mealElement = document.getElementById('category-meals')

    mealElement.innerHTML = `
    <h2 class="category-meals">Meals</h2><br>`

    data.meals.forEach(meal => {
    let mealItem = document.createElement('div');
    mealItem.innerHTML = `
        <img class="meal-img" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p id="meal-name">${meal.strMeal}</p>
        `
    mealElement.appendChild(mealItem)
    })
}
