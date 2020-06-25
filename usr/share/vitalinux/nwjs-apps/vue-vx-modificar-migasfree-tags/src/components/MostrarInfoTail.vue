<template>
  <div class="card border-secondary mb-3" style="max-width: 18rem;">
    <div class="card-header">
      Comunicación con Migasfree - Asignación de Etiquetas
    </div>
    <div class="card-body text-secondary contenido">
      <p class="card-text">{{ contenido }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "mostrarinfotail",
  props: {
    contenido: { type: String, default: "-- no hay contenido que mostrar --" },
  },
};
</script>

<style lang="css" scoped>
.contenido {
  padding: 15px;
  background-color: azure;
  max-height: 350px;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
