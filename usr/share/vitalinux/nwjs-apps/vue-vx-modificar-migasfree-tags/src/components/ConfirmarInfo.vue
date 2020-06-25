<template>
  <div class="row borde1 rounded justify-content-center">
    <div :class="['col-' + anchura, 'mt-2', 'mb-2']">
      <b-badge variant="primary" style="font-size: 1.3em;"
        >¿Confirmas tu Etiquetado Migasfree?
        <span v-if="etiquetasSinCambiar">¡¡No ha Variado!!</span></b-badge
      >
    </div>
    <!-- Etiquetado Migasfree: -->
    <div :class="['col-' + anchura, 'text-left']">
      <i
        :class="[
          'material-icons',
          'align-middle',
          'text-'.concat(calcularClass('setetmigasfree')),
        ]"
        >{{
          info["setetmigasfree"].value === null
            ? "live_help"
            : info["setetmigasfree"].value === true
            ? "assignment_turned_in"
            : "new_releases"
        }}</i
      >
      <span class="text-primary">Lista de Etiquetas Migasfree:</span>

      <!-- Mediante el getter etiquetasSinCambiar comprobamos si las etiquetas asignadas han cambiado: -->
      <!-- <template v-if="listaEtFinal.sort().toString() === lisetmigasfreeset.sort().toString()"> -->
      <template v-if="etiquetasSinCambiar">
        <i class="material-icons align-middle text-info">backspace</i>
        <b-badge variant="info">No han variado</b-badge>
      </template>

      <template v-if="listaEtFinal != null">
        <template v-if="listaEtFinal.length > 0">
          <!-- :variant="calcularClass('setetmigasfree')" -->
          <!-- Mostramos las etiquetas como en forma de lista: -->
          <div class="row" v-for="(et, index) in listaEtFinal" :key="index">
            <div class="col-12">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b-badge :variant="classEtMigasfree">{{ index + 1 }}</b-badge>
              <b-badge :variant="classEtMigasfree" class="ml-1 mr-1">{{
                et === "" ? "Ninguna Etiqueta" : et
              }}</b-badge>
            </div>
          </div>
        </template>
        <template v-else>
          <b-badge variant="info">No se ha asignado ninguna Etiqueta</b-badge>
        </template>
      </template>
      <template v-else>
        <b-badge variant="danger"
          >Problemas al asignar Etiquetas [Sin Conexión con Migasfree]</b-badge
        >
      </template>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    anchura: { type: Number, default: 8 },
  },
  mounted() {},
  created() {},
  data() {
    return {};
  },
  computed: {
    ...Vuex.mapState(["info", "lisetmigasfreeset"]),
    ...Vuex.mapGetters([
      "listaEtFinal",
      "classIpCache",
      "classEtMigasfree",
      "etiquetasSinCambiar",
    ]),
  },
  methods: {
    calcularClass(campo) {
      let valor = this.info[campo].value;
      return valor === null
        ? "secondary"
        : valor === true
        ? "success"
        : "danger";
    },
  },
  watch: {},
};
</script>

<style>
.listado-etiquetas {
  margin-top: 1 px;
  margin-bottom: 1 px;
}
</style>
