const ApiKey = "JQRhnqJnS38nx69on4EPGXsLuPyJHmqZmpTRWhes";

const spinnerHTML = `<div class="flex items-center justify-center py-12">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                    </div>`;

//Main Menu Btns
const navLinks = document.querySelectorAll(".nav-link");
const allSections = document.querySelectorAll(".pageSection");

//Search Filter (grid || List)
const gridBtn = document.getElementById("grid-view-btn");
const listBtn = document.getElementById("list-view-btn");

const container = document.getElementById("recipes-grid");
const recipeCards = document.querySelectorAll(".recipe-card");

//Main Menu 1: Meals and Recipes:- 
let searchBar = document.getElementById("search-input");

let recipesCount = document.getElementById("recipes-count");
let recipesGrid = document.getElementById("recipes-grid");

let areaGrid = document.getElementById("search-area");
let categoriesGrid = document.getElementById("categories-grid");

let heroSection = document.getElementById("hero-section");
let actionSection = document.getElementById("action-section");
let IngredientsSection = document.getElementById("Ingredients-section");
let InstructionSection = document.getElementById("Instruction-section");
let VideoSection = document.getElementById("video-section");
let nutritionSection = document.getElementById("nutrition-section");

// let logMealBtn = document.getElementById("log-meal-btn");

// product scanner // Menu 2
let productSearchInput = document.getElementById("product-search-input");
let productSearchBtn = document.getElementById("search-product-btn");

let barCodeSearchInput = document.getElementById("barcode-input");
let barCodeSearchBtn = document.getElementById("lookup-barcode-btn");

let productsGrid = document.getElementById("products-grid");
let clearFoodLogBtn = document.getElementById("clear-foodlog");

let productModal = document.getElementById("product-detail-modal");

// logged items // Menu 3
let progressBar = document.getElementById("progressBar");
let loggedItem = document.getElementById("logged-items-list");
let loggedItemHeader = document.getElementById("logged-items-head");


let foodList;

if(localStorage.getItem("foodList")){
    foodList = JSON.parse(localStorage.getItem("foodList"));
    displayLoggedCards(foodList);
    displayProgressBar(foodList);
} else {
    foodList = [];
}

function saveToLocalStorage(foodList){
    localStorage.setItem("foodList" , JSON.stringify(foodList))
}

document.addEventListener("DOMContentLoaded", () => {

    function hideAllSections() {
        allSections.forEach(section => {
            section.style.display = "none";
        });
    }

    //Main Menu1
    function showMealsPage() {
        document.getElementById("search-filters-section").style.display = "block";
        document.getElementById("meal-categories-section").style.display = "block";
        document.getElementById("all-recipes-section").style.display = "block";

        //show all meals and stuff like that
        getAreas();
        getCategories();
        getMeals();
    }

    //Main Menu2
    function showProductsPage() {
        document.getElementById("products-section").style.display = "block";
    }

    //Main Menu3
    function showFoodLogPage() {
        document.getElementById("foodlog-section").style.display = "block";
    }

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            // Hide everything first
            hideAllSections();

            // productModal.classList.remove("hidden");
            // productModal.classList.add("hidden");

            // Remove active Telwind styles from all
            navLinks.forEach(_link => {
                _link.classList.remove("bg-emerald-50", "text-emerald-700", "font-semibold");
                _link.classList.add("text-gray-600");
            });

            // Add Active Telwind Style to clicked btn
            link.classList.add("bg-emerald-50", "text-emerald-700", "font-semibold");
            link.classList.remove("text-gray-600");



            // load related section to the btn clicked
            let target = link.dataset.target;
            
            if (target === "search-filters-section") {
                showMealsPage();
            } else if (target === "products-section") {
                showProductsPage();
            } else if (target === "foodlog-section") {
                showFoodLogPage();
            }

        });
    });

    hideAllSections();
    showMealsPage();
});


//Grid
gridBtn.addEventListener("click", () => {
    // remove flex for correct Card design
    recipeCards.forEach(card => {
        card.classList.remove("flex", "flex-row");
    });

    // Container Grid Layout of 4 rows
    container.classList.remove("grid-cols-2");
    container.classList.add("grid-cols-4");


    // Button styles
    gridBtn.classList.add("bg-white", "shadow-sm");
    listBtn.classList.remove("bg-white", "shadow-sm");
});

