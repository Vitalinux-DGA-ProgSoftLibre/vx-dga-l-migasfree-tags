// eslint-disable-next-line no-unused-vars
const store = new Vuex.Store({
  state: {
    paso: 1, // paso de la post-instalación
    mostrar: false,
    info: {
      comunicacion: {
        value: null,
      },
      confirmacion: {
        value: false,
      },
      terminarejecutar: {
        value: false,
      },
      pasarsiguiente: {
        value: false,
      },
      mostrar: {
        value: false,
        default: false,
      },
      paso: {
        value: 0,
      },
      paso_ant: {
        value: null,
      },
      escentro: {
        // Indica que e usa el equipo en un centro educativo
        value: null,
        default: false,
      },
      campos: ["equipo", "usuiniciosesion"],
      ipcache: {
        value: "",
        vmodel: "",
        desc: "IP Servidor Cache",
      },
      defaultipcache: {
        value: null,
      },
      setipcache: {
        value: null,
        mok: "IP asignada correctamente",
        merror: "Problemas para asignar la IP",
      },
      usuiniciosesion: {
        value: null,
        vmodel: null,
        desc: "Usuario Inicio Sesión",
      },
      defaultusuiniciosesion: {
        value: null,
      },
      setusuiniciosesion: {
        value: null,
        mok: "Usuario de inicio de sesión asignado",
        merror: "Problemas para asignar el Usuario",
      },
      mostrarnuevousuario: {
        value: false,
      },
      // Nombre del equipo:
      equipo: {
        value: null,
        vmodel: null,
        desc: "Nombre Equipo",
      },
      defaultequipo: {
        value: null,
      },
      setequipo: {
        value: null,
        mok: "Nombre asignado correctamente al equipo",
        merror: "Problemas para asignar el nombre al equipo",
      },
      // Datos del nuevo usuario en caso de querer iniciar sesión con un usuario no existente:
      nombrecompletousu: {
        value: "",
        vmodel: "",
      },
      nombreusu: {
        value: "",
        vmodel: "",
        desc: "Nuevo Usuario a Crear",
      },
      setnombreusu: {
        value: null,
        mok: "Usuario creado correctamente",
        merror: "Problemas para crear el usuario",
      },
      perfilusu: {
        value: null,
        vmodel: null,
      },
      passusu: {
        value: "vitalinux",
        vmodel: null,
      },
      passusurepe: {
        value: null,
        vmodel: null,
      },
      // Registramos si la asignación de etiquetas ha ido bien:
      setetmigasfree: {
        value: null,
        mok: "Etiquetas Migasfree asignadas correctamente",
        merror: "Problemas para asignar las Etiquetas Migasfree",
      },
      setsavetagstmp: {
        value: null,
        mok: "Etiquetas Migasfree guardadas en /tmp/migasfree.tags",
        merror: "Problemas para guardar las Etiquetas Migasfree",
      },
    },
    lisetmigasfreeall: null,
    lisetmigasfreeset: null,
  },
  getters: {
    classIpCache(state) {
      return state.info.setipcache.value === null
        ? "secondary"
        : state.info.setipcache.value === true
        ? "success"
        : "danger";
    },
    classEtMigasfree(state) {
      return state.info.setetmigasfree.value === null
        ? "secondary"
        : state.info.setetmigasfree.value === true
        ? "success"
        : "danger";
    },
    lisEtSelec(state) {
      return state.lisetmigasfreeall != null
        ? state.lisetmigasfreeall.filter((item) => item.seleccionado)
        : null;
    },
    listaEtFinal(state, getters) {
      return getters.lisEtSelec != null
        ? getters.lisEtSelec.map((item) => item.etiqueta)
        : null;
    },
    etiquetasSinCambiar(state, getters) {
      if (getters.listaEtFinal != null) {
        return getters.listaEtFinal.sort().toString() ===
          state.lisetmigasfreeset.sort().toString()
          ? true
          : false;
      } else {
        return false;
      }
    },
  },
  mutations: {
    ModificarListaEtiquetas(state, { name }) {
      state.lisetmigasfreeall.filter(
        (item) => item.etiqueta === name
      )[0].seleccionado = !state.lisetmigasfreeall.filter(
        (item) => item.etiqueta === name
      )[0].seleccionado;
    },
    ModificarInfo(state, { name, value }) {
      console.log("Mutación del value de Info: " + name + ":" + value);
      //state.info.filter(campo => campo.name === name)[0].value = value
      state.info[name].value = value;
    },
    ModificarInfoVmodel(state, { name, vmodel }) {
      console.log("Mutación del vmodel de Info: " + name + ":" + vmodel);
      state.info[name].vmodel = vmodel;
    },
    ModificarEtiquetas(state, { lista1, lista2 }) {
      state.lisetmigasfreeset = lista1;
      state.lisetmigasfreeall = lista2;
    },
  },
  actions: {
    async ObtenerValorDefecto({ commit }, { parametro, comando }) {
      try {
        console.log(
          `Obteniendo el valor por defecto de ${parametro} : ${comando}`
        );
        const resultado = await miexec(comando);
        if (resultado.stderr) {
          console.log(`Error al ejecutar ${comando}: ${resultado.stderr}`);
          commit("ModificarInfo", {
            name: parametro,
            value: null,
          });
        } else {
          mensaje = `Ok!! Resultado de ejecutar: ${comando} => ${resultado.stdout.toString()}`;
          console.log(mensaje);
          commit("ModificarInfo", {
            name: parametro,
            value: resultado.stdout.toString().trim(),
          });
        }
      } catch (err) {
        mensaje =
          "Resultado de Ejecución: Error - Problemas => " +
          comando +
          " => " +
          err;
        //resultado.stdout.toString();
        console.log(mensaje);
      }
    },
    AsignarEtiquetas(
      { commit },
      { etiquetas, mutacion, parametro, valorok, valorerr }
    ) {
      // Creamos un Array con todos los argunmentos necesarios para ejectutar el comando "sudo" necesario:
      // sudo migasfree-tags [-c|-s] <listado de etiquetas>
      args_comando = ["migasfree-tags", "-s", ...etiquetas];
      process.stdout.write(
        "=> Comando a Ejecutar: >sudo " + args_comando.join(" ") + "<\n"
      );
      // var spawn = require('child_process').spawn;
      let mibuffer = "";
      try {
        // spawn esta requerido en nw-const-funcs.js:
        //const comando = spawn('sudo', ['migasfree-tags', '-s', 'CEN-CIFEMA', 'CEN-CIFEMA.SALASINF', 'ENT-PROFESOR']);
        const comando = spawn("sudo", args_comando);
        let data = "";
        comando.stdout.on("data", (data) => {
          // sed -r 's/'$(echo -e "\033")'\[[0-9]{1,2}(;([0-9]{1,2})?)?[mK]//g'
          // Data es un objeto que habrá que pasar a String para poder reemplazar el código de colores. Para ello:
          // 1) Se le puede pasar directamente el objeto "data" y en la función colorReplace hacer uso de .toString()
          // 2) Se le pasa directamente "data" en formato String haciendo uso de `${data}`
          // colorReplace(`${data}`, true);
          mibuffer += colorReplace(data.toString(), true) + "<br>";
          console.log(data.toString());
          process.stdout.write(data.toString());
          commit("ModificarInfo", {
            name: "comunicacion",
            value: mibuffer,
          });
        });
        // Función a ejecutar al terminar de hacer lo encomendado: "end"
        comando.stdout.on("end", (data) => {
          mensaje = `=> Todo Ok!! Ya se ha terminado de ejecutar la Asignación de etiquetas\n`;
          console.log(mensaje);
          process.stdout.write(mensaje);
          commit(mutacion, {
            name: parametro,
            value: valorok,
          });
        });
        // Evento que se lanza antes del "close": "exit"
        comando.on("exit", (code) => {
          if (code != 0) {
            process.stdout.write(
              `=> No se ha terminado de asignar las etiquetas: error ${code}\n`
            );
          }
          if (code == 0) {
            process.stdout.write(
              `=> Se ha terminado de asignar las etiquetas: Codigo de Salida ${code}\n`
            );
          }
        });
        comando.stderr.on("data", (data) => {
          console.log(`stderr: ${data}`);
        });
        // Evento final tras terminar todo: "close"
        comando.on("close", (code) => {
          mensaje =
            "############## <b>YA PUEDES CERRAR LA APLICACIÓN</b> ##############<br><br>";
          mensaje +=
            "=> Ya ha terminado la asignación de etiquetas. aunque es aconsejable comprobar si ha habido errores/problemas en la comunicación con Migasfree.<br><br>";
          mensaje +=
            "##################### <b>https://soporte.vitalinux.educa.aragon.es</b> #####################<br>";
          //swal("Terminado!!", "Se ha terminado!!", "error");
          process.stdout.write(
            "=> Ya ha terminado la asignación de etiquetas ...\n"
          );
          mibuffer +=
            mensaje +
            "<br><br>-- Equipo Técnico Vitalinux <b>vitalinux@educa.aragon.es</b><br><br>·";
          commit("ModificarInfo", {
            name: "comunicacion",
            value: mibuffer,
          });
        });
      } catch (err) {
        // swal("¡¡Cancelado!!", "¡¡Problema con la actualización de etiquetas!!", "error");
        console.log("Error al Asignar las Etiquetas ...");
        commit(mutacion, {
          name: parametro,
          value: valorerr,
        });
      }
    },
    async ExecCommandAndSetParamAsync(
      { commit },
      { comando, mutacion, parametro, valorok, valorerr }
    ) {
      try {
        let mensaje =
          "=> Se va a ejecutar Asincronamente el comando: " + comando;
        console.log(mensaje);
        const resultado = await miexec(comando);
        if (resultado.stderr) {
          console.error(`Error al ejecutar ${comando}: ${resultado.stderr}`);
          commit(mutacion, {
            name: parametro,
            value: valorerr,
          });
        } else {
          mensaje = `Ok!! Resultado de ejecutar: ${comando} => ${resultado.stdout.toString()}`;
          console.log(mensaje);
          commit(mutacion, {
            name: parametro,
            value: valorok,
          });
        }
      } catch (err) {
        mensaje =
          "Resultado de Ejecución: Error - Problemas => " +
          comando +
          " => " +
          err;
        console.log(mensaje);
      }
    },
    ModificarListaEtiquetas({ commit }, { name }) {
      console.log("Vamos a modificar la etiqueta: " + name);
      commit("ModificarListaEtiquetas", {
        name,
      });
    },
    ModificarInfo(context, { name, value }) {
      //console.log("Han llegado a la Actions: " + name + " y " + value)
      let datos = {
        name: name,
        value: value,
      };
      context.commit("ModificarInfo", datos);
    },
    ModificarInfoVmodel(context, { name, vmodel }) {
      let datos = {
        name: name,
        vmodel: vmodel,
      };
      context.commit("ModificarInfoVmodel", datos);
    },
    // Acción encargada de consultar a Migasfree las etiquetas asignadas y disponibles:
    async myEtMigasfree({ commit }) {
      try {
        let comando = "sudo migasfree-tags -g";
        const res1 = await miexec(comando);
        let lista1 = null;
        let lista2 = null;
        if (res1.stderr) {
          console.error(`Error al ejecutar ${comando}: ${res1.stderr}`);
          return null;
        }
        console.log(
          `Etiquetas Asignadas: ${res1.stdout.toString().replace(/['"]+/g, "")}`
        );
        lista1 = res1.stdout.toString().replace(/['"]+/g, "").trim().split(" ");
        const { stdout, stderr } = await miexec("sudo migasfree-tags -a");
        if (stderr) {
          console.error(`error: ${stderr}`);
          return null;
        }
        let objeto = JSON.parse(stdout);
        let listado = Object.keys(objeto)
          .map((key) => objeto[key])
          .toString()
          .split(",");
        lista2 = listado.map((et, index) => {
          return {
            etiqueta: `${et}`,
            //seleccionado: false, // Por defecto false, a no ser que la etiqueta ya este asignada
            seleccionado: lista1.includes(et) ? true : false,
            indice: index,
          };
        });
        console.log("El listado de etiquetas disponibles es: ");
        console.log(lista2);
        let datos = {
          lista1: lista1,
          lista2: lista2,
        };
        commit("ModificarEtiquetas", datos);
      } catch {
        console.log("Error al consultar etiquetas ...");
      }
    },
  },
});
