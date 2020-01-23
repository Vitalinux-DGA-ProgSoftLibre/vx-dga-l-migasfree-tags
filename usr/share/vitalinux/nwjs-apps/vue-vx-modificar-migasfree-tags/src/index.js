Vue.use(Vuex);
Vue.use(VueRouter);

// Para poder usar desde cualquier componente Bootstrap-vue
Vue.use('bootstrap-vue')
// Para poder usar desde cualquier componente Vue-form-wizard
Vue.use('vue-form-wizard')

// Para usar vue-sweetalert2
//Vue.use('vue-sweet-alert2');

// Compomentes de Vue2-Leaflet
Vue.component('l-map', window.Vue2Leaflet.LMap)
Vue.component('l-popup', window.Vue2Leaflet.LPopup)
Vue.component('l-tile-layer', window.Vue2Leaflet.LTileLayer);
Vue.component('l-marker', window.Vue2Leaflet.LMarker);
Vue.component('l-tooltip', window.Vue2Leaflet.LTooltip)
Vue.component('l-polygon', window.Vue2Leaflet.LPolygon)

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  template: '<App />',
  components: {
    App: httpVueLoader('src/app.vue')
  },
  store: store,
  router: router
});
