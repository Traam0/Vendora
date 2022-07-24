<script>
    import {RouterLink} from 'vue-router';

    export default{
        name: 'productCard',
        props: ['product'],
        data(){
            return{
                visible : 0,
            }
        }, 

        methods:{
            switchPic(i){
                this.visible = i
            },

            scrollToTop(){
                window.scrollTo(0,0)
            }
        },

        created(){
            this.link = '/product/'+ this.product._id
        }
    }
</script>



<template>

    <div class="productCard-container">
        <div class="product-image">
            <img :src="product.image[visible]" :alt="product.title">
        </div>
        <div class="title">
            {{product.title}}
        </div>
        <div class="price">
            ${{product.price}} 
        </div>
        <div class="colors">
            <div v-for="(color, index) in product.color" 
                :key="index" 
                v-bind:style="{background: color}"
                v-on:click="switchPic(index)">
            </div>
        </div>
        <div class="details">
            <router-link :to="this.link" @click.native="scrollToTop">See details</router-link>
        </div>
    </div>
</template>



<style scoped lang="scss">

    .productCard-container{
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        overflow: hidden;
        border-radius: 8px;
        // padding: .3rem .6rem
        

        .product-image{
            aspect-ratio: 1;
            width: 300px ;
            img{
                width: 100%;
                height: 100%;
                max-width: 300px;
                max-height: 300px;
                object-fit: cover;
            }
        }

        .title{
            font-size: 1.2rem;
            font-weight: 500;
        }

        .price{
            font-weight: 700;
            color: black;
        }

        .colors{
            // widows: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            div{
                border: .5px solid black;
                width: 2rem;
                aspect-ratio: 1;
                margin: 1rem .5rem;
                color: white;
                border-radius: 50%;
                cursor: pointer;
            }
        }

        .details{
            background: rgb(66,211,146);
            padding: .5rem 0;
            font-size: 1.1rem;
            position: relative;
            cursor: pointer;

            &:hover{
                a{
                    color: #213547;
                    font-weight: 500;
                }
            }

            &::before{
                content: '';
                position: absolute;
                inset: 0 0 0 0;
                // background: linear-gradient(90deg, rgba(66,211,146,1) 17%, rgba(80,177,191,1) 66%, rgba(94,143,235,1) 100%);
                // background: linear-gradient(90deg, rgba(114,238,183,1) 0%, rgba(27,197,121,1) 60%, rgba(11,149,87,1) 100%);
                background: linear-gradient(90deg, rgba(114,238,183,1) 0%, rgba(114,238,183,1) 55%, rgba(255,255,255,0.2) 100%);
                transform: scaleX(0);
                transform-origin: left;
                z-index: 0;
            }

            &:hover::before{
                transform: scaleX(1);
                transition: 400ms transform ease-in-out;
            }

            a{
                font-size: 1.2rem;
                font-weight: 400;
            }
        }

    }

</style>