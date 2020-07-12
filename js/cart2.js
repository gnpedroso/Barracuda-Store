const CART = {
    KEY: 'barracudastore123',
    contents: [],
    init() {
        let _contents = localStorage.getItem(CART.KEY);
        if (_contents) {
            CART.contents = JSON.parse(_contents);
        } else {
            CART.contents = [];
            CART.sync();
        }
    },
    async sync() {
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    find(id) {
        let match = CART.contents.filter(item => {
            if (item.id == id)
                return true;
        });
        if (match && match[0])
            return match[0];
    },
    add(id) {
        if (CART.find(id)) {
            CART.increase(id, 1);
        } else {
            let arr = PRODUCTS.filter(product => {
                if (product.id == id) {
                    return true;
                }
            });
            if (arr && arr[0]) {
                let obj = {
                    id: arr[0].id,
                    title: arr[0].title,
                    type: arr[0].type,
                    qty: 1,
                    img: arr[0].img,
                    fixedPrice: arr[0].fixedPrice,
                    itemPrice: arr[0].price
                };
                CART.contents.push(obj);
                CART.sync();
            } else {
                console.error('Invalid Product');
            }
        }
    },
    increase(id, qty = 1) {
        CART.contents = CART.contents.map(item => {
            if (item.id === id)
                item.qty = item.qty + qty;
            return item;
        });
        CART.sync()
    },
    reduce(id, qty = 1) {
        CART.contents = CART.contents.map(item => {
            if (item.id === id)
                item.qty = item.qty - qty;
            return item;
        });
        CART.contents.forEach(async item => {
            if (item.id === id && item.qty === 0)
                CART.remove(id);
        });
        CART.sync()
    },
    changePrice(id, price) {
        CART.contents = CART.contents.map(item => {
            if (item.id === id) {
                item.itemPrice = price * item.qty
            }
            return item;
        });
        CART.sync()
    },
    remove(id) {
        CART.contents = CART.contents.filter(item => {
            if (item.id !== id)
                return true;
        });
        CART.sync()
    },
    empty() {
        CART.contents = [];
        CART.sync()
    },
    sort(field = 'title') {
        let sorted = CART.contents.sort((a, b) => {
            if (a[field] > b[field]) {
                return 1;
            } else if (a[field] < a[field]) {
                return -1;
            } else {
                return 0;
            }
        });
        return sorted;
    },
    logContents(prefix) {
        console.log(prefix, CART.contents)
    }
};

let PRODUCTS = [];
if (window.location.pathname == '/kayaks.html' || window.location.pathname == '/paddles.html' || window.location.pathname == '/lifejacket.html') {
    document.addEventListener('DOMContentLoaded', () => {
        getProducts(showProducts, errorMessage);
        CART.init();
        showCart();
    });
}

function showCart() {

    let cartSection = document.querySelector('.shoppingCart_content');

    cartSection.innerHTML = `<h4 class="mt-2 ml-2">Your cart list:</h4>`

    let s = CART.sort('qty');
    addCounterToCart(s)
    let content = s.forEach(item => {
        let cartitem = document.createElement('div');
        cartitem.className = 'productCart';

        let image = document.createElement('img');
        image.src = item.img
        image.classList.add('img')
        cartitem.appendChild(image)

        let title = document.createElement('p');
        title.textContent = item.title;
        title.className = 'title'
        cartitem.appendChild(title);

        let controls = document.createElement('div');
        controls.className = 'controls';
        cartitem.appendChild(controls);

        let plus = document.createElement('span');
        plus.classList.add('addQty')
        plus.textContent = '+';
        plus.setAttribute('data-id', item.id)
        plus.setAttribute('data-price', item.fixedPrice)
        controls.appendChild(plus);
        plus.addEventListener('click', incrementCart)

        let qty = document.createElement('span');
        qty.classList.add('qty')
        qty.textContent = item.qty;
        controls.appendChild(qty);

        let minus = document.createElement('span');
        minus.classList.add('removeQty')
        minus.textContent = '-';
        minus.setAttribute('data-id', item.id)
        minus.setAttribute('data-price', item.fixedPrice)
        controls.appendChild(minus);
        minus.addEventListener('click', decrementCart)

        let price = document.createElement('div');
        price.className = 'price';
        let cost = `€ ${item.itemPrice},00`;
        price.textContent = cost;
        cartitem.appendChild(price);

        let deleteProduct = document.createElement('small');
        deleteProduct.classList.add('deleteProduct');
        deleteProduct.innerHTML = "&times;";
        deleteProduct.setAttribute('data-id', item.id)
        cartitem.appendChild(deleteProduct);

        deleteProduct.addEventListener('click', deleteOnCart);

        cartSection.appendChild(cartitem);


    })

    let total = document.createElement('div');
    total.classList.add('mt-2', 'ml-2', 'totalCart', 'text-center');
    cartSection.appendChild(total);
    let productCart = document.querySelector('.productCart')
    if (productCart == null) {
        total.innerHTML = `<div class="emptyCart text-center">
        <p><i class="fas fa-shopping-cart"></i></p>
        <p>Your cart is empty</p>
      </div>`
    } else {
        total.innerHTML = `
        <h3>Total: €${totalAmount(s)},00</h3>
        <button class="btn btn-primary mb-3">Check the Cart</button>
        `
    }

}


function totalAmount(s) {
    let totalPrice = s.reduce(function (sum, items) {
        return sum + items.itemPrice
    }, 0)
    return totalPrice
}

function addCounterToCart(s) {
    let counter = document.querySelector('.badge');
    let newCounter = s.reduce(function (sum, items) {
        return sum + items.qty
    }, 0)
    counter.innerHTML = newCounter
}


function incrementCart(ev) {
    ev.preventDefault();
    let counter = document.querySelector('.badge');
    counter.innerHTML++;
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.increase(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let item = CART.find(id);

    if (item) {
        qty.textContent = item.qty;
    } else {
        document.querySelector('.shoppingCart_content').removeChild(controls.parentElement);
    }
    changeCartPrice(ev)
    changeTotalPrice()
}

function decrementCart(ev) {
    ev.preventDefault();
    let counter = document.querySelector('.badge');
    counter.innerHTML--
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.reduce(id, 1);
    let controls = ev.target.parentElement;
    let qty = controls.querySelector('span:nth-child(2)');
    let item = CART.find(id);
    if (item) {
        qty.textContent = item.qty;
    } else {
        document.querySelector('.shoppingCart_content').removeChild(controls.parentElement);
    }
    changeCartPrice(ev)
    changeTotalPrice()
}

function deleteOnCart(ev) {
    let cartSection = document.querySelector('.shoppingCart_content');
    let counter = document.querySelector('.badge');
    let totalCart = document.querySelector('.totalCart')
    if (cartSection.children.length == 3) {
        totalCart.innerHTML = `<div class="emptyCart text-center">
        <p><i class="fas fa-shopping-cart"></i></p>
        <p>Your cart is empty</p>
      </div>`
        counter.innerHTML = 0;
    }
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    CART.remove(id);
    let itemOnCart = ev.target.parentElement;
    document.querySelector('.shoppingCart_content').removeChild(itemOnCart);
    changeTotalPrice()
}

function changeCartPrice(ev) {
    ev.preventDefault();
    let id = parseInt(ev.target.getAttribute('data-id'));
    let price = parseInt(ev.target.getAttribute('data-price'));
    CART.changePrice(id, price)
    let cart = ev.target.parentElement.parentElement
    let newPrice = cart.querySelector('.price');
    const productPrice = parseFloat(newPrice.innerHTML.split('€')[1].replace(',', '.'))
    let controls = ev.target.parentElement;
    let qty = parseInt(controls.querySelector('span:nth-child(2)').innerHTML);

    newPrice.innerHTML = `€ ${price * qty},00`
}

function changeTotalPrice() {
    let totalCart = document.querySelector('.totalCart h3');
    let productCart = document.querySelectorAll('.productCart');
    let sum = [];
    for(product of productCart){
        let eachPrice = product.querySelector('.price');
        let totalAmount = Number(eachPrice.innerHTML.split('€')[1].replace(',', '.'));
        sum.push(totalAmount)
    }
    if (sum.length){
        return totalCart.innerHTML = `Total: €${sum.reduce((a,b)=> a+b)},00` 
    } else {
        return totalCart.parentElement.innerHTML = `<div class="emptyCart text-center">
        <p><i class="fas fa-shopping-cart"></i></p>
        <p>Your cart is empty</p>
      </div>`
    }

}

// -----------------------------------------------------------------------------
if (window.location.pathname == '/kayaks.html') {
    function getProducts(success, failure) {
        let URL = "kayaks.json"
        fetch(URL)
            .then(response => response.json())
            .then(success)
            .catch(failure);
    }
} else if (window.location.pathname == '/lifejacket.html') {
    function getProducts(success, failure) {
        let URL = "lifejackets.json"
        fetch(URL)
            .then(response => response.json())
            .then(success)
            .catch(failure);
    }
} else if (window.location.pathname == '/paddles.html') {
    function getProducts(success, failure) {

        let URL = "paddles.json"
        fetch(URL)
            .then(response => response.json())
            .then(success)
            .catch(failure);
    }
} else {
    null;
}
// -----------------------------------------------------------------------------

function showProducts(products) {
    PRODUCTS = products;
    let productSection = document.querySelector('.products-grid');
    productSection.innerHTML = "";
    products.forEach(product => {
        let card = document.createElement('div');
        if (product.type === 'recreationalKayak') {
            card.classList.add('items', 'recreational_product')
        } else if (product.type === 'fishingKayak') {
            card.classList.add('items', 'fishing_product')
        } else {
            card.classList.add('items');
        }

        card.setAttribute('data-price', product.fixedPrice)


        let title = document.createElement('h5');
        title.textContent = product.title;
        card.appendChild(title);

        let img = document.createElement('img');
        img.alt = product.title;
        img.src = product.img;
        card.appendChild(img);

        let price = document.createElement('h4');
        let cost = `€ ${product.price},00`
        price.textContent = cost;
        price.className = 'price';
        card.appendChild(price);

        let btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.textContent = 'Add to Cart';
        btn.setAttribute('data-id', product.id);
        btn.setAttribute('data-price', product.fixedPrice);
        btn.addEventListener('click', addItem);
        card.appendChild(btn);

        productSection.appendChild(card);
    })
}

function addItem(e) {
    e.preventDefault();
    let id = parseInt(e.target.getAttribute('data-id'));
    let price = parseInt(e.target.getAttribute('data-price'));
    console.log('add to cart item', id);
    CART.add(id, 1);
    CART.changePrice(id, price);
    showCart();
}

function errorMessage(err) {
    console.error(err);
}

const shoppingCartIcon = document.querySelector('.shoppingCart');
const shoppingCartContent = document.querySelector('.shoppingCart_content');
let _cartOpenend = false;
const closeCartBtn = document.querySelector('.closeCart')

shoppingCartIcon.addEventListener('click', openOrClose)
closeCartBtn.addEventListener('click', closeCart)

function openOrClose() {
    if (!_cartOpenend) {
        openCart()
        closeLogin()
    } else {
        closeCart()
    }
}

function openCart() {
    shoppingCartContent.style.display = "block";
    _cartOpenend = true
}

function closeCart() {
    shoppingCartContent.style.display = "none";
    _cartOpenend = false
}