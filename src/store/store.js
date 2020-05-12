import Vue from 'vue';
import Vuex from 'vuex';
import ShowService from '../services/shows.service';

Vue.use(Vuex)

const _ShowService = new ShowService();
let cart = window.localStorage.getItem('cart');
let cartCount = window.localStorage.getItem('cartCount');
export const store = new Vuex.Store({
    state: {
        faqs: null,
        cart: cart ? JSON.parse(cart) : [],
        cartCount: cartCount ? parseInt(cartCount) : 0
    },
    mutations: {
        SET_FAQS: (state, payload) => {
            state.faqs = payload;
        },
        addToCart(state, showItem) {
            let found = state.cart.find(e => e.id == showItem.id);

            if (found) {
                found.nQty++;
                found.nTotalPrice = found.nQty * found.nTicketPrice;
            } else {
                let cartObj = {
                    id: showItem.id,
                    sName: showItem.sName,
                    nTicketPrice: Number(showItem.nTicketPrice)
                }

                Vue.set(cartObj, 'nQty', 1);
                Vue.set(cartObj, 'nTotalPrice', Number(showItem.nTicketPrice));
                state.cart.push(cartObj);
            }
            state.cartCount++;
            this.commit('saveCart');
        },
        decrementQty(state, cartItem) {
            let found = state.cart.find(e => e.id == cartItem.id);

            if (found) {
                let changeQty = cartItem.nQty - 1;

                if (changeQty == 0) {
                    let index = state.cart.indexOf(found);
                    if (index > -1) {
                        let cartItemObj = state.cart[index];
                        state.cartCount -= cartItemObj.nQty;

                        state.cart.splice(index, 1);
                    }

                }
                else {
                    found.nQty--;
                    found.nTotalPrice = found.nQty * found.nTicketPrice;
                    state.cartCount--;
                }
            }
            this.commit('saveCart');
        },
        incrementQty(state, cartItem) {
            let found = state.cart.find(e => e.id == cartItem.id);

            if (found) {
                found.nQty++;
                found.nTotalPrice = found.nQty * found.nTicketPrice;

                state.cartCount++;
            }
            this.commit('saveCart');
        },
        removeFromCart(state, cartItem) {
            let foundItem = state.cart.find(e => e.id == cartItem.id);
            let index = state.cart.indexOf(foundItem);

            if (index > -1) {
                let cartItemObj = state.cart[index];
                state.cartCount -= cartItemObj.nQty;

                state.cart.splice(index, 1);
            }
            this.commit('saveCart');
        },
        saveCart(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart));
            window.localStorage.setItem('cartCount', state.cartCount);
        },
        clearCart(state) {
            state.cart = [];
            state.cartCount = 0;
            this.commit('saveCart');
        }
    },
    actions: {
        GET_FAQS(context, payload) {
            // return _ShowService.getFaqs().then(response => {
                context.commit('SET_FAQS', _ShowService.getFaqs());
                return this.state.faqs;
            // })
        }
    }
})