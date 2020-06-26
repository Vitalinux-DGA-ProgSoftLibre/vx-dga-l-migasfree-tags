<template>
  <div class="home">
    <!-- shape="circle|square|tab" -->
    <!-- step-size="md|xs|sm|lg" -->
    <!-- :start-index.sync="stepIndex" Para sincronizar en una variable la Tab actual -->
    <transition
      name="mifade"
      mode="out-in"
      enter-active-class="animated fadeIn slow"
      leave-active-class="animated fadeOut slow"
    >
      <div key="asistente">
        <form-wizard
          :start-index.sync="stepIndex"
          next-button-text="Siguiente"
          back-button-text="Atrás"
          finish-button-text="Finalizar"
          :title="titulo"
          :subtitle="subtitulo"
          transition="fade"
          color="lightblue"
          shape="circle"
          step-size="xs"
          @on-complete="onComplete"
          ref="form"
        >
          <tab-content :title="titulo1" icon="ti-desktop">
            <Etiquetasmigasfree></Etiquetasmigasfree>
          </tab-content>

          <tab-content :title="titulo2" icon="ti-desktop">
            <Confirmarinfo :anchura="10"></Confirmarinfo>
          </tab-content>

          <!-- <tab-content :title="titulo3" icon="ti-desktop">
            <Ejecutarinfo :anchura="10"></Ejecutarinfo>
          </tab-content>-->

          <tab-content :title="titulo4" icon="ti-desktop">
            <Mostrarinfo :anchura="10"></Mostrarinfo>
          </tab-content>

          <template slot="footer" slot-scope="props">
            <div class="row justify-content-around">
              <div class="col-2">
                <button
                  type="button"
                  class="btn boton rounded font-titulo w-100"
                  v-if="!props.isLastStep"
                  @click.prevent="closeWindow(1)"
                  v-b-tooltip.hover
                  :title="tooltipsalir"
                >
                  Salir
                </button>
                <!-- <button
                  type="button"
                  class="btn boton rounded font-titulo w-100"
                  v-if="props.isLastStep"
                  @click.prevent="closeWindow(0)"
                >
                  Cerrar
                </button> -->
              </div>
              <div class="col-2"></div>
              <div class="col-2">
                <button
                  class="btn boton rounded font-titulo w-100"
                  v-if="!props.isLastStep && props.activeTabIndex > 0"
                  @click.prevent="volverSeleccion()"
                  v-b-tooltip.hover
                  :title="tooltipanterior"
                >
                  <!-- @click.prevent="props.prevTab()"
                  >-->
                  Anterior
                </button>
              </div>
              <div class="col-6">
                <button
                  class="btn boton rounded font-titulo w-100"
                  v-if="stepIndex == 0"
                  @click.prevent="props.nextTab()"
                  v-b-tooltip.hover
                  :title="tooltipcontinuar"
                >
                  Continuar Modificando Etiquetas
                </button>
                <button
                  class="btn boton rounded font-titulo w-100"
                  v-if="
                    !props.isLastStep && stepIndex != 0 && !etiquetasSinCambiar
                  "
                  @click.prevent="props.nextTab()"
                  v-b-tooltip.hover
                  :title="tooltipconfirmar"
                >
                  Confirmar Etiquetado
                </button>
                <template
                  v-if="!etiquetasSinCambiar && !info['setetmigasfree'].value"
                >
                  <button
                    class="btn boton rounded font-titulo w-100"
                    v-if="props.isLastStep"
                    @click.prevent="hideWindow()"
                    v-b-tooltip.hover
                    :title="tooltipocultar"
                  >
                    Ocultar Ventana
                  </button>
                </template>
                <template
                  v-if="!etiquetasSinCambiar && info['setetmigasfree'].value"
                >
                  <button
                    class="btn boton rounded font-titulo w-100"
                    v-if="props.isLastStep"
                    @click.prevent="closeWindow(0)"
                    v-b-tooltip.hover
                    :title="tooltipocerrar"
                  >
                    Cerrar
                  </button>
                </template>
              </div>
            </div>
          </template>
        </form-wizard>
      </div>

      <!-- </template> -->
    </transition>

    <!-- <pre> {{ $data }}</pre> -->
  </div>
</template>

