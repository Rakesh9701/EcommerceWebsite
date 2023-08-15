import products from "./data.json" assert{type:'json'}

console.log("Mobile deatils",products);

function jsondata_render(products){
    var season_new=`<div class="sales-season-new">New</div>`;
    var season_sale=`<div class="sales-season-sale">Sale</div>`;
    for(var i=0;i<products.length;i++){
        var seasons="";
        if(products[i].new && products[i].sale){
            seasons=season_new+season_sale;
        }else if(products[i].new){
            seasons=season_new;
        }else if(products[i].sale){
            seasons=season_sale;
        }
        var mobileproducts=`
            <div class="mobile-card">
                <div class="sales-wishlist">
                    <div class="sales">
                        <div class="sales-season">
                            ${seasons}
                        </div>
                    </div>
                    <div class="wishlist-icon">
                        <button id="testWishlistIcon">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                    </div>
                </div>
                    <div class="mobile-img">
                        <img src="${products[i].MobileImg}" alt="${products[i].title}" />
                    </div>
                    <div class="add-to-cart-desktop" >
                        <button id="button-add" class="added_cart" >ADD TO CART</button>
                        <button id="button-gallery" disabled>VIEW GALLERY</button>
                    </div>
                    <div class="add-to-cart " >
                        <button id="button-add" class="added_cart" >ADD TO CART</button>
                        <button id="button-gallery">VIEW GALLERY</button>
                    </div>
                    <div class="mobile-details">
                        <h4 class="mobile-details-title">${products[i].title} (${products[i].Color},${products[i].ROM})</h4>
                        <span>
                            ${ratingGenrator(products[i].Rating)}
                        </span>
                        <span id="no-of-reviews">(${products[i].Reviews})</span>
                        <span >
                            <h4 id="Discountedamt">
                                $${products[i].DiscountedPrice}
                                <s id="originalprice"> ₹${products[i].ActualPrice}</s>
                                <span id="offer-applicable">${products[i].Offer} </span>
                            </h4>
                        </span>
                    </div>
            
                </div>
            `
        document.getElementById("mobile-structure").innerHTML+=mobileproducts;
    }
}
jsondata_render(products);

//...................Accordion Symbol Works............................//

// using jquery Toggle method  of the accordion

$(document).ready(function(){
    var accordion=document.getElementsByClassName("accordionSymbol");
    for(var i=0;i<accordion.length;i++){
        $(accordion[i]).click(function(){
            $(this).siblings(".hiddenContent").toggle();
        })
    }

    // sort price low to high
    $("#ascending").click(function(){
        $("#mobile-structure").empty();
        let price_low_high=products;
        price_low_high.sort(function(a,b){
            return a.DiscountedPrice-b.DiscountedPrice;
        })
        jsondata_render(price_low_high);
    })

    // sort by ratings
    $("#sortbyRatings").click(function(){
        $("#mobile-structure").empty();
        var ratings_high_low=products;
        ratings_high_low.sort(function(a,b){
            return b.Rating-a.Rating;
        });
        jsondata_render(ratings_high_low);
    })

    //

})

// var accordion=document.getElementsByClassName("accordionSymbol");

// for(var i=0;i<accordion.length;i++){
//     accordion[i].addEventListener("click",function(){
//         var hiddenContent=this.nextElementSibling;
//         if(hiddenContent.style.display==="block"){
//             hiddenContent.style.display="none";
//         }else{
//             hiddenContent.style.display="block";
//         }
//     });
// }

//...............Rating is done dynamically..................//

function ratingGenrator(rating){
    var starrating='';
    for(var i=1;i<=5;i++){
        if(i<=rating){
            starrating+=`<span id="rating-star"><i class="fa-solid fa-star"></i></span>`
        }else{
            starrating+=`<span id="unrating-star"><i class="fa-solid fa-star"></i></span>`
        }
    }
    return starrating;
}

//...............sort the price from low-high....................//

// document.getElementById("ascending").addEventListener("click",function(){

//     document.getElementById("mobile-structure").innerHTML='';
//     var price_low_high=products;
//     price_low_high.sort(function(a,b){
//         return a.DiscountedPrice-b.DiscountedPrice;
//     });
//     jsondata_render(price_low_high);
// })

//................ Newest First the Mobile should be in an order.............//

document.getElementById("newerVersion").addEventListener("click",function(){
    
    document.getElementById("mobile-structure").innerHTML='';
    var new_version=products, output1=[];
    for (var i=0;i<new_version.length;i++){
        if(new_version[i].new){
            output1.unshift(new_version[i]);        
        }else{
            output1.push(new_version[i]);
        }
    }
    jsondata_render(output1);
})

//.............sort by ratings onlick the Ratings..............................//

// document.getElementById("sortbyRatings").addEventListener("click",function(){
//     document.getElementById("mobile-structure").innerHTML='';
//     var ratings_high_low=products;
//     ratings_high_low.sort(function(a,b){
//         return b.Rating-a.Rating;
//     });
//     jsondata_render(ratings_high_low);
// })


//..........Adding into wishlist and count the wishlist............................//

function wishList(){
    var testcase_wishlist=document.getElementsByClassName("fa-solid fa-heart");
    let count=localStorage.getItem('wish-count') || 0;
    for(var i=0;i<testcase_wishlist.length;i++){
        var wished=testcase_wishlist[i];
        
        wished.style.color="grey";
        wished.addEventListener("click",function(){
        
            if(this.style.color==='grey'){
                this.style.color='red';
                count++;
                localStorage.setItem("wish-count",count);
            }else{
                this.style.color='grey';
                count--;
                localStorage.setItem("wish-count",count);
            }
            document.getElementById("wishlistCount").innerHTML=count;
            document.getElementById("wishlistCount-mobile").innerHTML=count;
        })
        console.log("wish count",count);
    }
}
wishList();


