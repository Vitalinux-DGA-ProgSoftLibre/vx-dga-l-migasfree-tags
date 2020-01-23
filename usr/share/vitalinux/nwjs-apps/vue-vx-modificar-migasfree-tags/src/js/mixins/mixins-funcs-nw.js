Vue.mixin({
  data() {
    return {};
  },
  created() {},
  components: {
    PulseLoader
  },
  methods: {
    openDevTools() {
      nw.Window.get().showDevTools();
    },
    showWindow() {
      nw.Window.get().show();
    },
    hideWindow() {
      nw.Window.get().hide();
    },
    exitApp(codigo) {
      console.log("Mandando exit al sistema con codigo: " + codigo);
      execSync(`exit ${codigo}`);
    },
    closeWindow(codigo) {
      // Escondemos la ventana para que el usuario advierta que se esta cerrando la app:
      nw.Window.get().hide();
      // Si el código de salida es 0 actuamos en consecuencia:
      if (codigo == 0) {
        try {
          let comando = "sudo vx-migasfree-force-upgrade";
          nw.process.stdout.write(
            `=> Para terminar actualizaremos contra Migasfree: \"${comando}\"\n`
          );
          execSync(comando);
          nw.process.stdout.write(
            "=> Actualización contra Migasfree forzada ...\n"
          );
        } catch {
          nw.process.stdout.write(
            "=> Problemas para actualizar contra Migasfree ...\n"
          );
        }
      }
      if (this.Argumentos.length > 0) {
        nw.process.stdout.write(
          "=> Los " +
            this.Argumentos.length +
            " argumentos pasados al ejecutable son: " +
            this.Argumentos +
            "\n"
        );
        nw.process.stdout.write(
          "=> El primer argumento es: " + this.Argumentos[0] + "\n"
        );
      }
      nw.process.stdout.write("=> Vamos a esconder las ventanas ...\n");
      nw.Window.get().close(true);
      //nw.process.exit(codigo)
      nw.App.quit();

      nw.process.stdout.write("=> Aplicación cerrada ...\n");
      //this.win.close()
      //this.exitApp(codigo)
    },
    maximizarWindow() {
      nw.Window.get().maximize();
    },
    openNewWindow(url) {
      console.log(
        "El directorio actual de trabajo es: " + this.currentDirectory
      );
      // You can pass in the same window options that you use in your package.json as well:
      // http://docs.nwjs.io/en/latest/References/Window/#windowopenurl-options-callback
      let options = {
        width: 800,
        height: 600
        //fullscreen: true
      };
      nw.Window.open(url, options, function(win) {
        //win.on('loaded', function () {
        console.log("Se ha abierto una nueva ventana en tu aplicación: " + url);
        //});
      });
    }
  },
  computed: {
    Argumentos() {
      return nw.App.fullArgv;
    },
    settingsFile: function() {
      let path = nw.require("path");
      let settingsFileLocation = path.join(nw.App.dataPath, "settings.json");
      return settingsFileLocation;
    },
    // Para poder hacer referencia desde una template de un componente al objeto "nw":
    nw: function() {
      return nw;
    },
    path() {
      let path = nw.require("path");
      return path;
    },
    gui() {
      let gui = nw.require("gui");
      return gui;
    },
    win() {
      // Get the current window
      // let win = nw.Window.get()
      let win = gui.Window.get();
      return win;
    },
    currentDirectory() {
      return nw.process.cwd();
    }
  }
});
