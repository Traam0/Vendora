import { defineStore } from 'pinia'

export const useCartStore = defineStore({
    id: 'Cart',
    state: () => ({
        products: [],
        quantity: 0,
        total: 0
    }),
    getters: {
        // doubleCount: (state) => state.quantity * 2
    },
    actions: {
        addProduct(state) {
            this.quantity++
            this.products.push(state.product)
            this.total += state.product.price * state.product.quantity
        }
    }
})