//List
listBtn.addEventListener("click", () => {
    // add flex for correct Card design
    recipeCards.forEach(card => {
        card.classList.add("flex", "flex-row");
    });

    // Container Likst layout of 2 rows 
    container.classList.remove("grid-cols-4");
    container.classList.add("grid-cols-2");


    // Button styles
    listBtn.classList.add("bg-white", "shadow-sm");
    gridBtn.classList.remove("bg-white", "shadow-sm");
});

//Click on the reciepe from Menu 1
recipesGrid.addEventListener("click", async (e) => {
  const card = e.target.closest(".recipe-card");
  if (!card) return;

  const mealId = card.dataset.mealId;

  window.scrollTo({ top: 0, behavior: "smooth" });

  document.getElementById("search-filters-section").style.display = "none";
  document.getElementById("meal-categories-section").style.display = "none";
  document.getElementById("all-recipes-section").style.display = "none";
  
  document.getElementById("meal-details").style.display = "block";

  await getMealDetails(mealId);
});

//Get Meal details and display Them
async function getMealDetails(id)
{
    var res = await fetch(`https://nutriplan-api.vercel.app/api/meals/${id}`);
    res = await res.json();

    // console.log(res.result);
    
    let nutrition = createRecipeData1(res.result);
    analyzeAndDisplayRecipe(nutrition);

    displayAllMealDetails(res.result , nutrition);
}

function createRecipeData1(res) {
    let title = res.name;
    let ingredients = [];

    for(let i = 0; i < res.ingredients.length; i++)
    {
        ingredients.push(res.ingredients[i].ingredient);
    }

    return {
        title,
        ingredients
    }
}

function displayAllMealDetails(meal, nutrition)
{
    //Hero
    displayHeroMealDetails(meal);

    //action
    displayActionSection(meal, nutrition)

    //ingredients
    displayAllIngereidianets(meal);

    //instruction
    displayAllInstructions(meal);

    //video
    dipslayVideoSection(meal);
}

function displayHeroMealDetails(meal)
{
    var box = "";
    box = 
        `
            <div class="relative h-80 md:h-96">
                <img
                    src="${meal.thumbnail}"
                    alt="${meal.name}"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                ></div>
                <div class="absolute bottom-0 left-0 right-0 p-8">
                    <div class="flex items-center gap-3 mb-3">
                    <span
                        class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                        >${meal.category}</span
                    >
                    <span
                        class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                        >${meal.area}</span
                    >
                    </div>
                    <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                        ${meal.name}
                    </h1>
                    <div class="flex items-center gap-6 text-white/90">
                    <span class="flex items-center gap-2">
                        <i class="fa-solid fa-clock"></i>
                        <span>30 min</span>
                    </span>
                    <span class="flex items-center gap-2">
                        <i class="fa-solid fa-utensils"></i>
                        <span id="hero-servings">4 servings</span>
                    </span>
                    <span class="flex items-center gap-2">
                        <i class="fa-solid fa-fire"></i>
                        <span id="hero-calories">485 cal/serving</span>
                    </span>
                    </div>
                </div>
            </div>
        `;

    heroSection.innerHTML = box;
}

function displayActionSection(meal , nutrition)
{
    var box = "";
    box = 
        `
            <button
                id="log-meal-btn"
                class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
                data-meal-id="${meal.id}"
                >
                <i class="fa-solid fa-clipboard-list"></i>
                <span>Log This Meal</span>
            </button>
        `;

    actionSection.innerHTML = box;

    const logMealBtn = document.getElementById("log-meal-btn");

    logMealBtn.addEventListener("click", () => {
        analyzeRecipe(meal , nutrition);
        // logMeal(meal);
    });
}

function logMeal(meal , nutrition)
{
    var newMeal = {
        name : meal.name,
        img : meal.thumbnail,
        serving : nutrition.servings,
        calories: nutrition.perServing.calories,
        protein: nutrition.perServing.protein,
        carbs: nutrition.perServing.carbs,
        fat: nutrition.perServing.fat,
    }

    foodList.push(newMeal);
    console.log(newMeal);
    //display at the last section
    displayLoggedCards(foodList);
    displayProgressBar(foodList);
    saveToLocalStorage(foodList);
}

function logMeal2(meal)
{
    var newMeal = {
        name : meal.name,
        img : meal.image,
        serving : 1,
        calories: meal.nutrients.calories,
        protein: meal.nutrients.protein,
        carbs: meal.nutrients.carbs,
        fat: meal.nutrients.fat,
    }

    foodList.push(newMeal);
    console.log(newMeal);
    //display at the last section
    displayLoggedCards(foodList);
    displayProgressBar(foodList);
    saveToLocalStorage(foodList);
}