//...........................Brand Selection of the mobiles................//

function brandFilter(){
    var res=document.getElementsByClassName("Brandname");

    let array1_brandFilter=[];
    let array2_brandFilter=[];
    for(let i=0;i<res.length;i++){
        
        res[i].addEventListener("click",function(){
            if(res[i].checked){
                array1_brandFilter.push(res[i].name);
            }else{
                array2_brandFilter.push(res[i].name);
            }
            
            for(var p=0;p<array1_brandFilter.length;p++){
                for(var q=0;q<array2_brandFilter.length;q++){
                    if(array1_brandFilter[p]===array2_brandFilter[q]){
                        array1_brandFilter.splice(p,1);
                    }
                }
            }
            array2_brandFilter=[];
            getCheckedData(array1_brandFilter);
            fitersAddedOnclick(array1_brandFilter);
            clearAll(array1_brandFilter);
        })
        
    }
    
    
}
function getCheckedData(arr){
    var output=[];
    for(let i=0;i<products.length;i++){
        for(let j=0;j<arr.length;j++){
            if(products[i].brand.toLowerCase() ===arr[j].toLowerCase()){
                output.push(products[i]);
            }
            if(products[i].RAM.toLowerCase()===arr[j].toLowerCase()){
                output.push(products[i]);
            }
            if(products[i].OS.toLowerCase()===arr[j].toLowerCase()){
                output.push(products[i]);
            }
        }
    }
    var count=output.length;
    if(count>=1){
        document.getElementById("showing-mobiles").innerHTML=`
        Showing 1-${count} results of mobiles
    `
    }
    if(output.length>0){
        document.getElementById("mobile-structure").innerHTML="";
        jsondata_render(output);
        document.getElementById("showing-mobiles").innerHTML=`
        Showing 1-${count} results of mobiles`
    }else{
        let c=products.length;
        document.getElementById("mobile-structure").innerHTML="";
        document.getElementById("showing-mobiles").innerHTML=`
        Showing 1-${c} results of mobiles`
        jsondata_render(products);
    }

}
brandFilter();

function fitersAddedOnclick(filterName){
    var output=[];
    document.getElementById("fliters-added").innerHTML="";
    for(let i=0;i<filterName.length;i++){
        output.push(filterName[i]);
        if(filterName[i]){
            document.getElementById("fliters-added").innerHTML+=`<button class='filter-adding'> &#10005 ${filterName[i]}</button>`;
            
        }

    }
    filterName=[];

}
//.................................ClearAll fuction button......................//
function clearAll(array1){
    
    document.getElementById("clear-all").addEventListener("click",function(){
        
        array1.length = 0
        var brands = document.getElementsByClassName("Brandname")
        for(let i=0; i<brands.length; ++i) {
            if(brands[i].checked){
                brands[i].checked=false;
            }
        }
        let count=products.length;
        document.getElementById("fliters-added").innerHTML=" ";
        document.getElementById("mobile-structure").innerHTML="";
        document.getElementById("showing-mobiles").innerHTML=`
        Showing 1-${count} results of mobiles`
        jsondata_render(products);
        
    })
}



//...................Add to cart..................................//

function addToCart(){
    let count=localStorage.getItem('cart-count') || 0;
    var cart=document.getElementsByClassName("added_cart");
    for(let i=0;i<cart.length;i++){
        cart[i].addEventListener("click",function(){
            count++;
            localStorage.setItem("cart-count",count);
            document.getElementById("cartCount").innerHTML=count;
            document.getElementById("cartCount-mobile").innerHTML=count;
        })
    }
}   
addToCart();

//............................jquery of the slider........................//

$(function(){
    $("#range-slider").slider({
        range:true,
        min:0,
        max:500,
        values:[100,200],
        slide:function(event,ui){
            document.getElementById("minAmt").innerHTML=`$${ui.values[0]}`;
            document.getElementById("maxAmt").innerHTML=`$${ui.values[1]}`;
        }
    });
});

//...................Price range items are shown..........................//

function rangeItems(){
    var res=document.getElementsByClassName("amt");
    for(let i=0;i<res.length;i++){
        res[i].addEventListener("DOMSubtreeModified",function(){
            var items=[];
            var min=Number(res[0].innerHTML.substr(1))
            var max=Number(res[1].innerHTML.substr(1))
            for(let j=0;j<products.length;j++){
                if(min<=products[j].DiscountedPrice && max>=products[j].DiscountedPrice){
                    items.push(products[j]);
                }
            }
            document.getElementById("mobile-structure").innerHTML=" ";
            jsondata_render(items);
        })
    }
}
rangeItems();


//......................search products in the seacrh icon....................//

function seacrhProducts(){
    var x=document.getElementById("searchBar");
    x.addEventListener("input",function(){
        var res=[];
        for(let i=0;i<products.length;i++){
            if(products[i].brand.toLowerCase()===x.value.toLowerCase()){
                res.push(products[i]);
            }
        }
        document.getElementById("mobile-structure").innerHTML=" ";
        if(res.length>0){
            jsondata_render(res);
        }else{
            jsondata_render(products);
        }
    })
}
seacrhProducts();

//..........................local storage update................................//

var local_wishlist_count=JSON.parse(localStorage.getItem('wish-count')) || 0;
var wishlist_Icon=document.getElementById("wishlistCount");
console.log(local_wishlist_count,wishlist_Icon);
wishlist_Icon.innerHTML=local_wishlist_count;

var local_cart_count=JSON.parse(localStorage.getItem('cart-count')) ||0;
var cart_Icon=document.getElementById("cartCount");
console.log(local_cart_count,cart_Icon);
cart_Icon.innerHTML=local_cart_count;
