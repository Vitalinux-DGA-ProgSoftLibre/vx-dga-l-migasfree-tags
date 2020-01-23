<template>
  <b-container class="borde1">
    <template v-if="lisetmigasfreeall != null">
      <div class="row justify-content-center">
        <div class="col-10 form-group">
          <input
            type="text"
            class="form-control"
            aria-describedby="helpId"
            placeholder="Busca aquí tus Etiquetas Migasfree"
            v-model="inputetiqueta"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div :class="claseinfo">Etiquetas Disponibles</div>
          <div style="overflow: auto; height: 200px;">
            <table>
              <tr
                v-for="(elemento,index) in EtiquetasRelacionadas"
                :key="index"
                @click="ModificarListaEtiquetas({name: elemento.etiqueta})"
                class="w-100"
              >
                <!-- @click="Seleccionar(elemento.indice)" -->
                <!-- <td :class="[ 'text-left', index % 2 ? 'par' : 'impar' ]"> -->
                <td :class="[ 'w-100', 'text-left', calcularClase(elemento.indice) ]">
                  <i class="material-icons align-middle" style="color: lightblue">label</i>
                  {{ elemento.etiqueta }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="col-6">
          <div :class="claseinfo">Etiquetas Seleccionadas</div>
          <div style="height: 200px; overflow: auto">
            <table>
              <tr
                v-for="(elemento,index) in lisEtSelec"
                :key="index"
                class="w-100"
                @click="ModificarListaEtiquetas({name: elemento.etiqueta})"
              >
                <td :class="['bordecelda', 'w-100', 'text-left',  calcularClase(elemento.indice) ]">
                  <i
                    class="material-icons align-middle font-weight-bold text-danger float-left"
                  >highlight_off</i>
                  <i class="material-icons align-middle text-success">label</i>
                  {{ elemento.etiqueta }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="cols-8 mx-auto">
          <div class="text-center">
            <figure class="figure">
              <pulse-loader color="#3AB982"></pulse-loader>
              <figcaption class="figure-caption text-center">{{ mensaje_carga }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </template>
  </b-container>
</template>

<script>
module.exports = {
  name: "Etiquetasmigasfree",
  data: function() {
    return {
      inputetiqueta: "",
      mensaje_carga: "Consultando Etiquetas al Servidor Migasfree ..."
    };
  },
  created() {
    if (this.listaEtFinal != null && this.info.escentro.value != null) {
      if (
        !this.info.escentro.value &&
        this.listaEtFinal.indexOf("ENT-CASA") === -1
      ) {
        console.log("=> Vamos a imponer la etiqueta ENT-CASA");
        this.ModificarListaEtiquetas({ name: "ENT-CASA" });
      }
      if (
        this.info.escentro.value &&
        this.listaEtFinal.indexOf("ENT-CASA") != -1
      ) {
        console.log(
          "=> Vamos a eliminar la etiqueta ENT-CASA al estar el equipo en un centro"
        );
        this.ModificarListaEtiquetas({ name: "ENT-CASA" });
      }
    }
  },
  mounted() {},
  methods: {
    ...Vuex.mapActions(["myEtMigasfree", "ModificarListaEtiquetas"]),
    calcularClase(indice) {
      let listado = this.lisetmigasfreeall;
      if (indice % 2 && !listado[indice].seleccionado) return "par";
      if (!indice % 2 && !listado[indice].seleccionado) return "impar";
      if (listado[indice].seleccionado) return "seleccionado";
      // ? "par" : "impar";
    }
  },
  computed: {
    ...Vuex.mapState(["lisetmigasfreeall", "lisetmigasfreeset", "info"]),
    ...Vuex.mapGetters(["lisEtSelec", "listaEtFinal"]),
    EtiquetasRelacionadas() {
      let listado = this.lisetmigasfreeall;
      return listado.length != 0
        ? listado.filter(elemento =>
            elemento.etiqueta.includes(this.inputetiqueta.toUpperCase())
          )
        : "";
    }
  },
  watch: {
    /* Comprobamos las etiquetas que tiene asignadas el equipo en el momento de la
    instalación (en el caso de ser una reinstalación ya tiene un historico de etiquetas)
    e imponemos la etiqueta ENT-CASA cuando es un equipo que no esta en un centro, en el caso de
    que no la tenga ya asignada: */
    // lisetmigasfreeset(New, Old) {
    //   if (
    //     New != null &&
    //     this.info.escentro.value != null &&
    //     !this.info.escentro.value &&
    //     New.indexOf("ENT-CASA") === -1
    //   ) {
    //     console.log("Vamos a imponer la etiqueta ENT-CASA");
    //     this.ModificarListaEtiquetas({ name: "ENT-CASA" });
    //   }
    // }
  }
};
</script>

<style scope>
/* Para garantizar el 100% del ancho de la tabla dentro del div en el que se encuentra */
table {
  table-layout: fixed;
  width: 100%;
}
tr {
  cursor: pointer;
  border-width: 2px;
}

td {
  /* Para evitar que salte de línea el contenido de una celda al superar el ancho: */
  /* white-space: nowrap; */
  /* Para que rompa la palabra y salte de línea si hace falta al superar el ancho: */
  word-wrap: break-word;
}

.bordecelda {
  border-bottom: 1pt solid lightgoldenrodyellow;
}

.par {
  background-color: antiquewhite;
  color: blue;
}
.impar {
  background-color: azure;
  color: slategray;
}
.seleccionado {
  background-color: lightcoral;
  color: white;
}
</style>