function displayAllIngereidianets(ingArr)
{
    var box = "";
    box = 
        `
            <h2
            class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
            >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${ingArr.ingredients.length} items</span
                  >
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

        `
    for (let i = 0; i < ingArr.ingredients.length; i++) 
    {
        box += 
            `
                <div
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
                >
                    <input
                        type="checkbox"
                        class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                        <span class="font-medium text-gray-900">${ingArr.ingredients[i].ingredient}</span> soy
                        sauce
                    </span>
                </div>
            `
    }

    box += `</div>`

    IngredientsSection.innerHTML = box;
}

function displayAllInstructions(instArr)
{
    var box = "";
    box = 
        `
            <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
            </h2>
            <div class="space-y-4">
        `
    for (let i = 0; i < instArr.instructions.length; i++) 
    {
        box += 
            `
                <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                    <div
                        class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
                    >
                        ${i+1}
                    </div>

                    <p class="text-gray-700 leading-relaxed pt-2">
                        ${instArr.instructions[i]}
                    </p>
                </div>
            `
    }

    box += `</div>`

    InstructionSection.innerHTML = box;
}

function dipslayVideoSection(meal)
{
    const videoId = meal.youtube.split("v=")[1]?.split("&")[0];

    box = 
        `
            <h2
                class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
            >
                <i class="fa-solid fa-video text-red-500"></i>
                Video Tutorial
            </h2>
            <div
                class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
            >
                <iframe
                src="https://www.youtube.com/embed/${videoId}"
                class="absolute inset-0 w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                >
                </iframe>
            </div>  
        `

    VideoSection.innerHTML = box;
}

function displayNutritionDetails(meal)
{
    var box = "";
    box += 
        `
            <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
                    <p class="text-sm text-gray-500 mb-4">Per serving</p>

                    <div
                        class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                    >
                        <p class="text-sm text-gray-600">Calories per serving</p>
                        <p class="text-4xl font-bold text-emerald-600">${meal.perServing.calories}</p>
                        <p class="text-xs text-gray-500 mt-1">Total: ${meal.totals.calories} cal</p>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                                <span class="text-gray-700">Protein</span>
                            </div>
                            <span class="font-bold text-gray-900">${meal.perServing.protein}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                            <div
                                class="bg-emerald-500 h-2 rounded-full"
                                style="width: ${(meal.perServing.protein/meal.totals.protein)*100}%"
                            ></div>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span class="text-gray-700">Carbs</span>
                            </div>
                            <span class="font-bold text-gray-900">${meal.perServing.carbs}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                            <div
                                class="bg-blue-500 h-2 rounded-full"
                                style="width: ${(meal.perServing.carbs/meal.totals.carbs)*100}%"
                            ></div>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                                <span class="text-gray-700">Fat</span>
                            </div>
                            <span class="font-bold text-gray-900">${meal.perServing.fat}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                            <div
                                class="bg-purple-500 h-2 rounded-full"
                                style="width: ${(meal.perServing.fat/meal.totals.fat)*100}%"
                            ></div>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                                <span class="text-gray-700">Fiber</span>
                            </div>
                            <span class="font-bold text-gray-900">${meal.perServing.fiber}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                            <div
                                class="bg-orange-500 h-2 rounded-full"
                                style="width: ${(meal.perServing.fiber/meal.totals.fiber)*100}%"
                            ></div>
                        </div>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                                <span class="text-gray-700">Sugar</span>
                            </div>
                            <span class="font-bold text-gray-900">${meal.perServing.sugar}g</span>
                        </div>
                        <div class="w-full bg-gray-100 rounded-full h-2">
                            <div
                                class="bg-pink-500 h-2 rounded-full"
                                style="width: ${(meal.perServing.sugar/meal.totals.sugar)*100}%"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        `

    nutritionSection.innerHTML = box;
}

// meal back btn
document.getElementById("back-to-meals-btn").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Hide details
    document.getElementById("meal-details").style.display = "none";
    
    //Nutrition Reset
    nutritionSection.innerHTML = "";

    // Show sections again
    document.getElementById("search-filters-section").style.display = "block";
    document.getElementById("meal-categories-section").style.display = "block";
    document.getElementById("all-recipes-section").style.display = "block";
});


// Search bar
async function searchRecipes()
{
    let searchVal = searchBar.value.toLowerCase();

    let res = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=${searchVal}&page=1&limit=25`);
    res = await res.json();
    
    displayMeals(res.results);
}

//Areas
async function getAreas()
{
    var res = await fetch(`https://nutriplan-api.vercel.app/api/meals/areas`);
    res = await res.json();
    
    displayAreas(res.results);
}

