import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LGeoJson, LTooltip, LControl } from "vue2-leaflet";
import { Icon } from "leaflet";

import Vue2MapboxGL from 'vue2mapbox-gl';
 
// You might want to import the relevant css, for example:
import 'mapbox-gl/dist/mapbox-gl.css';
// for the v-mapbox-geocoder
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
 
Vue.config.productionTip = false;

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);
Vue.component("l-geo-json", LGeoJson);
Vue.component("l-tooltip", LTooltip);
Vue.component("l-control", LControl);
// Use the plugin
Vue.use(Vue2MapboxGL);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
