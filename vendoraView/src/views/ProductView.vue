<script>
    import { useCartStore } from '../stores/cart'
    export default{
        name: 'Product',
        data(){
            return{
                cart: useCartStore(),
                product: Object,
                color: '',
                size: '',
                qtn: 1,
                visibleImg: 0,
                errorMsg : '',
                loading: true
            }
        },

        methods: {
            incQtn(){
                this.qtn ++
            },

            decQtn(){
                this.qtn > 1 ? this.qtn-- : this.qtn = 1
            },

            setColor(state){
                this.color = state.color

                for(let ref of this.$refs.colors){
                    ref.classList.remove('selected')
                    this.$refs.colors[state.index].classList.add('selected')
                }
            },

            setSize(state){
                this.size = state.size

                for(let ref of this.$refs.sizes){
                    ref.classList.remove('selected')
                    this.$refs.sizes[state.index].classList.add('selected')
                }
            },

            addToCart(){
                const {__v, categories, createdAt, updatedAt, description, ...prdt} = this.product;

                if(this.size !== '' && this.color !== ''){
                    
                }else{
                    this.errorMsg = 'Must Select a Valid size and Color first! .'
                    return
                }

                prdt.size = this.size
                prdt.color = this.color
                prdt.image = this.product.image[this.visibleImg]
                prdt['quantity'] = this.qtn
                console.log(prdt)

                this.cart.addProduct({product: prdt})
            },
        },

        created(){
            this.productid = this.$route.params.id
            console.log(Object.keys(this.product).length)
        },

        beforeMount(){
            fetch('http://localhost:5000/vendora/api/products/fetch/'+this.productid)
                .then(res => res.json())
                .then(response => this.product = response)
                .then(res => this.visibleImg =  Math.floor(Math.random()*res.image.length))
                .then(res=>{this.loading = false})
        },

        mounted(){
            console.log(Object.keys(this.product).length )
        }
    }

</script>




<template>
    <div class="loader-container" v-if="loading">
        <div class="loader"></div>
    </div>

    <div class="productContainer" v-if="!loading">

        <div class="left">
            
            <div class="image-container">
                <img v-bind:src="product.image[visibleImg]" alt="">
            </div>
            <div class="product-stamp">
                <h4>Added At: {{product.createdAt}}</h4>
            </div>
        </div>

        <div class="right">
            <div class="product-title">
                <h1>{{product.title}}.</h1>
            </div>

            <div class="product-price">
                <h3>${{product.price}} USD</h3>
            </div>

            <div class="product-sizes">
                <div class="size" v-for="(size, index) in product.size" :key="index"
                    v-on:click="setSize({size: size, index: index})"
                    ref="sizes">
                    {{size}}
                </div>
            </div>

            <div class="product-colors">
                <div class='color' v-for="(color, index) in product.color" :key="index" 
                    v-bind:style="{background: color}"
                    v-on:click="setColor({index: index, color: color})"
                    ref="colors">
                </div>
            </div>

            <div class="product-quantity">
                <div class="rmv" v-on:click="decQtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                </div>
                <div class="qtn">
                    <h2>{{qtn}}</h2>
                </div>
                <div class="add" v-on:click="incQtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                </div>
            </div>

            <div class="product-actions">
                <div class="buyNow">
                    BUY NOW
                </div>
                <div class="addCart" v-on:click="addToCart">
                    ADD TO CART
                </div>
            </div>

            <div class="product-desc">
                <p>{{product.description}}</p>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <div class="errorBoxContainer" v-if="errorMsg !== ''">
            <div class="error-box">
                <div class="close" @click="this.errorMsg = ''">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
                <div>
                    {{errorMsg}}
                </div>
            </div>
        </div>
    </Teleport>

</template>


<style scoped lang="scss">

    .errorBoxContainer{
        width: fit-content;
        max-width: 200px;
        min-height: 75px;
        height: fit-content;
        position: fixed;
        bottom: 1.2rem;
        right: 1.2rem;
        color: red;
        background-color: #f8d7db;
        border-radius: 5px;
        border: 2px solid #f6c9cf;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .2rem .3rem;
        box-sizing: border-box;
        letter-spacing: .75px;
        font-weight: 500;
        animation: popup 200ms linear 1 ;

        .error-box{
            position: relative;
            width: 100%;
            height: 100%;
            box-sizing: border-box;

            .close{
                position: absolute;
                top: -.8rem;
                right: -.2rem;
                cursor: pointer;
            }
        }

        @keyframes popup {
            0%{
                transform: scale(0);
            }

            100%{
                transform: scale(1);
            }
        }
    }

    .productContainer{
        width: 100vw;
        min-height: calc(100vh - 7rem);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .left{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 45%;
            height: fit-content;
            padding: 1rem 0;
            box-sizing: border-box;
            gap: 2rem;


            .image-container{
                box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
                border: .5px solid rgb(128, 128, 128, 0.2);
                width: fit-content;
                height: fit-content;
                border-radius: 5px;
                overflow: hidden;
                height: 400px;
                width: 400px;

                img{
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                    user-select: none;
                }
            }
        }

        .right{
            width: 55%;
            height: fit-content;
            // background-color: blue;

            .product-sizes{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 2rem;
                margin-block: 1rem;

                .size{
                    width: 75px;
                    aspect-ratio: 2 / 1;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    border-radius: 5px;
                    user-select: none;
                    cursor: pointer;
                }

                .selected{
                    border: 2px solid #90d68a;
                    transform: scale(1.2);
                }

            }

            .product-colors{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 2rem;
                margin-block: 1rem;

                .color{
                    width: 75px;
                    aspect-ratio: 2 / 1;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                    box-shadow: rgba(255, 255, 255, 0.2) 0px 2px 8px 0px;
                    border: 2px solid rgb(255, 255, 255);
                    border-radius: 5px;
                    user-select: none;
                    cursor: pointer;
                }

                .selected{
                    transform: scale(1.2);
                    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                }
            }

            .product-quantity{
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                width: 25%;
                margin-block: 1rem;

                .add,
                .rmv{
                    user-select: none;
                    cursor: pointer;
                    width: 30px;
                    aspect-ratio: 1 / 1;
                    display: grid;
                    place-items: center;
                    border-radius: 50%;
                    border: 1px solid rgba(0, 0, 0, 0.1)
                }
            }

            .product-actions{
                display: flex;
                gap: 4rem;

                >div{
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 130px;
                    aspect-ratio: 3 / 1;
                    padding: .4rem .5rem;
                    border: 1px solid rgba(0, 0, 0, .2);
                    border-radius: 5px;
                    cursor: pointer;
                    user-select: none;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                }
            }

            .product-desc{
                font-weight: 500;
                color: black;
                letter-spacing: 1px;
                padding-block: 1rem;
                width: 80%;

                h3{
                    font-size: 1.6rem;
                    font-weight: 400;
                }

                p{
                    text-align: start;
                    margin: auto;
                    letter-spacing: 2px;
                }
            }
        }
    }


    @media screen and(max-width: 1000px){
        .productContainer{
            flex-direction: column;
        }
    }

</style>