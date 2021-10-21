var app = new Vue({
    el: '#app',
    data: {
        user_cart: 0,
        product: 'Socks',
        description: 'This is a description for the item',
        image: 'assets/images/socks_blue.jpg',
        inventory: 26,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: 'assets/images/socks_green.jpg'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: 'assets/images/socks_blue.jpg'
            }
        ],
        cart: 0 
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
    }
})
