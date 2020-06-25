<template>
  <div class="row justify-content-center">
    <div :class="['col-' + anchura, 'contenido']" ref="contenido">
      <span v-html="contenido"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "mostrarinfotail",
  props: {
    contenido: { type: String, default: "-- No hay contenido que mostrar --" },
    anchura: { type: Number, default: 10 },
  },
};
</script>

<style scoped>
.contenido {
  margin-top: 1em;
  text-align: left;
  height: 120px;
  padding: 15px;
  background-color: skyblue;
  color: white;
  font-size: small;
  max-height: 120px;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