function displayAreas(arr)
{
    let box =
    `
            <button
                class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
                data-area="All"
            >
              All Recipes
            </button>
    `;

    for (let i = 0; i < 10; i++)
    {
        box += 
            `
                <button
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
                    data-area="${arr[i].name}"
                >
                ${arr[i].name}
                </button>
            `
    }

    areaGrid.innerHTML = box;
}

areaGrid.addEventListener("click", (e) => {
    const button  = e.target.closest("button");
    if (!button ) return;

    const area = button .dataset.area;

    if (area === "All") {
        // getRandMeals();
        getMeals();
    }
    else {
        getMealsByArea(area);
    }

});

async function getMealsByArea(area) {
    var res = await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?area=${area}&page=1&limit=25`);
    res = await res.json();

    displayMeals(res.results , area);
}

async function getRandMeals()
{
    var res = await fetch(`https://nutriplan-api.vercel.app/api/meals/random?count=25`);
    res = await res.json();

    displayMeals(res.results);
}

//category search
async function getCategories()
{
    var res = await fetch(`https://nutriplan-api.vercel.app/api/meals/categories`);
    res = await res.json();

    // console.log(res.results);
    displayCategories(res.results);
}

function displayCategories(arr)
{
    let box = "";
    for (let i = 0; i < arr.length; i++)
    {
        box += 
            `  
                <div
                class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
                data-category="${arr[i].name}"
                >
                    <div class="flex items-center gap-2.5">
                        <div
                        class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                        >
                            <i class="fa-solid fa-drumstick-bite"></i>
                        </div>
                        
                        <div>
                        <h3 class="text-sm font-bold text-gray-900">${arr[i].name}</h3>
                        </div>
                    </div>
                </div>
            `
    }

    categoriesGrid.innerHTML = box;
}

categoriesGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".category-card");
    if (!card) return;

    const category = card.dataset.category;
    getMealsByCategory(category);
});

async function getMealsByCategory(cat) {
    var res = await fetch(`https://nutriplan-api.vercel.app/api/meals/filter?category=${cat}&page=1&limit=25`);
    res = await res.json();

    // console.log(res.results);
    displayMeals(res.results , cat);
}

async function getMeals()
{
    var res = await fetch(`https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25`);
    res = await res.json();

    // console.log(res.results);
    displayMeals(res.results);
}

function displayMeals(arr , cat = "")
{
    let box = "";
    for (let i = 0; i < arr.length; i++)
    {
        box += 
            `
                <div
                class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-meal-id="${arr[i].id}"
                >
                    <div class="relative h-48 overflow-hidden">
                        <img
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src="${arr[i].thumbnail}"
                        alt="${arr[i].name}"
                        loading="lazy"
                        />
                        <div class="absolute bottom-3 left-3 flex gap-2">
                        <span
                            class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                        >
                            ${arr[i].category}
                        </span>
                        <span
                            class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                        >
                            ${arr[i].area}
                        </span>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3
                        class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                        >
                        ${arr[i].name}
                        </h3>
                        <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                        Delicious recipe to try!
                        </p>
                        <div class="flex items-center justify-between text-xs">
                        <span class="font-semibold text-gray-900">
                            <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                            ${arr[i].category}
                        </span>
                        <span class="font-semibold text-gray-500">
                            <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                            ${arr[i].area}
                        </span>
                        </div>
                    </div>
                </div>
            `    
    }

    recipesGrid.innerHTML = box;
    recipesCount.innerHTML = `Showing ${arr.length} ` + `${cat} recipes`;
}


// ----> Search by product name
async function SearchProduct(searchVal) {
    // let searchVal = searchBar.value.toLowerCase();
    console.log(searchVal);

    let res = await fetch(`https://nutriplan-api.vercel.app/api/products/search?q=${searchVal}&page=1&limit=24`);
    res = await res.json();

    console.log(res.results);
    displayProduct(res.results);
}

productSearchBtn.addEventListener("click", (e) => {
    SearchProduct(productSearchInput.value);
});

productSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        productSearchBtn.click();
    }
});

// ----> Search by barcode
async function SearchBarCode(searchVal) {
    // let searchVal = searchBar.value.toLowerCase();
    console.log(searchVal);

    let res = await fetch(`https://nutriplan-api.vercel.app/api/products/barcode/${searchVal}`);
    res = await res.json();

    console.log(res.result);
    displayBarcodeProduct(res.result);
    displayProductModal(res.result);
}

