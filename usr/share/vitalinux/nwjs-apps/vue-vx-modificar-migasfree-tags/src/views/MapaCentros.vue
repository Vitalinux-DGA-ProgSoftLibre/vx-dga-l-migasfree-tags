<template>
  <div class="row justify-content-center">
    <div class="text-center col-12">
      <h2 class="my-2 font-titulo text-info">Centros Vitalinux en la Comunidad de Aragón</h2>
    </div>
    <div class="text-center col-12" style="height: 400px">
      <!-- <template v-show="mostrarMapa"> -->
      <!-- Info componentes Vue2Leaflet y su uso: https://korigan.github.io/Vue2Leaflet/#/components/ -->
      <l-map :zoom="7" :center="startLocation" style="height: 100%; width: 100%" @ready="Aviso">
        <l-tile-layer :url="url"></l-tile-layer>
        <!-- Formato lat-lng: https://leafletjs.com/reference-1.4.0.html#latlng -->
        <l-marker v-for="(marca,index) in marcas" :key="index" :lat-lng="[ marca.lat, marca.lng ] ">
          <l-popup>{{ marca.name }}</l-popup>
          <l-tooltip>{{ marca.name }}</l-tooltip>
        </l-marker>
        <l-polygon :lat-lngs="polygon.latlngs" :color="polygon.color"></l-polygon>
        <!-- <l-polygon :lat-lngs="latlongFiltrados" :color="polygon.color"></l-polygon> -->
      </l-map>
      <!-- </template> -->
      <div v-show="!mostrarMapa">Cargando Mapa ...</div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "mapacentros",
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      startLocation: {
        // lat: 41.656148,
        lat: 41.4,
        lng: -0.88245
      },
      mostrarMapa: false,
      mensajepreviomostrarmapa: "Se esta cargando el Mapa ..."
    };
  },
  methods: {
    Aviso() {
      this.mostrarMapa = true;
      console.log(
        "Se ha cargado ya el mapa ... El valor de mostrar Mapa es: " +
          this.mostrarMapa
      );
    }
  },
  computed: {
    latlongFiltrados() {
      this.polygon.latlngs.filter((elemento, index) => index % 2 == 0);
    }
  }
};
</script>
