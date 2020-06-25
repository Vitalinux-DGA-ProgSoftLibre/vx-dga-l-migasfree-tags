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
          'text-'.concat(calcularClass('setetmigasfree')),
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
          'text-'.concat(calcularClass('setetmigasfree')),
        ]"
        >backspace</i
      >
      <b-badge
        v-if="info['setetmigasfree'].value != null"
        :variant="calcularClass('setetmigasfree')"
      >
        {{
          info["setetmigasfree"].value === true
            ? info["setetmigasfree"].mok
            : info["setetmigasfree"].value === false
            ? info["setetmigasfree"].merror
            : null
        }}
      </b-badge>

      <!-- Mostramos la lista de Etiquetas deseada: -->
      <template v-if="listaEtFinal != null">
        <div class="row">
          <div
            :class="[
              'bg-' + calcularClass('setetmigasfree'),
              'p-2',
              'listafinal',
              'border-info',
              'rounded',
            ]"
          >
            {{
              listaEtFinalCadena == null
                ? "Ninguna Etiqueta"
                : listaEtFinalCadena
            }}
            <!-- <b-badge :variant="classEtMigasfree">{{
              listaEtFinalCadena == null
                ? "Ninguna Etiqueta"
                : listaEtFinalCadena
            }}</b-badge> -->
          </div>
        </div>
      </template>

      <template v-else>
        <b-badge>No hay Etiquetas que asignar ...</b-badge>
      </template>
    </div>
    <!-- Problema para mandar contenido asincrono al componente Mostrarinfotail: -->
    <!-- <Mostrarinfotail :contenido="contenido" :anchura="10" /> -->
    <div class="row justify-content-center">
      <div class="col-10 contenido" ref="contenido">
        <span v-html="contenido"></span>
      </div>
    </div>
    <br />
    <div
      class="row"
      v-if="!etiquetasSinCambiar && info['setetmigasfree'].value === null"
    >
      <!-- <div class="cols-2"></div> -->
      <div class="row" style="margin-top: 1em;">
        <div class="cols-8 mx-auto">
          <div
            class="text-center rounded p-2"
            style="
              display: flex;
              align-tiems: center;
              background-color: gray;
              color: white;
            "
          >
            <pulse-loader class="align-middle" color="#5bc0de"></pulse-loader>
            <figcaption class="align-middle ml-2" style="font-size: smaller;">
              Esperando a terminar la Asignación de Etiquetas ...
            </figcaption>
            <!-- <figure class="figure">
              <pulse-loader color="#5bc0de"></pulse-loader>
              <figcaption class="figure-caption text-center">
                Esperando a terminar la Asignación de Etiquetas ...
              </figcaption>
            </figure> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: "mostrarinfo",
  props: {
    anchura: { type: Number, default: 8 },
  },
  components: {
    // El nombre de los Componentes sólo puede tener en mayúsculas la primera letra
    // El nombre del archivo *.vue puede tener diferentes mayúsculas pero el componente no
    Mostrarinfotail: httpVueLoader("../components/MostrarInfoTail.vue"),
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
    listaEtFinalCadena() {
      if (this.listaEtFinal == null) {
        return null;
      } else {
        if (this.listaEtFinal.length > 0) {
          let cadena = 0;
          cadena = this.listaEtFinal
            .map((el, index) => {
              return `[${index + 1}] ${el}`;
            })
            .join(" ");
          return cadena;
        } else {
          return null;
        }
      }
    },
    contenido() {
      return this.info.comunicacion.value == null
        ? "-- Sin comunicación --"
        : this.info.comunicacion.value;
    },
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
    },
  },
  methods: {
    ...Vuex.mapActions([
      "ModificarInfo",
      // "AsignarEtiquetas",
      "ExecCommandAndSetParamAsync",
    ]),
    calcularClass(campo) {
      let valor = this.info[campo].value;
      return valor === null
        ? "secondary"
        : valor === true
        ? "success"
        : "danger";
    },
  },
  watch: {
    contenido(New, Old) {
      // console.log("############ Ha cambiado el contenido ##############");
      let divcontenidos = this.$refs.contenido;
      divcontenidos.scrollTop = divcontenidos.scrollHeight;
    },
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
    },
  },
};
</script>

<style scoped>
.contenido {
  margin-top: 1em;
  text-align: left;
  height: 120px;
  padding: 15px;
  background-color: black;
  color: white;
  font-size: small;
  max-height: 120px;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
}
.listafinal {
  font-size: smaller;
  color: white;
  font-weight: bold;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
  /* height: 50px; */
  max-height: 50px;
}
</style>