barCodeSearchBtn.addEventListener("click", (e) => {
    SearchBarCode(barCodeSearchInput.value);
});

barCodeSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        barCodeSearchBtn.click();
    }
});


// ----> Display product
function displayProduct(arr)
{
    let box = "";
    for (let i = 0; i < arr.length; i++)
    {
        box += 
            `
                <div
                    class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                    data-barcode="${arr[i].barcode}"
                >
                    <div
                    class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                    >
                        <img
                            class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                            src="${arr[i].image}"
                            alt="${arr[i].name}"
                            loading="lazy"
                        />

                        <!-- Nutri-Score Badge -->
                        <div
                            class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                        >
                            Nutri-Score ${arr[i].nutritionGrade.toUpperCase()}
                        </div>

                        <!-- NOVA Badge -->
                        <div
                            class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                            title="NOVA 2"
                        >
                            ${arr[i].novaGroup ?? 0}
                        </div>
                    </div>

                    <div class="p-4">
                        <p
                            class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                        >
                            ${arr[i].brand}
                        </p>
                        <h3
                            class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                        >
                            ${arr[i].name}
                        </h3>

                        <div
                            class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                        >
                            <span
                            ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                            >
                            <span
                            ><i class="fa-solid fa-fire mr-1"></i>${arr[i].nutrients.calories} kcal/100g</span
                            >
                        </div>

                        <!-- Mini Nutrition -->
                        <div class="grid grid-cols-4 gap-1 text-center">
                            <div class="bg-emerald-50 rounded p-1.5">
                            <p class="text-xs font-bold text-emerald-700">${arr[i].nutrients.protein}g</p>
                            <p class="text-[10px] text-gray-500">Protein</p>
                            </div>
                            <div class="bg-blue-50 rounded p-1.5">
                            <p class="text-xs font-bold text-blue-700">${arr[i].nutrients.carbs}g</p>
                            <p class="text-[10px] text-gray-500">Carbs</p>
                            </div>
                            <div class="bg-purple-50 rounded p-1.5">
                            <p class="text-xs font-bold text-purple-700">${arr[i].nutrients.fat}g</p>
                            <p class="text-[10px] text-gray-500">Fat</p>
                            </div>
                            <div class="bg-orange-50 rounded p-1.5">
                            <p class="text-xs font-bold text-orange-700">${arr[i].nutrients.sugar}g</p>
                            <p class="text-[10px] text-gray-500">Sugar</p>
                            </div>
                        </div>
                    </div>
                </div>
            `    
    }

    productsGrid.innerHTML = box;
}

function displayBarcodeProduct(barcode)
{
    let box = "";
    box += 
        `
            <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${barcode.barcode}"
            >
                <div
                class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                    <img
                        class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        src="${barcode.image}"
                        alt="${barcode.name}"
                        loading="lazy"
                    />

                    <!-- Nutri-Score Badge -->
                    <div
                        class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                    >
                        Nutri-Score ${barcode.nutritionGrade.toUpperCase()}
                    </div>

                    <!-- NOVA Badge -->
                    <div
                        class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                        title="NOVA 2"
                    >
                        ${barcode.novaGroup ?? 0}
                    </div>
                </div>

                <div class="p-4">
                    <p
                        class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                    >
                        ${barcode.brand}
                    </p>
                    <h3
                        class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                    >
                        ${barcode.name}
                    </h3>

                    <div
                        class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                    >
                        <span
                        ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                        >
                        <span
                        ><i class="fa-solid fa-fire mr-1"></i>${barcode.nutrients.calories} kcal/100g</span
                        >
                    </div>

                    <!-- Mini Nutrition -->
                    <div class="grid grid-cols-4 gap-1 text-center">
                        <div class="bg-emerald-50 rounded p-1.5">
                        <p class="text-xs font-bold text-emerald-700">${barcode.nutrients.protein}g</p>
                        <p class="text-[10px] text-gray-500">Protein</p>
                        </div>
                        <div class="bg-blue-50 rounded p-1.5">
                        <p class="text-xs font-bold text-blue-700">${barcode.nutrients.carbs}g</p>
                        <p class="text-[10px] text-gray-500">Carbs</p>
                        </div>
                        <div class="bg-purple-50 rounded p-1.5">
                        <p class="text-xs font-bold text-purple-700">${barcode.nutrients.fat}g</p>
                        <p class="text-[10px] text-gray-500">Fat</p>
                        </div>
                        <div class="bg-orange-50 rounded p-1.5">
                        <p class="text-xs font-bold text-orange-700">${barcode.nutrients.sugar}g</p>
                        <p class="text-[10px] text-gray-500">Sugar</p>
                        </div>
                    </div>
                </div>
            </div>
        `

    productsGrid.innerHTML = box;
}

