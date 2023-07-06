document.addEventListener('DOMContentLoaded', () => {
    //fetches categories from category API
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error));

})