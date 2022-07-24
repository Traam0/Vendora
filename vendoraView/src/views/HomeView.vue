<script setup>
    import { useCartStore } from '../stores/cart';
    import Carousel from '../components/carousel.vue';
    import { useProductsStore } from '../stores/products';
    import { onMounted } from 'vue';
    import ProductCard from '../components/productCard.vue';
    import Banner from '../components/Banner.vue';
    const cart = useCartStore();
    const products = useProductsStore();
    
    const test = (item)=>{
        const tmpPr = {};
        tmpPr['id'] = item._id
        tmpPr['qtn'] = 5
        tmpPr['price'] = item.price
        tmpPr['size'] = item.size
        tmpPr['color'] = item.color

        alert(JSON.stringify(tmpPr))
    }

    onMounted(()=>{
        products.get()
    })

</script>

<template>
    <Carousel />
    <!-- <component :is="Carousel" /> -->


    <div class="hero-title">
        <h1>OUR LATEST PRODUCTS</h1>
    </div>

    <div class="wrapper">
        <ProductCard v-for="(item, index) in products.half1" :key="index" :product="item" />
    </div>

    <Banner 
        image="https://cdn.shopify.com/s/files/1/2404/6643/files/clp-forest.jpg?v=1576265236"
        title="Big Change Starts Small"
        text="Vendora's mission is to bring you and nature closer together. We believe in the power of small acts, so by empowering everyone and anyone with easy access to sustainable solutions, those tiny seeds of change, can grow to change the world. #ittakesaforest."
    />

    <div class="wrapper">
        <ProductCard v-for="(item, index) in products.half2" :key="index" :product="item" />
    </div>

    <div class="newsLetter">
        <div class="header"><h1>DON't FALL BEHIND</h1></div>
        <p>Get updates and special offers from <span>VENDORA</span></p>
        <form action="" v-on:submit.prevent="">
            <label for="newsEmail">Email adress: </label>
            <input type="text" name="newsEmail" placeholder="example123@exaple.com">
            <img src="../components/icons/arrow.png" alt="">
        </form>
    </div>

    <Teleport to="body">
        <div class="scroll">
            <!-- <router-link to="/about">UP</router-link> -->
            <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                </svg>
            </a>
        </div>
    </Teleport>

</template>


<style scoped lang="scss">
    .hero-title{
        width: 100vw;
        padding: 1.4rem 0;
        // margin-block: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        background-color: rgba($color: #000000, $alpha: 0.05);
    }


    .wrapper{
        display: flex;
        justify-content: center;
        width: 100vw;
        align-items: center;
        gap: 4rem;
        text-align: center;
        margin: 5rem 0rem;
        box-sizing: border-box;
        flex-wrap: wrap;
    }

    .newsLetter{
        width: 100vw;
        box-sizing: border-box;
        height: 25rem;
        background-color: #90d68a;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        position: relative;
        text-align: center;

        .header{
            color: white;
            text-transform: uppercase;
            font-weight: 500;
            font-size: 2rem;
        }

        p{
            text-transform: capitalize;
            font-weight: 400;
            color: black;
            font-size: 1.2rem;

            span{
                font-weight: 500;
            }
        }

        form{
            position: relative;

            input[type='text']{
                padding: .6rem 1.4rem;
                // border-radius: 8px;
                outline: none;
                border: 1px solid black;
                width: 300px;
            }

            label{
                display: block;
                margin-left: .5rem;
                font-size: 1.1rem;
                color: black;
                position: absolute;
                top: -1.5rem;
                display: none;
            }
        }

        img{
            position: absolute;
            bottom: 0;
            left: -10rem;
            transform: scale(1.5);
        }
    }

    .scroll{
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .2);
        width: 40px;
        aspect-ratio: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
    }
</style>