// Initialize Firebase
var config = {
    apiKey: "AIzaSyCh6d4TODGDeN29J8kJdicsdJPIEvEwM-w",
    authDomain: "dbecommdataproject.firebaseapp.com",
    databaseURL: "https://dbecommdataproject.firebaseio.com",
    projectId: "dbecommdataproject",
    storageBucket: "dbecommdataproject.appspot.com",
    messagingSenderId: "570284667761",
    appId: "1:570284667761:web:eb09bff78f3c5f52a93cd0"
};

// Initialize your Firebase app
firebase.initializeApp(config); 
var database = firebase.firestore();
console.log(document.getElementsByClassName("product-price")[0].innerHTML);
var total;

var products = [{
    name: "cupcake",
    quantity: 0
}, {
    name: "coffee",
    quantity: 0
}, {
    name: "chocolate",
    quantity: 0
}, {
    name: "waffle",
    quantity: 0
}, {
    name: "donuts",
    quantity: 0
}, {
    name: "sorbet",
    quantity: 0
}, {
    name: "croissant",
    quantity: 0
}, {
    name: "macaron",
    quantity: 0
}];

$('.plus').click(function() {
    var product = $(this).closest('.product');
    var q = product.data('quantity') + 1;
    var name = product.data('name');
    product.data('quantity', q);
    updateProduct(product);

});

$('.minus').click(function() {
    var product = $(this).closest('.product');
    var q = Math.max(0, product.data('quantity') - 1);
    var name = product.data('name');
    product.data('quantity', q);
    updateProduct(product);
});

$('.del').click(function() {
    var product = $(this).closest('.product');
    var q = 0;
    var name = product.data('name');
    product.data('quantity', q);
    updateProduct(product);
});

function updateProduct(product) {
    var quantity = product.data('quantity');
    var name = product.data('name');
    var price = product.data('price');
    $('.product-quantity', product).text('x' + quantity);
    $('.product-price', product).text('$ ' + (price * quantity).toFixed(2));
    updateBill();
}

function updateBill() {
    var subtotal = 0;
    var shipping = 5;
    total = 0;

    $('.product').each(function() {
        subtotal += $(this).data('quantity') * $(this).data('price');
        if ($(this).data('quantity') != '0') {
            changeDesc($(this).data('name'), $(this).data('quantity'));
        }

    });

    total = subtotal + shipping;
    $('.subtotal .value').text('$ ' + subtotal.toFixed(2));
    $('.total .value').text('$ ' + total.toFixed(2));

}

function changeDesc(value, desc) {
    for (var i in products) {
        if (products[i].name == value) {
            products[i].quantity = desc;
            break; //Stop this loop, we found it!
        }
    }
}

function sendPurchaseDb() {
  
  if (total < 250) {

    database.collection("orders").add({products});

    $('.product').each(function(i, obj) {
        var product = $(this);
        var q = 0;
        var name = product.data('name');
        product.data('quantity', q);
        updateProduct(product);
    });
    
   alert("Order sent");
    reset();
  }else if(total > 250){
    alert("You are over budget, you can only spend up to $250, remove some items.");
  }else {
    alert("You need to purchase atleast one product");
  }

    

}

function reset(){
  var size = document.getElementsByClassName("product-price").length;
  
  for(i=0;i<size;i++){
    document.getElementsByClassName("product-price")[i].innerHTML = "$" +document.getElementsByClassName("product")[i].dataset.price;
    console.log(document.getElementsByClassName("product-price")[i].innerHTML);
  }

}
