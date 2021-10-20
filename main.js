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
                variantColor: "green"
            },
            {
                variantId: 2235,
                variantColor: "blue"
            }
        ],
        cart: 0 
    },
    methods: {
        addToCart: function() {
            this.cart += 1
        }
    }
})
