Vue.mixin({
  data() {
    return {
      claseinfo: [
        "text-center",
        "font-weight-bold",
        "bg-info",
        "text-white",
        "w-100",
      ],
      connectionStatus: null,
      // keycodes:
      // Numeros (0-9): 48-57
      // Letras minúsculas (a-z): 97-122
      // Letras Mayúsculas (A-Z): 65-90
      // Guión Normal "-": 45 , 189
      // Guión Bajo "_" : 95
      // Punto ".": 46 , 190
      //
      // Un nombre de usuario:
      // 1) Debe empezar por: [a-z]
      // 2) Le puede seguir [a-z], "-", ".", "_"
      caracposiblenombreusu: [
        ...this.rango(97, 122, 1),
        ...this.rango(48, 57, 1),
        45,
        46,
        95,
      ],
    };
  },
  methods: {
    thereIsInternet() {
      if (navigator.onLine) {
        console.log("Ok!! Se ha detectado conexión con Internet");
        this.connectionStatus = true;
      } else {
        console.log("Error!! No se ha detectado conexión con Internet");
        this.connectionStatus = false;
      }
    },
    SoloNumerosyPunto($event) {
      //console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    CheckIp(ip) {
      let re = new RegExp(
        /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/
      );
      return re.test(ip);
    },
    CheckNombreEq($event) {
      console.log($event.keyCode); //keyCodes value
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      // Caracteres Validos para Linux hostnames son los siguientes ASCII(7):
      // a to z, digits from 0 to 9, and the hyphen (-) (longitud entre 1 y 63 caracteres)
      // http://man7.org/linux/man-pages/man7/ascii.7.html
      // Numeros (0-9): 48-57
      // Letras minúsculas (a-z): 97-122
      // Letras Mayúsculas (A-Z): 65-90
      // Guión Normal "-": 45 , 189
      // Guión Bajo "_" : 95
      // Punto ".": 46 , 190
      if (
        !(
          (keyCode >= 97 && keyCode <= 122) ||
          (keyCode >= 48 && keyCode <= 57) ||
          keyCode === 45
        )
      ) {
        $event.preventDefault();
      }
    },
    //const rango = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    rango(start, stop, step) {
      return Array.from(
        {
          length: (stop - start) / step + 1,
        },
        (_, i) => start + i * step
      );
    },
    isValidUsername($event, nombre) {
      // Un nombre de usuario:
      // 1) Debe empezar por: [a-z]
      // 2) Le puede seguir [a-z], "-", ".", "_"
      // let nameRegex = RegExp(/^[a-z][a-z0-9-_,\.]+$/);
      console.log("El nombre hasta ahora: " + nombre);
      // Comprobamos si es el primer caracter:
      let nameRegex;
      if (nombre === null || nombre === "") {
        nameRegex = RegExp(/^[a-z]$/);
      } else {
        nameRegex = RegExp(/^[a-z0-9-_\.]+$/);
      }
      if (!nameRegex.test($event.key)) {
        $event.preventDefault();
      }
    },
  },
});
