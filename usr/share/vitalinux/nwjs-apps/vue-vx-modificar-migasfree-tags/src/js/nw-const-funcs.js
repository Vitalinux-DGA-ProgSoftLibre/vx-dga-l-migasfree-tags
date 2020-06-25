// Load native UI library
let gui = require("nw.gui");
let win = gui.Window.get();

// Constantes que usaremos en toda la aplicación:
// Para ejecutar comandos del sistema en modo asíncrono:
const util = require("util");
const miexec = util.promisify(require("child_process").exec);
const spawn = require("child_process").spawn;
// const {
//   spawn
// } = require('child_process');

// Para ejecutar comandos del sistema en modo síncrono:
const { exec } = require("child_process");
const execSync = nw.require("child_process").execSync;

// Función para reemplazar los códigos de color ANSI usados en la salida "echo" de un sistema Linux
function colorReplace(input, replace) {
  var replaceColors = {
    // https://misc.flogisoft.com/bash/tip_colors_and_formatting
    // https://www.w3schools.com/colors/colors_names.asp
    "31": "<span style='color: red;'>",
    "91": "<span style='color: orangered;'>",

    "32": "<span style='color: darkgreen;'>",
    "92": "<span style='color: green ;'>",

    "33": "<span style='color: GoldenRod;'>",
    "93": "<span style='color: gold;'>",

    "34": "<span style='color: MediumBlue;'>",
    "94": "<span style='color: blue;'>",

    "35": "<span style='color: darkmagenta;'>",
    "95": "<span style='color: magenta;'>",

    "36": "<span style='color: darkcyan;'>",
    "96": "<span style='color: cyan;'>",

    "37": "<span style='color: gray;'>",
    "97": "<span style='color: lightgray;'>",

    "1;30": "{*",

    "0": "</span><br>",
  };
  console.log(`==> Vamos a reemplazar el color de: ${input}`);
  if (replace) {
    for (k in replaceColors) {
      //console.log( "\033\[" + k + "m" + replaceColors[ k ] );
      var re = new RegExp("\\033\\[" + k + "m", "g");

      input = input.toString().replace(re, replaceColors[k]);
    }
  } else {
    input = input.toString().replace(/\033\[[0-9;]*m/g, "");
  }
  console.log(`==> Resultado de reemplazar el color de: ${input}`);
  return input;
}

// Mostramos los argumentos de la llamada a la aplicación:
process.stdout.write(
  "=> La lista de argumentos de llamada a la app es: " + gui.App.argv + "\n"
);
// process.stdout.write("=> El primer parámetro es: " + gui.App.argv[0]);

// Indicamos la acción a realizar al darle a la X de la ventana
win.on("close", function () {
  this.hide(); // Pretend to be closed already
  try {
    let comando = "sudo vx-kill-cliente-migasfree";
    nw.process.stdout.write(
      `=> Al salir de la postinstalación se matará a Migasfree: \"${comando}\"\n`
    );
    execSync(comando);
    nw.process.stdout.write("=> Migasfree matado ...\n");
  } catch {
    nw.process.stdout.write("=> Problemas para matar a Migasfree ...\n");
  }
  process.stdout.write("=> Has abortado la aplicación NW.js ...\n");
  console.log("Cerramos la aplicación ... Abortado por el usuario!!");
  //   if (es_post_instalacion()) {
  //     cancelar_post_instalacion();
  //   }
  //   process.exit(252);
  this.close(true);
  gui.App.quit();
});
