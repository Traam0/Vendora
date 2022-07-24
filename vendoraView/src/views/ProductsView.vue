<script>
    import { useProductsStore } from '../stores/products'
    import ProductCard from '../components/productCard.vue'

    export default{
        name: 'Products',
        components: { ProductCard },
        data(){
            return{
                products : useProductsStore()
            }
        },

        beforeMount(){
            this.products.fetch()
        }
    }

</script>



<template>
    <div class="loader-container" v-if="products.products.length <= 0">
        <div class="loader"></div>
    </div>

    <div class="containeR" v-if="products.products.length >= 0">
        <!-- <aside>hey</aside> -->
        <section>
            <ProductCard v-for="(item, index) in products.products" :key="index" :product="item" /> 
        </section>
    </div>


</template> 


<style scoped lang="scss">

    .containeR{
        min-height: calc(100vh - 7rem);
        display: flex;


        // aside{
        //     max-width: 25vw;
        //     min-width: 25vw;
        //     max-height: calc(100vh - 7rem);
        //     position: sticky;
        //     top: 0;
        //     background-color: antiquewhite;
        // }

        section{
            max-width: 100vw;
            min-width: 100vw;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 3rem;
            text-align: center;
            margin: 2rem 0;
        }


        
    }
</style>