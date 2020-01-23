<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 text-justify mt-5 borde1">
        Dentro del proyecto Vitalinux cabe destacar los siguientes enlaces que te pueden resultar de interés o ayuda:
        <ul>
          <li v-for="(enlace,index) in enlacesexternos" :key="index">
            <b-badge variant="info" class="cursor">
              <!-- <a :href="enlace.url">{{enlace.nombre}}</a> -->
              <a @click.prevent="openNewWindow(enlace.url)">{{enlace.nombre}}</a>
            </b-badge>
            : {{enlace.descripcion}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      enlacesexternos: [
        {
          nombre: "Vistazo Rápido de Vitalinux",
          descripcion: "Te permitirá conocer un poco más que es Vitalinux",
          url: "src/html/help_page/index.html"
        },
        {
          nombre: "Wiki del proyecto Vitalinux",
          descripcion:
            "Información completa de todo lo relacionado con el Programa de Software Libre Vitalinux",
          url: "https://wiki.vitalinux.educa.aragon.es"
        },
        {
          nombre: "Curso Aularagon Vitalinux",
          descripcion: "Curso abierto para la formación en Vitalinux",
          url: "https://catedu.gitbooks.io/curso-vitalinux/"
        },
        {
          nombre: "FAQs",
          descripcion:
            "Preguntas frecuentes acerca de aspectos o dudas en relación a Vitalinux",
          url: "https://wiki.vitalinux.educa.aragon.es/index.php/FAQs"
        },
        {
          nombre: "Soporte Vitalinux",
          descripcion:
            "Web de gestión de tickets de incidencias relacionadas con Vitalinux",
          url: "https://soporte.vitalinux.educa.aragon.es"
        }
      ]
    };
  }
};
</script>