//click onn the product from menu2:-
productsGrid.addEventListener("click", async (e) =>{
    const card = e.target.closest(".product-card");
    if(!card) return;

    const code = card.dataset.barcode;
})

//Display product modal:-
function displayProductModal(barcode)
{
    var box = "";
    
    box = 
        `
        <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">   
            <div class="p-6">
                <!-- Header -->
                <div class="flex items-start gap-6 mb-6">
                    <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src="${barcode.image}"
                        alt="${barcode.name}"
                        class="w-full h-full object-contain">
                    </div>
                    <div class="flex-1">
                        <p class="text-sm text-emerald-600 font-semibold mb-1">${barcode.brand}</p>
                        <h2 class="text-2xl font-bold text-gray-900 mb-2">${barcode.name}</h2>
                        <p class="text-sm text-gray-500 mb-3">400 g</p>
                        
                        <div class="flex items-center gap-3">
                            
                                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #e63e1120">
                                    <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: #e63e11">
                                        ${barcode.nutritionGrade.toUpperCase()}
                                    </span>
                                    <div>
                                        <p class="text-xs font-bold" style="color: #e63e11">Nutri-Score</p>
                                    </div>
                                </div>
                            
                            
                            
                                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #e63e1120">
                                    <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: #e63e11">
                                        ${barcode.novaGroup ?? 0}
                                    </span>
                                    <div>
                                        <p class="text-xs font-bold" style="color: #e63e11">NOVA</p>
                                        <p class="text-[10px] text-gray-600">Ultra-processed</p>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                    <button class="close-product-modal text-gray-400 hover:text-gray-600">
                        <i class="text-2xl" data-fa-i2svg=""><svg class="svg-inline--fa fa-xmark" data-prefix="fas" data-icon="xmark" role="img" viewBox="0 0 384 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"></path></svg></i>
                    </button>
                </div>
                
                <!-- Nutrition Facts -->
                <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
                    <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <i class="text-emerald-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-chart-pie" data-prefix="fas" data-icon="chart-pie" role="img" viewBox="0 0 576 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M512.4 240l-176 0c-17.7 0-32-14.3-32-32l0-176c0-17.7 14.4-32.2 31.9-29.9 107 14.2 191.8 99 206 206 2.3 17.5-12.2 31.9-29.9 31.9zM222.6 37.2c18.1-3.8 33.8 11 33.8 29.5l0 197.3c0 5.6 2 11 5.5 15.3L394 438.7c11.7 14.1 9.2 35.4-6.9 44.1-34.1 18.6-73.2 29.2-114.7 29.2-132.5 0-240-107.5-240-240 0-115.5 81.5-211.9 190.2-234.8zM477.8 288l64 0c18.5 0 33.3 15.7 29.5 33.8-10.2 48.4-35 91.4-69.6 124.2-12.3 11.7-31.6 9.2-42.4-3.9L374.9 340.4c-17.3-20.9-2.4-52.4 24.6-52.4l78.2 0z"></path></svg></i>
                        Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
                    </h3>
                    
                    <div class="text-center mb-4 pb-4 border-b border-emerald-200">
                        <p class="text-4xl font-bold text-gray-900">${barcode.nutrients.calories}</p>
                        <p class="text-sm text-gray-500">Calories</p>
                    </div>
                    
                    <div class="grid grid-cols-4 gap-4">
                        <div class="text-center">
                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div class="bg-emerald-500 h-2 rounded-full" style="width: 12.6%"></div>
                            </div>
                            <p class="text-lg font-bold text-emerald-600">${barcode.nutrients.protein}g</p>
                            <p class="text-xs text-gray-500">Protein</p>
                        </div>
                        <div class="text-center">
                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div class="bg-blue-500 h-2 rounded-full" style="width: 57.49999999999999%"></div>
                            </div>
                            <p class="text-lg font-bold text-blue-600">${barcode.nutrients.carbs}g</p>
                            <p class="text-xs text-gray-500">Carbs</p>
                        </div>
                        <div class="text-center">
                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div class="bg-purple-500 h-2 rounded-full" style="width: 47.53846153846153%"></div>
                            </div>
                            <p class="text-lg font-bold text-purple-600">${barcode.nutrients.fat}g</p>
                            <p class="text-xs text-gray-500">Fat</p>
                        </div>
                        <div class="text-center">
                            <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div class="bg-orange-500 h-2 rounded-full" style="width: 100%"></div>
                            </div>
                            <p class="text-lg font-bold text-orange-600">${barcode.nutrients.sugar}g</p>
                            <p class="text-xs text-gray-500">Sugar</p>
                        </div>
                    </div>
                </div>
                
                <!-- Additional Info -->
                <div class="bg-gray-50 rounded-xl p-5 mb-6">
                    <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <i class="text-gray-600" data-fa-i2svg=""><svg class="svg-inline--fa fa-list" data-prefix="fas" data-icon="list" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"></path></svg></i>
                        Ingredients
                    </h3>
                    <p class="text-sm text-gray-600 leading-relaxed">Sucre, huile de palme, NOISETTES 13%, cacao maigre 7,4%, LAIT écrémé en poudre 6,6%, LACTOSERUM en poudre, émulsifiants: lécithines [SOJA), vanilline. Sans gluten.</p>
                </div>  
                
                <div class="bg-red-50 rounded-xl p-5 mb-6 border border-red-200">
                    <h3 class="font-bold text-red-700 mb-2 flex items-center gap-2">
                        <i data-fa-i2svg=""><svg class="svg-inline--fa fa-triangle-exclamation" data-prefix="fas" data-icon="triangle-exclamation" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"></path></svg></i>
                        Allergens
                    </h3>
                    <p class="text-sm text-red-600">en:milk,en:nuts,en:soybeans</p>
                </div>
                
                
                <!-- Actions -->
                <div class="flex gap-3">
                    <button id="productModalLog" class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="3017620422003">
                        <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>Log This Food
                    </button>
                    <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                        Close
                    </button>
                </div>
            </div>
        </div>
        `;

        productModal.innerHTML = box;
        productModal.classList.remove("hidden");

        const productModalLog = document.getElementById("productModalLog");
        productModalLog.addEventListener("click", () => {
            // analyzeRecipe(barcode , nutrition);
            logMeal2(barcode);
            productModal.classList.add("hidden");
        });

}

