export function getCart() {           //cart ek gnn funtion ekk hdno
	let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);
	if (cart == null) {
		cart = [];
		localStorage.setItem("cart", JSON.stringify(cart));   //cart ek save krgnno
	}
	return cart;
}

export function removeFromCart(productId) {
    let cart = getCart();

    const newCart = cart.filter(            
        (item)=>{
            return item.productId != productId;
        }
    )

    localStorage.setItem("cart", JSON.stringify(newCart));           // thiyen cart ekk nthuw aluth cart ekk awoth save krno
     
}

export function addToCart(product, qty) {              //cart ekkt product ekk add krnn one nm awshy product eki qty eki dno
	let cart = getCart();

	let index = cart.findIndex((item) => {                   // mekn wenne api ewn productId ekt smn productId ekk thiyed blno.ehm bln kot samn productId ekk thibunoth e product ek thiyenne ankay index ekt dno(ex= ek thibune 3 weni the nm index ekt 3 pewreno).ehm productId ekk nththn index ek -1 weno.
		return item.productId == product.productId;
	});

    if(index == -1){               // product ekk dentmth nethtn
        cart[cart.length] = {
            productId : product.productId,
            name : product.name,
            image : product.images[0],
            price : product.price,
            labelledPrice : product.labelledPrice,
            qty : qty
        }
    }else{
        const newQty = cart[index].qty + qty;             //idex ek hri then thibil awoth eke thiyen qty eki api den qty eki ekthu krno
        if(newQty<=0){
            removeFromCart(product.productId);
            return;
        }else{
            cart[index].qty = newQty;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cart));          // aphu seryk save krno carte ek
}


