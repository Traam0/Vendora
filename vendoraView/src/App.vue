<script setup>
  import { RouterView } from 'vue-router'
  import NavBar from './components/navBar.vue'
  import FooterBar from './components/footerBar.vue';
  const adv = "Exclusive Summer Deals 😎 | SOON 50% OFF";
  // const scrollToTop = ()=>{
  //   window.scrollTo(0,0)
  // }
</script>

<template>
  <NavBar :adv=adv />
  <main>
<!--<RouterView v-slot="{Component}">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView> -->
    <RouterView /> 
  </main>

  <FooterBar />

</template>

<style>
  @import '@/assets/base.css';

  .fade-enter-from,
  .fade-leave-to{
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active{
    transition: opacity 500ms ease-out;
  }

</style>
