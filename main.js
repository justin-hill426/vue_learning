var eventsBus = new Vue()

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

            <button @click="addToCart" 
                    :disabled="!inStock"
                    :class="{disabledButton: !inStock}">Add to Cart</button>        
        </div>

        <product-tabs :reviews="reviews"></product-tabs>
    </div>

        `,
  data() {
      return {
        brand: "Vue Mastery",
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
        reviews: []
      }
    },
    methods: {
        addToCart() {
            this.$emit('custom', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index
        },
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
    },
    mounted() {
        eventsBus.$on('submitted', productReview => {
            this.reviews.push(productReview);
        })
    }

})
Vue.component('product-review', {
    template: 
    //html
    `
        <form class = "review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b> Please correct the following errors(s): </b>
            <ul>
                <li v-for="error in errors">
                    *{{ error }}*
                </li>
            </ul>
        <p>
            <label for="name"> Name: </label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>
            <input type="submit" value="Submit">
        </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventsBus.$emit('submitted', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
            }
            else {
                this.errors = []
                if(!this.name) this.errors.push("Name Required")
                if(!this.review) this.errors.push("Review Required")
                if(!this.rating) this.errors.push("Rating Requrired")
            }
        }
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true,
        }
    },
    template:  //html 
    `  
    <div>
        <span class="tab" :class="{ activeTab: selectedTab === tab }" v-for="(tab, index) in tabs" :key="index" @click="selectedTab = tab">
            {{ tab +  " " }} 
        </span>

        <div v-show="selectedTab === 'Reviews'">
            <h2> Reviews </h2>
            <p v-if="!reviews.length"> There are no reviews yet. </p>
            <ul>
                <li v-for="review in reviews">
                    <p> Name: {{ review.name }} </p>
                    <p> Rating: {{ review.rating }} </p>
                    <p> Review: {{ review.review }} </p>
                </li>
            </ul>
        </div>
        <product-review v-show="selectedTab === 'Make a Review'"></product-review>

    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})


var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        updateCart(itemId) {
            this.cart.push(itemId);
        }
    }
})
