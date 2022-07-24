<script>
    import {RouterLink} from 'vue-router';
    import CartIcon from './icons/cart.svg'
    import { useCartStore } from '../stores/cart';
    // import { useCounterStore } from '../stores/counter';
    
    export default{
        props: ['adv'],
        components: {CartIcon},
        data(){
            return{
                cart: useCartStore(),
            }
        },

        methods:{
            save(){
                localStorage.setItem('cart', JSON.stringify(this.cart))
            },

            scrollToTop(){
                window.scrollTo(0,0)
            }
        },


    }
</script>


<template>

    <header>
        <div class="Ann">
            {{adv}}
        </div>
        <nav>
            <div class="brand">
                VENDORA
            </div>
            <div class="navigation">
                <router-link to="/Home" @click.native="scrollToTop">Home</router-link>
                <router-link to="/Products" @click.native="scrollToTop">Products</router-link>
                <router-link to="/About" @click.native="scrollToTop">About us</router-link>
            </div>

            <div class="account">
                <div class="login" >Login</div>
                <div class="register">Register</div>
                <div class="cart"  @click="save">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                    </svg>
                    <span>{{cart.quantity}}</span>
                </div>
            </div>
        </nav>
    </header>

</template> 




<style scoped lang="scss">
    header{
        height: fit-content;
        width: 100vw;

        nav{
            display: flex;
            flex-direction: row;
            align-items: center;
            max-height: 4rem;
            min-height: 4rem;
            .brand{
                flex: 1;
                text-align: center;
                font-size: 2rem;
                font-weight: 600;
            }

            .navigation{
                flex: 1;
                text-align: center;
                display: flex;
                flex-direction: row;
                gap: 2rem;
                justify-content: center;
                align-items: center;

                a{
                    padding: .4rem 1.4rem;
                    position: relative;
                    cursor: pointer;
                    font-size: 1.1rem ;

                    &::before{
                        content: '';
                        position: absolute;
                        border-bottom: 1.5px solid black;
                        inset: 0 0 0 0;
                        transform: scaleX(0);
                        transform-origin: center;
                    }

                    &:hover::before{
                        transform: scaleX(1);
                        transition: all  250ms ease-in-out;
                    }
                }

                ul{
                    transform: translateY(50%);
                }
            }

            .account{
                flex: 1;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                padding: .3rem;
                font-weight: 500;
            
                .login{
                    border: 2px solid white;
                    border-radius: 8px;
                    padding: .4rem 1.4rem;
                    cursor: pointer;
                    position: relative;
                    width: 100px;
                    text-align: center;
                    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                    background-color: #36b47b;
                    color: white;
                    font-weight: 600;
                    letter-spacing: .75px;

                    &::before{
                        content: '';
                        position: absolute;
                        inset: 0 0 0 0;
                        border-radius: 7px;
                        z-index: -1;
                    }

                    &:hover{
                        transform: scale(1.1);
                    }
                }

                .register{
                    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                    border: 2px solid #3299dd;
                    border-radius: 8px;
                    padding: .4rem 1.4rem;
                    cursor: pointer;
                    position: relative;
                    min-width: 100px;
                    text-align: center;
                    font-weight: 600;
                    letter-spacing: .75px;

                    &:hover{
                        background-color: #3299dd;
                        transform: scale(1.1);
                    }
                }

                .cart{
                    position: relative;
                    height: fit-content;
                    user-select: none;
                    cursor: pointer;
                    
                    svg{
                        cursor: pointer;
                    }

                    span{
                        display: block;
                        width: 100%;
                        font-size: 1.1rem;
                        position: absolute;
                        top: -40%;
                        left: 100%;
                        color: #3299dd
                    }
                }
            }
        }

        .Ann{
            width: 100%;
            background-color: #90d68a;
            text-align: center;
            padding: .15rem;
            cursor: default;
            min-height: 3rem;
            max-height: 3rem;
            z-index: -1;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>