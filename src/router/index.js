import Router from 'vue-router'

// Containers
const DefaultContainer = () =>
    import ('@/containers/DefaultContainer')

// Views
const Shows = () =>
    import ('@/views/Shows/Shows')
const FAQ = () =>
    import ('@/views/FAQ/FAQ')
const FoodMenu = () =>
    import ('@/views/FoodMenu/FoodMenu')
const Merch = () =>
    import ('@/views/Merch/Merch')
const Login = () =>
    import ('@/admin/Login/Login')
const ShowDetails = () =>
    import ('@/views/Shows/ShowDetails')
const ShowCreate = () =>
    import ('@/views/Shows/ShowCreate')
const MusicianFavoriteList = () =>
    import ('@/views/MusicianFavoriteList/MusicianFavoriteList')
const Home = () =>
    import ('@/views/Home/Home')
const Interview = () =>
    import('@/views/Interview/Interview')
const Cart = () =>
    import('@/views/Cart/Cart')

function configRoutes() {

    return [{
        path: '/',
        redirect: '/shows',
        name: 'Home',
        component: DefaultContainer,
        children: [{
                path: '/login',
                name: 'login',
                component: Login,
            },
            {
                path: '/show/create',
                name: 'createshow',
                component: ShowCreate,
            }, {
                path: 'shows',
                name: 'Shows',
                component: Shows
            },
            {
                path: 'faq',
                name: 'FAQ',
                component: FAQ
            },
            {
                path: 'foodMenu',
                name: 'FoodMenu',
                component: FoodMenu
            },
            {
                path: 'merch',
                name: 'Merch',
                component: Merch
            },
            {
                path: 'details/:id',
                name: 'ShowDetails',
                component: ShowDetails
            },
            {
                path: 'favorites',
                name: 'MusicianFavoriteList',
                component: MusicianFavoriteList
            },
            {
                path: 'home',
                name: 'HomePage',
                component: Home
            },
            {
                path: 'interview',
                name: 'Interview',
                component: Interview
            },
            {
                path: 'cart',
                name: 'Cart',
                component: Cart
            }
        ]
    }, ]
}

export default new Router({
    mode: 'hash', // https://router.vuejs.org/api/#mode
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})