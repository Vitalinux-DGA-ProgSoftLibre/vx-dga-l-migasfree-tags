// eslint-disable-next-line no-unused-vars
const router = new VueRouter({
  routes: [
    {
      path: "*",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "Post-Install",
      component: httpVueLoader("src/views/Home.vue")
    },
    {
      path: "/tips",
      name: "Soporte y Ayuda",
      component: httpVueLoader("src/views/Soporte.vue")
    },
    {
      path: "/mapa",
      name: "Mapa de Centros",
      component: httpVueLoader("src/views/MapaCentros.vue")
    }
  ]
});

//router.vuejs.org/guide/advanced/navigation-guards.html#navigation-guards

https: router.beforeEach((to, from, next) => {
  let paso = store.state.info.paso.value;
  let paso_ant = store.state.info.paso_ant.value;
  /* console.log(typeof paso_ant + " - Con valor - " + paso_ant + " desde:")
  console.log(to)
  console.log(from) */
  if (paso > 0 && from.name === "Post-Install") {
    store.commit("ModificarInfo", {
      name: "paso_ant",
      value: paso
    });
  }
  if (to.name === "Post-Install" && paso_ant > 0) {
    store.commit("ModificarInfo", {
      name: "paso",
      value: paso_ant
    });
  }
  next();
});

router.afterEach((to, from) => {
  // ...
});
