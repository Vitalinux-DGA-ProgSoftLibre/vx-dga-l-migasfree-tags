<template>
  <div class="row borde1 rounded justify-content-center">
    <div :class="['col-' + anchura, 'mt-2', 'mb-2']">
      <b-badge variant="primary" style="font-size: 1.3em;">
        {{
          etiquetasSinCambiar
            ? "Tus Etiquetas Migasfree no han cambiado"
            : "Aplicando Etiquetas Migasfree ..."
        }}
      </b-badge>
    </div>

    <!-- Etiquetado Migasfree: -->
    <div :class="['col-' + anchura, 'text-left']">
      <i
        :class="[
          'material-icons',
          'align-middle',
          'text-'.concat(calcularClass('setetmigasfree'))
        ]"
      >
        {{
          info["setetmigasfree"].value === null
            ? "live_help"
            : info["setetmigasfree"].value === true
            ? "assignment_turned_in"
            : "new_releases"
        }}
      </i>
      <span class="text-primary">Lista de Etiquetas Migasfree:</span>

      <!-- Mediante el getter etiquetasSinCambiar comprobamos si las etiquetas asignadas han cambiado: -->
      <!-- <template v-if="listaEtFinal.sort().toString() === lisetmigasfreeset.sort().toString()"> -->
      <template v-if="etiquetasSinCambiar">
        <i class="material-icons align-middle text-info">backspace</i>
        <b-badge variant="info">No han variado</b-badge>
      </template>

      <i
        v-if="info['setetmigasfree'].value != null"
        :class="[
          'material-icons',
          'align-middle',
          'text-'.concat(calcularClass('setetmigasfree'))
        ]"
        >backspace</i
      >
      <b-badge :variant="calcularClass('setetmigasfree')">
        {{
          info["setetmigasfree"].value === true
            ? info["setetmigasfree"].mok
            : info["setetmigasfree"].value === false
            ? info["setetmigasfree"].merror
            : null
        }}
      </b-badge>

      <template v-if="listaEtFinal != null">
        <div class="row" v-for="(et, index) in listaEtFinal" :key="index">
          <div class="col-12">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <b-badge :variant="classEtMigasfree">{{ index + 1 }}</b-badge>
            <b-badge :variant="classEtMigasfree" class="ml-1 mr-1">
              {{ et === "" ? "Ninguna Etiqueta" : et }}
            </b-badge>
          </div>
        </div>
        <!-- <b-badge
          :variant="calcularClass('setetmigasfree')"
          class="ml-1 mr-1'"
          v-for="(et,index) in listaEtFinal"
          :key="index"
        >{{et === "" ? "Ninguna Etiqueta" : et}}</b-badge>-->
        <!-- <template v-if="listaEtFinal.sort().toString() === lisetmigasfreeset.sort().toString()">
          <i class="material-icons align-middle text-info">backspace</i>
          <b-badge variant="info">No han variado</b-badge>
        </template>-->
      </template>
      <!-- <template v-else-if="listaEtFinal.sort().toString() === lisetmigasfreeset.sort().toString()">
        <b-badge>La lista de Etiquetas Migasfree no ha variado ...</b-badge>
      </template>-->
      <template v-else>
        <b-badge>No hay Etiquetas que asignar ...</b-badge>
      </template>
    </div>
    <br />
    <div
      class="row"
      v-if="!etiquetasSinCambiar && info['setetmigasfree'].value === null"
    >
      <!-- <div class="cols-2"></div> -->
      <div class="cols-8 mx-auto">
        <div class="text-center">
          <figure class="figure">
            <pulse-loader color="#3AB982"></pulse-loader>
            <figcaption class="figure-caption text-center">
              Esperando a terminar de Asignar Etiquetas ...
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    anchura: { type: Number, default: 8 }
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
      "etiquetasSinCambiar"
    ]),
    confirmacionUsuario() {
      return this.info.confirmacion.value;
    },
    terminarEjecutar() {
      // this.info.setnombreusu.value != null &&
      return this.info.setetmigasfree.value != null || this.etiquetasSinCambiar
        ? true
        : false;
    },
    terminarEjecutarOk() {
      // Comprobamos que la ejecuciónd de los solicitado se ha realizado correctamente:
      return this.info.setetmigasfree.value || this.etiquetasSinCambiar
        ? true
        : false;
    }
  },
  methods: {
    ...Vuex.mapActions([
      "ModificarInfo",
      // "AsignarEtiquetas",
      "ExecCommandAndSetParamAsync"
    ]),
    calcularClass(campo) {
      let valor = this.info[campo].value;
      return valor === null
        ? "secondary"
        : valor === true
        ? "success"
        : "danger";
    }
  },
  watch: {
    terminarEjecutar(New, Old) {
      // Indicamos que ya hemos terminado de dar la orden de ejecutar todo:
      if (New === true) {
        this.ModificarInfo({ name: "terminarejecutar", value: true });
      }
    },
    terminarEjecutarOk(New, Old) {
      // Comprobamos si se ha ejecutado correctamente todo lo solicitado:
      if (New === true) {
        // En el caso de que este todo "ok" continuaremos automáticamente con la post-instalación:
        console.log("Cerramos la aplicación si esta todo Ok");
        //this.closeWindow(0);
      }
    },
    confirmacionUsuario(New, Old) {
      if (New === true) {
        console.log("La confirmacion esta a TRUE");
        this.ejecutarConfirmacion();
      }
    }
  }
};
</script>

<style></style>
