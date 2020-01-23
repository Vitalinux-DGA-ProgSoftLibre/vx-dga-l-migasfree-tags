// http: //docs.nwjs.io/en/latest/References/Tray/
// Create a tray icon
let tray = new nw.Tray({
  title: "Vitalinux",
  tooltip: "Post-Instalación de Vitalinux",
  icon: "assets/vitalinux-edu.png"
});

// Give it a menu
let menu = new nw.Menu();

let itemChecked = true;

// Create an array of the items to be placed in the menu
let menuItems = [
  // {
  //   type: 'checkbox',
  //   label: 'Checkbox',
  //   checked: itemChecked,
  //   click: function () {
  //     itemChecked = !itemChecked;
  //     console.log(itemChecked);
  //   }
  // },
  // {
  //   type: 'normal',
  //   label: 'Open Dev Tools',
  //   click: function () {
  //     nw.Window.get().showDevTools();
  //   }
  // },
  {
    type: "normal",
    label: "Mostrar App",
    click: function() {
      nw.Window.get().show();
    }
  },
  {
    type: "normal",
    label: "Ocultar App",
    click: function() {
      nw.Window.get().hide();
    }
  },
  {
    type: "separator"
  },
  {
    type: "normal",
    label: "Salir",
    click: function() {
      // Matamos al proceso Migasfree:
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
      nw.Window.get().close();
      nw.App.quit();
      nw.process.stdout.write("=> Aplicación cerrada ...\n");
    }
  }
];

// Append all menu items to the menu
menuItems.forEach(function(item) {
  menu.append(new nw.MenuItem(item));
});

// Place the menu in the tray
tray.menu = menu;
