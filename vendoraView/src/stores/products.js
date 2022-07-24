import { defineStore } from 'pinia'

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        products: []
    }),
    getters: {
        half1: (state) => state.products.slice(0, Math.ceil(state.products.length /2)),
        half2: (state) => state.products.slice(Math.ceil(state.products.length /2), state.products.length )

    },
    actions: {
        get() {
            fetch('http://localhost:5000/vendora/api/products/fetch?latest=true')
                .then(response => response.json())
                    .then(response => this.products = response)
                .catch(err => console.error(err));
        },
        fetch() {
            fetch('http://localhost:5000/vendora/api/products/fetch?latest=false')
                .then(response => response.json())
                    .then(response => this.products = response)
                .catch(err => console.error(err));
        },
    }
})