<script>
module.exports = {
  name: "home",
  components: {
    // El nombre de los Componentes sólo puede tener en mayúsculas la primera letra
    // El nombre del archivo *.vue puede tener diferentes mayúsculas pero el componente no
    Etiquetasmigasfree: httpVueLoader("../components/EtiquetasMigasfree.vue"),
    Confirmarinfo: httpVueLoader("../components/ConfirmarInfo.vue"),
    Ejecutarinfo: httpVueLoader("../components/EjecutarInfo.vue"),
    Mostrarinfo: httpVueLoader("../components/MostrarInfo.vue"),
  },
  created() {},
  mounted() {},
  data: function () {
    return {
      // Título y Subtitúlo del Form Wizard
      titulo: "",
      subtitulo: "",
      // Textos bajo los iconos de cada paso del Asistente
      titulo1: "Selecciona Etiquetas",
      titulo2: "Confirma Etiquetas",
      titulo3: "Comprueba y Termina",
      titulo4: "Información Resultante",
      tooltipsalir:
        "Si no estas seguro de que Etiquetas Migasfree quieres asignar puedes abortar y salir sin provocar cambios en el Equipo",
      tooltipcontinuar:
        "Tras elegir tus Etiquetas Migasfree deseadas continua para asignarlas a tu Equipo",
      tooltipocultar:
        "Tus etiquetas se estan aplicando y sincronizando contra Migasfree. Si quieres puedes ocultar la ventana",
      tooltipanterior: "Volver a seleccionar Etiquetas Migasfree",
      tooltipconfirmar:
        "Confirma Etiquetado Migasfree para asignarlo al Equipo",
      tooltipocerrar:
        "Asignación de Etiquetas Terminada. Puedes cerrar la aplicación ahora aunque es aconsejable comprobar los mensajes de salida por si hubiera habido algún error",
    };
  },
  computed: {
    ...Vuex.mapState(["info"]),
    ...Vuex.mapGetters(["listaEtFinal", "etiquetasSinCambiar"]),
    pasarSiguiente() {
      return this.info.pasarsiguiente.value;
    },
    setEtMigasfreeOk() {
      return this.info.setetmigasfree.value;
    },
    // Indice de comienzo del Asistente Form Wizard sincronizado con Vuex:
    stepIndex: {
      get() {
        return this.info.paso.value != -1 ? this.info.paso.value : 0;
      },
      set(value) {
        this.ModificarInfo({ name: "paso", value: value });
      },
    },
  },
  watch: {
    pasarSiguiente(New, Old) {
      if (New === true) {
        this.siguienteEnlace();
        console.log("PasarSiguiente: Pasamos a la siguiente pestaña ...");
        this.ModificarInfo({ name: "pasarsiguiente", value: false });
      }
    },
    stepIndex(New, Old) {
      console.log("Estamos en el paso: ", New);
      if (New === 2) {
        console.log("Vamos a aplicar las Etiquetas seleccionadas ...");
        this.ejecutarConfirmacion();
      }
    },
    setEtMigasfreeOk(New, Old) {
      if (New) {
        this.saveTmpMigasfreeTags();
      }
    },
  },
  methods: {
    ...Vuex.mapActions([
      "ModificarInfo",
      "ExecCommandAndSetParamAsync",
      "AsignarEtiquetas",
    ]),
    siguienteEnlace() {
      this.$nextTick(() => {
        // Cuando el DOM se ha actualizado cambiamos de tab:
        this.$refs.form.nextTab();
        this.cogerfoco = true;
      });
    },
    volverSeleccion() {
      pasos = this.info.paso.value;
      console.log("=> Vamos a regresar: ", pasos);
      for (i = 0; i < pasos; i++) {
        this.$refs.form.prevTab();
      }
    },
    // Indicamos lo que queremos que ocurra al confirmar el asistente de Post-Instalación:
    onComplete() {
      this.ModificarInfo({ name: "confirmacion", value: true });
    },
    saveTmpMigasfreeTags() {
      // Si la modificación anterior ha sido exitosa se guardarán en: /tmp/migasfree.tags
      let mensaje = "=> Vamos a guardar las Tags en /tmp/migasfree.tags ...";
      console.log(mensaje);
      process.stdout.write("mensaje");
      comando =
        this.listaEtFinal.length > 0
          ? `sudo vx-migasfree-tags-save-tmp ${this.listaEtFinal.join(" ")}`
          : "sudo vx-migasfree-tags-save-tmp ''";
      // migasfree-tags -s ya guarda las etiquetas en el fichero temporal:
      // this.ExecCommandAndSetParamAsync({
      //   comando,
      //   mutacion: "ModificarInfo",
      //   parametro: "setsavetagstmp",
      //   valorok: true,
      //   valorerr: false
      // });
    },
    ejecutarConfirmacion() {
      console.log("=> Ejecutamos lo indicado por el usuario ...");
      let resultado = null;

      if (!this.etiquetasSinCambiar) {
        // comando =
        //   this.listaEtFinal.length > 0
        //     ? `sudo migasfree-tags -s ${this.listaEtFinal.join(" ")}`
        //     : "sudo migasfree-tags -s ''";
        let listado = this.listaEtFinal.length > 0 ? this.listaEtFinal : '""';
        this.AsignarEtiquetas({
          etiquetas: listado,
          mutacion: "ModificarInfo",
          parametro: "setetmigasfree",
          valorok: true,
          valorerr: false,
        });
      }
    },
  },
};
</script>

<style>
.boton {
  /* Mismos Estilos que impone por defecto el Wizard: */
  /* background-color: lightblue;
  color: white; */
  border-color: lightblue;
  font-size: 1em;
  padding: 5px;
  cursor: pointer;
  background: orange;
  color: darkblue;
  /* Animáción de tipo parpadeo: */
  /* css syntax:
  animation: name duration timing-function delay iteration-count direction fill-mode play-state;
  animation (Default values): none 0 ease 0 1 normal none running*/
  /* animation: colorchange 1.5s linear 0 infinite; */
  /* Chrome and Safari */
  /* -webkit-animation: colorchange 1.5s;  */

  /* animation-name: colorchange;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: colorchange;
  -webkit-animation-duration: 5s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite; */
}

/* @keyframes colorchange {
  0% {
    background: lightblue;
    color: white;
  }
  50% {
    background: orange;
    color: darkblue;
  }
  100% {
    background: lightblue;
    color: white;
  }
} */

/* Safari and Chrome - necessary duplicate */
/* @-webkit-keyframes colorchange  {
  0% {
    background: lightblue;
    color: white;
  }
  50% {
    background: orange;
    color: darkblue;
  }
  100% {
    background: lightblue;
    color: white;
  }
} */

.boton:hover {
  /* color: darkblue; 
  background-color: orange; */
  background-color: red;
  color: white;
  animation: none;
}

.botonsalir {
  margin-left: 60px;
  margin-right: 5px;
}

.botonnav {
  margin-right: 60px;
  margin-left: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
