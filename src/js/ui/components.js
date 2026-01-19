// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/


{/* <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" id="product-detail-modal">
        <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            
    <div class="p-6">
        <!-- Header -->
        <div class="flex items-start gap-6 mb-6">
            <div class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                
                    <img src="https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.633.400.jpg" alt="Nutella" class="w-full h-full object-contain">
                
            </div>
            <div class="flex-1">
                <p class="text-sm text-emerald-600 font-semibold mb-1">Nutella,Ferrero</p>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Nutella</h2>
                <p class="text-sm text-gray-500 mb-3">400 g</p>
                
                <div class="flex items-center gap-3">
                    
                        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #e63e1120">
                            <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: #e63e11">
                                E
                            </span>
                            <div>
                                <p class="text-xs font-bold" style="color: #e63e11">Nutri-Score</p>
                                <p class="text-[10px] text-gray-600">Bad</p>
                            </div>
                        </div>
                    
                    
                    
                        <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: #e63e1120">
                            <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: #e63e11">
                                4
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
                <p class="text-4xl font-bold text-gray-900">539</p>
                <p class="text-sm text-gray-500">Calories</p>
            </div>
            
            <div class="grid grid-cols-4 gap-4">
                <div class="text-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div class="bg-emerald-500 h-2 rounded-full" style="width: 12.6%"></div>
                    </div>
                    <p class="text-lg font-bold text-emerald-600">6.3g</p>
                    <p class="text-xs text-gray-500">Protein</p>
                </div>
                <div class="text-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div class="bg-blue-500 h-2 rounded-full" style="width: 57.49999999999999%"></div>
                    </div>
                    <p class="text-lg font-bold text-blue-600">57.5g</p>
                    <p class="text-xs text-gray-500">Carbs</p>
                </div>
                <div class="text-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div class="bg-purple-500 h-2 rounded-full" style="width: 47.53846153846153%"></div>
                    </div>
                    <p class="text-lg font-bold text-purple-600">30.9g</p>
                    <p class="text-xs text-gray-500">Fat</p>
                </div>
                <div class="text-center">
                    <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div class="bg-orange-500 h-2 rounded-full" style="width: 100%"></div>
                    </div>
                    <p class="text-lg font-bold text-orange-600">56.3g</p>
                    <p class="text-xs text-gray-500">Sugar</p>
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
                <div class="text-center">
                    <p class="text-sm font-semibold text-gray-900">10.6g</p>
                    <p class="text-xs text-gray-500">Saturated Fat</p>
                </div>
                <div class="text-center">
                    <p class="text-sm font-semibold text-gray-900">0.0g</p>
                    <p class="text-xs text-gray-500">Fiber</p>
                </div>
                <div class="text-center">
                    <p class="text-sm font-semibold text-gray-900">0.11g</p>
                    <p class="text-xs text-gray-500">Salt</p>
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
            <button class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all" data-barcode="3017620422003">
                <i class="mr-2" data-fa-i2svg=""><svg class="svg-inline--fa fa-plus" data-prefix="fas" data-icon="plus" role="img" viewBox="0 0 448 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"></path></svg></i>Log This Food
            </button>
            <button class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                Close
            </button>
        </div>
    </div>

    </div>
</div> */}