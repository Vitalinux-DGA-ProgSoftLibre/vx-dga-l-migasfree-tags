// Load native UI library
let gui = require('nw.gui');
let win = gui.Window.get();

// Constantes que usaremos en toda la aplicación:
// Para ejecutar comandos del sistema en modo asíncrono:
const util = require('util');
const miexec = util.promisify(require('child_process').exec);

// Para ejecutar comandos del sistema en modo síncrono:
const {
  exec
} = require('child_process');
const execSync = nw.require('child_process').execSync;

// Mostramos los argumentos de la llamada a la aplicación:
process.stdout.write("=> La lista de argumentos de llamada a la app es: " + gui.App.argv + "\n");
// process.stdout.write("=> El primer parámetro es: " + gui.App.argv[0]);

// Indicamos la acción a realizar al darle a la X de la ventana
win.on('close', function () {
  this.hide(); // Pretend to be closed already
  try {
    let comando = "sudo vx-kill-cliente-migasfree"
    nw.process.stdout.write(`=> Al salir de la postinstalación se matará a Migasfree: \"${comando}\"\n`)
    execSync(comando)
    nw.process.stdout.write("=> Migasfree matado ...\n")
  } catch {
    nw.process.stdout.write("=> Problemas para matar a Migasfree ...\n")
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
