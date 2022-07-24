<script>

    export default{
        name: 'Banner',
        props: ['image', 'title', 'text']
    }

</script>


<template>

    <div class="wrapper1">
        <div class="banner-image">
            <img :src="image">
        </div>

        <div class="info">
            <div class="title">
                <h1>{{title}}</h1>
            </div>
            <div class="paragraph">
                {{text}}
            </div>
        </div>
    </div>

</template>




<style scoped lang="scss">

    .wrapper1{
        width: 100vw;
        height: fit-content;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .4rem 0;
        margin: 1rem 0;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        background-color: rgba(0, 0, 0, 0.03);
        flex-wrap: nowrap;
        text-align: center;

        .banner-image{
            margin-inline: 1rem;
            width: fit-content;
            height: fit-content;

            img{
                height: 566px;
                aspect-ratio: 800 / 566;
                border-radius: 3px;
                object-fit: fill;
            }
        }

        .info{
            margin-inline: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            gap: 3rem;

            .title{
                font-size: 1.5rem;
                color: black;
                font-weight: 700;
            }

            .paragraph{
                font-weight: 500;
                font-size: 1.4rem;
            }
        }

    }




    @media screen and  (max-width: 1400px) {
        .wrapper1{
            flex-wrap: wrap;
            justify-content: center;
            text-align: center;
        }
    }

</style>