Vue.mixin({
  data() {
    return {
      listaetiquetas: [],
      usuario: "vacio",
      resultado: [],
      mensajeexec: "",
      usuariosgraficos: null,
      resultado_ejecucion: ""
    }
  },
  methods: {
    saludar() {
      Swal.fire('Hola!! Esto es una función accesible de manera general!!!')
    },
    async vxUsuariosGraficos() {
      let resultado = await this.EjecutarSincrono('vx-usuarios-graficos | tr -s "\n" ","')
      console.log("El listado de usuarios es: " + resultado)
      this.usuariosgraficos = await resultado
    },
    Whoami() {
      this.EjecutarAsincrono('whoami')
    },
    MigasfreeA() {
      // this.resultado = this.EjecutarAsincrono('vx-etiquetas-all')
      this.resultado = this.EjecutarAsincrono('sudo migasfree-tags -a')
    },
    async EjecutarAsincronoPromise(comando) {
      let mensaje = "=> Se va a ejecutar Asincronamente el comando: " + comando;
      console.log(mensaje)
      try {
        const resultado = await miexec(comando)
        if (resultado.stderr) {
          console.error(`Error al ejecutar ${comando}: ${resultado.stderr}`);
          return null
        }
        mensaje = `Ok!! Resultado de ejecutar: ${comando} => ${resultado.stdout.toString()}`
        console.log(mensaje);
        return resultado.stdout.toString()
      } catch (err) {
        mensaje = "Resultado de Ejecución: Error - Problemas => " + comando + " => " + resultado.stdout.toString()
        console.log(mensaje)
        return "error"
      }
    },
    EjecutarAsincrono(comando) {
      exec(comando, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout de \"${comando}\": ${stdout}`);
        console.log(`stderr de \"${comando}\": ${stderr}`);
      });
    },
    EtiquetasMigasfreeDisponibles() {
      this.mensajeexec = "Consultando Etquetas Migasfree disponibles ..."
      // exec('vx-etiquetas-all', (error, stdout, stderr) => {
      exec('sudo migasfree-tags -a', (error, stdout, stderr) => {
        if (error) {
          this.mensajeexec = "Es posible que tengas problemas de conexión con Internet ... Revisa tu conexión, por favor."
          console.error(`exec error: ${error}`);
          return;
        }
        let objeto = JSON.parse(stdout)
        this.resultado = Object.keys(objeto)
          .map(key => objeto[key])
          .toString()
          .split(",");
        this.listaetiquetas = this.resultado.map((et, index) => {
          return {
            etiqueta: `${et}`,
            seleccionado: false,
            indice: index
          };
        });
        console.log(this.resultado)
      });
    },
    MostrarMensaje(mensaje) {
      console.log(mensaje);
      nw.process.stdout.write(mensaje + "\n");
    },
    EjecutarSincrono(comando) {
      // let mensaje = "=> Se va a ejecutar el comando: " + comando;
      // this.MostrarMensaje(mensaje)
      try {
        const resultado = execSync(comando)
        mensaje = "Resultado de Ejecución: Ok"
        this.MostrarMensaje(mensaje)
        return resultado
      } catch (err) {
        mensaje = "Resultado de Ejecución: Error - Problemas"
        this.MostrarMensaje(mensaje)
        return "error"
      }
    },
    UsuarioWhoami() {
      try {
        // Consultamos que usuario esta lanzando la aplicación
        const usuario = execSync("whoami");
        //alert("El usuario es " + usuario)
        Swal.fire("El usuario es " + usuario)
        console.log("El usuario es " + usuario)
      } catch (err) {
        alert("problemas con el usuario ...")
        console.log("problemas ...")
      }
    }
  },
  computed: {
    ObjUsuariosGraficos() {
      if (this.usuariosgraficos != null) {
        console.log("El listado es: " + this.usuariosgraficos)
        let listadousuarios = this.usuariosgraficos.toString().split(",")
        // Eliminamos el último elemento del array al ser vacío
        listadousuarios.pop()
        return listadousuarios.map(el => {
          return {
            value: el,
            text: el
          }
        })
      } else return null
    }

  }
})