productModal.addEventListener("click", function (e) {
    // Close button
    if (e.target.closest(".close-product-modal")) {
        productModal.classList.add("hidden");
    }

    //close when clicking backdrop
    if (e.target === productModal) {
        productModal.classList.add("hidden");
    }
});

// Food Log 
async function searchNutritionOf(foodID) {
    var res = await fetch(`https://nutriplan-api.vercel.app/api/nutrition/food/534358`,
        {
            headers:{
                "x-api-key": ApiKey
            }
        }
    );

    res = await res.json();

    console.log(res.result);
}

async function analyzeAndDisplayRecipe(recipe) {
    nutritionSection.innerHTML = spinnerHTML;

    let res = await fetch(
        "https://nutriplan-api.vercel.app/api/nutrition/analyze",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": ApiKey
            },
            body: JSON.stringify(recipe)
        }
    );

    res = await res.json();
    // console.log(res.data);
    displayNutritionDetails(res.data);
}

async function analyzeRecipe(meal , recipe) {
    nutritionSection.innerHTML = spinnerHTML;

    let res = await fetch(
        "https://nutriplan-api.vercel.app/api/nutrition/analyze",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": ApiKey
            },
            body: JSON.stringify(recipe)
        }
    );

    res = await res.json();
    console.log(res.data);
    logMeal(meal , res.data);
}

const today = new Date();

const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
});

document.getElementById("foodlog-date").textContent = formattedDate;

function deleteLoggedCards(index)
{
    foodList.splice(index , 1);

    displayLoggedCards(foodList);
    displayProgressBar(foodList);
    saveToLocalStorage(foodList);
}

function deleteAllLoggedCards()
{
    foodList.length = 0;

    displayLoggedCards(foodList);
    displayProgressBar(foodList);
    saveToLocalStorage(foodList);
}

//delete all btn event
document.addEventListener("click", (e) => {
    if (e.target.closest("#clear-foodlog")) {
            deleteAllLoggedCards();
    }
});

//remove item from list btn event
loggedItem.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-foodlog-item");
    if (!btn) return;

    const index = Number(btn.dataset.index);
    console.log(index);
    
    deleteLoggedCards(index);
});

