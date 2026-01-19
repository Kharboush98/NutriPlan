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


// logged items // Menu 3
let progressBar = document.getElementById("progressBar");
let loggedItem = document.getElementById("logged-items-list");
let loggedItemHeader = document.getElementById("logged-items-head");

// let productModal = document.getElementById("product-detail-modal");

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

            // document.getElementById("product-detail-modal").style.display = "none";
            // productModal.style.display = "none";

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
    DisplayBarcodeProduct(res.result);
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

function DisplayBarcodeProduct(barcode)
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