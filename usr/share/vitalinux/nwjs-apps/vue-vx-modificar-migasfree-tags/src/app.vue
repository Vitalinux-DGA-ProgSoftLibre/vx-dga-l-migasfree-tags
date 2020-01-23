<template>
  <div id="app">
    <!-- Vue Router  -->
    <div :class="[claseinfo, 'container-fluid', 'col-12']">
      <!-- https://v4-alpha.getbootstrap.com/utilities/display-property/ -->
      <b-badge class="mt-1" variant="info">
        <span class="mb-0">
          <span class="font-titulo" style="font-size: 2em; padding: 0px;"
            >Etiquetado</span
          >
          <span style="font-size: 2.5em; font-family: 'Lobster';"
            >Migasfree</span
          >
        </span>
        <small class="d-block mt-0"
          >Gestión de las Etiquetas Migasfree del Equipo</small
        >
      </b-badge>
      <template v-if="connectionStatus">
        <div class="row justify-content-center">
          <router-link
            v-for="(route, routeIndex) in routeComponents"
            class="p-1 col-3 rounded-top mx-2 links font-titulo"
            exact-active-class="bg-danger"
            active-class="text-white"
            style="text-decoration: none"
            :to="route.path"
            :key="'route' + routeIndex"
            >{{ route.name }}</router-link
          >
          <!-- <router-link
            v-for="(route, routeIndex) in $router.options.routes"
            v-if="route.component"
            class="p-1 col-3 rounded-top mx-2 links font-titulo"
            exact-active-class="bg-danger"
            active-class="text-white"
            style="text-decoration: none"
            :to="route.path"
            :key="'route' + routeIndex"
          >{{ route.name }}</router-link>-->
        </div>
      </template>
    </div>
    <template v-if="connectionStatus">
      <div>
        <router-view />
      </div>
    </template>
    <template v-else>
      <div class="row justify-content-center">
        <div class="col-10">
          ¡¡Hay problemas de conexión con Internet!!
          <br />Por favor, revisa tu conexión con internet, ¡¡¡No podemos
          conectarnos a Migasfree!!!
        </div>
      </div>
    </template>
  </div>
</template>

<script>
module.exports = {
  name: "app",
  created() {
    console.log("=> Comprobamos si hay conexión con Internet ...");
    this.thereIsInternet();
    console.log(
      "=> Comprobamos el etiquetado Migasfree disponible y asignado ..."
    );
    this.myEtMigasfree();
  },
  data: function() {
    return {};
  },
  methods: {
    ...Vuex.mapActions(["myEtMigasfree"])
  },
  computed: {
    // Filtramos las rutas del router asociadas a un componente para mostrar sus router-link asociado:
    routeComponents() {
      return this.$router.options.routes.filter(el => el.component);
    }
  }
};
</script>

<style scope>
a {
  text-decoration: none;
}
.links {
  background-color: bisque;
  font-size: 1em;
  text-decoration: none;
}
.links:hover {
  background-color: red;
}
.router-link-active {
  border: 1px solid #00f;
  border-radius: 50px;
  padding: 1px 9px 3px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.no-seleccionable {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
