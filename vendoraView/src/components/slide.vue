<script>
    export default{
        name: 'slide',
        props: ['item', 'index', 'visible']
    }
</script>



<template>
    <img :src="item" :index="index" v-if="visible == index" alt="A Banner Image">
</template>


<style scoped lang="scss">
    .wrapper{
        img{
            height: 100%;
            width: 100%;
            // object-fit: contain;
        }
    }
</style>
