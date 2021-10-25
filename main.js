Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    //html
     `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image">
            </div>
            <div class="product-info">
            <h1>{{ product }}</h1>
            <h3>{{ description }}</h3>
            <p v-if="inStock">In Stock</p>
            <p v-else :class="{strikeThrough: !inStock}">Out of Stock</p>
            <p> Shipping is: {{ shipping }} </p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-circle"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)">
            </div>

            <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{disabledButton: !inStock}">Add to Cart</button>
        </div>
    </div>`,
  data() {
      return {
        brand: "Vue Mastery",
        user_cart: 0,
        product: 'Socks',
        description: 'This is a description for the item',
        selectedVariant: 0,
        inventory: 26,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: 'assets/images/socks_green.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: 'assets/images/socks_blue.jpg',
                variantQuantity: 0
            }
        ],
        cart: 0 
      }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            if(this.premium) {
                return "Free";
            }
            else {
                return "$2.99"
            }
        }
    }

})
var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: 0,
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
            console.log(id);
        }
    }
})
