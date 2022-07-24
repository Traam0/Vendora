import { defineStore } from 'pinia'

export const useUsersStore = defineStore({
  id: 'user',
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,

  },
  actions: {
    addToCart(state){
      
    }
  }
})