function displayProgressBar(foodList)
{
    let box = "";
    let cal = 0;
    let prot = 0;
    let carb = 0;
    let fat = 0;

    for (let i = 0; i < foodList.length; i++) {
        cal += foodList[i].calories;
        prot += foodList[i].protein;
        carb += foodList[i].carbs;
        fat += foodList[i].fat;
    }

    box += 
        `
            <div class="bg-emerald-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-gray-700"
                        >Calories</span
                    >
                    <span class="text-xs text-gray-500">${cal} / 2000 kcal</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        class="bg-emerald-500 h-2.5 rounded-full"
                        style="width: ${Math.min((cal/2000*100),100)}%"
                    ></div>
                </div>
            </div>

            <!-- Protein Progress -->
            <div class="bg-blue-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-gray-700"
                        >Protein</span
                    >
                    <span class="text-sm text-gray-500">${prot} / 50 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        class="bg-blue-500 h-2.5 rounded-full"
                        style="width: ${Math.min((prot/50*100),100)}%"
                    ></div>
                </div>
            </div>

            <!-- Carbs Progress -->
            <div class="bg-amber-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-gray-700">Carbs</span>
                    <span class="text-sm text-gray-500">${carb} / 250 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        class="bg-amber-500 h-2.5 rounded-full"
                        style="width: ${Math.min((carb / 250) * 100, 100)}%"
                    ></div>
                </div>
            </div>

            <!-- Fat Progress -->
            <div class="bg-purple-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-gray-700">Fat</span>
                    <span class="text-sm text-gray-500">${fat} / 65 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        class="bg-purple-500 h-2.5 rounded-full"
                        style="width: ${Math.min((fat/65)*100 ,100)}%"
                    ></div>
                </div>
            </div>
        `
    progressBar.innerHTML = box;
}

function displayLoggedCards(foodList)
{
    loggedItemHeader.innerHTML = 
        `
            <h4 class="text-sm font-semibold text-gray-700">
                  Logged Items (${foodList.length})
            </h4>
            <button
                  id="clear-foodlog"
                  class="text-red-500 hover:text-red-600 text-sm font-medium"
                  style="display: block"
                >
                  <i class="fa-solid fa-trash mr-1"></i>Clear All
            </button>
        `;

    if(foodList.length > 0)
    {
        box = "";
        for (let i = 0; i < foodList.length; i++) {
            box += 
            `
                <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                    <div class="flex items-center gap-4">
                        <img src="${foodList[i].img}"
                            alt="${foodList[i].name}"
                            class="w-14 h-14 rounded-xl object-cover">
                        </img>
                        <div>
                            <p class="font-semibold text-gray-900">${foodList[i].name}</p>
                            <p class="text-sm text-gray-500">
                                ${foodList[i].serving} serving
                                <span class="mx-1">•</span>
                                <span class="text-emerald-600">Recipe</span>
                            </p>
                            <p class="text-xs text-gray-400 mt-1">4:49 PM</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="text-right">
                            <p class="text-lg font-bold text-emerald-600">${foodList[i].calories}</p>
                            <p class="text-xs text-gray-500">kcal</p>
                        </div>
                        <div class="hidden md:flex gap-2 text-xs text-gray-500">
                            <span class="px-2 py-1 bg-blue-50 rounded">32g P</span>
                            <span class="px-2 py-1 bg-amber-50 rounded">240g C</span>
                            <span class="px-2 py-1 bg-purple-50 rounded">45g F</span>
                        </div>
                        <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="${i}">
                            <i data-fa-i2svg=""><svg class="svg-inline--fa fa-trash-can" data-prefix="fas" data-icon="trash-can" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M136.7 5.9C141.1-7.2 153.3-16 167.1-16l113.9 0c13.8 0 26 8.8 30.4 21.9L320 32 416 32c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 8.7-26.1zM32 144l384 0 0 304c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-304zm88 64c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24zm104 0c-13.3 0-24 10.7-24 24l0 192c0 13.3 10.7 24 24 24s24-10.7 24-24l0-192c0-13.3-10.7-24-24-24z"></path></svg></i>
                        </button>
                    </div>
                </div>
            `
            loggedItem.innerHTML = box;
        }
    }
    else {
        loggedItem.innerHTML = 
        `
            <div class="text-center py-8 text-gray-500">
                  <i
                    class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
                  ></i>
                  <p class="font-medium">No meals logged today</p>
                  <p class="text-sm">
                    Add meals from the Meals page or scan products
                  </p>
            </div>
        `
    }
}