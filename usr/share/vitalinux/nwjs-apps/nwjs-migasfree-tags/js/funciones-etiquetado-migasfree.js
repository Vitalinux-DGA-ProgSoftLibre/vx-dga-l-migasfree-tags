function mensaje_cancelado_por_usuario() {
    swal({
        title: '¡¡<b>Cancelado</b> por el <i>Usuario</i>!!',
        type: 'info',
        html: 'El proceso ha sido cancelado por el usuario ...',
        confirmButtonText: 'Entendido'
    }).then(function(result) {
        process.exit(1);
        console.log("1");
        // Quit current app
        gui.App.quit();
    });
}

function cancelar_post_instalacion() {
    var execSync = require('child_process').execSync;
    try {
        return execSync("sudo vx-cancelar-postinstalacion");
    } catch (err) {
        mensaje_cancelado_por_usuario();
    }
}

function guardar_temporalmente_etiquetas() {
    var execSync = require('child_process').execSync;
    try {
        return execSync("sudo migasfree-tags -g | sudo tee /tmp/migasfree.tags");
    } catch (err) {
        mensaje_error_conexion();
    }
}

function escribir_tags(listado_etiquetas) {
    var fs = require('fs');
    fs.open('/var/tmp/migasfree/tags.conf', 'w', function(err, fd) {
        if (err) throw err;
        var buf = new Buffer(listado_etiquetas);
        fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
            if (err) throw err;
            console.log(err, written, buffer);
            fs.close(fd, function() {
                console.log('Done');
            });
        });
    });
}

function es_post_instalacion() {

    var ruta = "/var/tmp/migasfree/first-tags.conf";
    var fs = require('fs');
    if (fs.existsSync(ruta)) {
        process.stdout.write("=> Existe el archivo: " + ruta + "\n");
        return true;
    } else {
        process.stdout.write("=> NO Existe el archivo: " + ruta + "\n");
        return false;
    }

    /*
    const fs = require('fs');
    fs.stat('/var/tmp/migasfree/first-tags.conf', function(err, stat) {
        if (err == null) {
            process.stdout.write("=> Existe el archivo: /var/tmp/migasfree/first-tags.conf\n");
            return true;
        } else {
            process.stdout.write("=> NO Existe el archivo: /var/tmp/migasfree/first-tags.conf\n");
            return false;
        }

    });
    */
}

function consultar_etiquetado_migasfree(lista_etiquetas_actuales) {
    if (lista_etiquetas_actuales.toString().length == 0) {
        // En caso de no aa ver seleccionado ninguna etiqueta se indicará de esta forma:
        var etiquetas_resultantes = "-- Ninguna Etiqueta Asignada --";
    } else {
        var etiquetas_resultantes = lista_etiquetas_actuales.toString();
    }
    swal({
        title: '<b>Etiquetado <i>Migasfree</i></b>',
        type: 'info',
        html: 'El listado actual de las <b>Etiquetas Migasfree</b> de este equipo es: <br><br>' + etiquetas_resultantes,
        confirmButtonText: 'Entendido',
        showCancelButton: true,
        cancelButtonText: 'Modificar Etiquetado'
    }).then(function(result) {
        cerrar_aplicacion();
    }, function(dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {
            check_usuario("");
        } else {
            consultar_etiquetado_migasfree(lista_etiquetas_actuales);
        }
    });
}

function mensaje_error_conexion() {
    swal({
        title: '¡¡<b>Problemas</b> con el servidor <i>Migasfree</i>!!',
        type: 'info',
        html: 'Las razones pueden ser: <br><br><ol><li><b>No hay conexión</b> con <b>Internet</b></li><li>El <b>servidor Migasfree</b> esta <b>caído</b></li><li><b>No has realizado la post-instalación</b> y <b>el equipo nunca se ha registrado</b> contra migasfree</li>',
        confirmButtonText: 'Entendido'
    }).then(function(result) {
        process.exit(1);
        console.log("1");
        // Quit current app
        gui.App.quit();
    });
}

function etiquetas_migasfree_disponibles() {
    var execSync = require('child_process').execSync;
    try {
        // La opción "-a" del migasfree-tags esta disponible a partir de la versión migasfree-client 4.13
        return execSync("sudo migasfree-tags -a");
    } catch (err) {
        mensaje_error_conexion();
    }

}

// Devolvemos un string o cadena de caracteres con el listado de etiquetas asignadas al equipo separadas por coma ","
function etiquetas_migasfree_seleccionadas() {
    var execSync = require('child_process').execSync;
    try {
        return execSync("sudo migasfree-tags -g | sed -e 's/\"//g' | sed -e 's/ /,/g'");
    } catch (err) {
        mensaje_error_conexion();
    }

}

function aplicar_etiquetas_migasfree(cambio_de_etiquetas, listado_etiquetas, post_instalacion) {

    // Creamos un Array con todos los argunmentos necesarios para ejectutar el comando "sudo" necesario:
    // sudo migasfree-tags [-c|-s] <listado de etiquetas>
    var args_recibidos = arguments[1].split(',');
    var args_comando = [];
    if (post_instalacion == "NO") {
        args_comando = ['migasfree-tags', '-s'];
    } else {
        args_comando = ['migasfree-tags', '-c'];
    }
    var args_totales = [...args_comando, ...args_recibidos];
    //process.stdout.write("parametros: -" + args_totales + "-");

    // Comprobamos si ha habido un cambio en el etiquetado migasfree, para actuar en consecuencia
    if (cambio_de_etiquetas.toString() == "SI") {

        var spawn = require('child_process').spawn;
        try {
            const { spawn } = require('child_process');


            //const migasfree = spawn('sudo', ['migasfree-tags', '-s', 'CEN-CIFEMA', 'CEN-CIFEMA.SALASINF', 'ENT-PROFESOR']);
            const migasfree = spawn('sudo', args_totales);

            $('#logresultado2').html('');
            var data = "";
            var salida = "El resultado de la actualización de etiquetas es el siguiente: <br>"
            migasfree.stdout.on('data', (data) => {
                if (data) {
                    // sed -r 's/'$(echo -e "\033")'\[[0-9]{1,2}(;([0-9]{1,2})?)?[mK]//g'
                    // Data es un objeto que habrá que pasar a String para poder reemplazar el código de colores. Para ello:
                    // 1) Se le puede pasar directamente el objeto "data" y en la función colorReplace hacer uso de .toString()
                    // 2) Se le pasa directamente "data" en formato String haciendo uso de `${data}`
                    //salida = colorReplace(`${data}`, true);
                    salida = colorReplace(data, true);
                }
                salida += `<br>`;
                // Generamos la salida añadiendo a lo que ya había, ya que va escupiendo datos "data" a medida que migasfree-tags los va generando
                $('#logresultado2').append(`${salida}`);

                // Animamos la división para que el scroll se desplace automáticamente teniendo en cuenta
                //   la altura de su contenido con $('#logresultado2')[0].scrollHeight
                $('#logresultado2').scroll();
                $("#logresultado2").animate({
                    scrollTop: $('#logresultado2')[0].scrollHeight
                }, 'fast', function() {

                });

            });
            migasfree.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });
            migasfree.on('close', (code) => {
                //swal("Terminado!!", "Se ha terminado!!", "error");
                guardar_temporalmente_etiquetas();
                if (post_instalacion == "NO") {
                    var titulo = "¡¡Termino la Comunicación con Migasfree!!";
                    var texto = "Ya ha terminado el proceso de asignación de Etiquetas Migasfree al Equipo.  Sería aconsejable que le echaras un ojo al proceso de comunicación por si se hubieran producido errores o avisos ...";

                    mensaje_salida(titulo, texto, "NO");
                } else {
                    cerrar_aplicacion();
                }

            });

        } catch (err) {
            swal("¡¡Cancelado!!", "¡¡Problema con la actualización de etiquetas!!", "error");
        }
    } else {
        $('#logresultado2').html(arguments[1].toString());
        if (post_instalacion == "NO") {
            var titulo = "Sin cambios en el Etiquetado Migasfree";
            var texto = arguments[1].toString();
            mensaje_salida(titulo, texto, "SI");
        } else {
            cerrar_aplicacion();
        }
    }
}

function asignar_etiquetas_migasfree() {
    //Comprobamos si estamos en un proceso post-instalación para evitar mostrar mensajes
    var post_instalacion = "";
    var cambio_de_etiquetas = arguments[0].toString();
    var listado_etiquetas = arguments[1].toString();

    if (es_post_instalacion()) {
        post_instalacion == "SI";
        process.stdout.write("=> Estamos en la post-instalación: evitaremos mensajes innecesarios ...\n");
        console.log('Estamos en la post-instalación ...');
        aplicar_etiquetas_migasfree(cambio_de_etiquetas, listado_etiquetas, post_instalacion);
    } else {
        post_instalacion = "NO";
        process.stdout.write("=> NO estamos en la post-instalación de Vitalinux ...\n");
        aplicar_etiquetas_migasfree(cambio_de_etiquetas, listado_etiquetas, post_instalacion);
    }

    /*
    const fs = require('fs');
    fs.stat('/var/tmp/migasfree/first-tags.conf', function(err, stat) {
        if (err == null) {
            post_instalacion = "SI";
            process.stdout.write("=> Estamos en la post-instalación: evitaremos mensajes innecesarios ...\n");
            console.log('Estamos en la post-instalación ...');
            aplicar_etiquetas_migasfree(cambio_de_etiquetas, listado_etiquetas, post_instalacion);
        } else {
            post_instalacion = "NO";
            process.stdout.write("=> NO estamos en la post-instalación de Vitalinux ...\n");
            aplicar_etiquetas_migasfree(cambio_de_etiquetas, listado_etiquetas, post_instalacion);
        }

    });
    */



}

function accion_boton_aplicar_etiquetado_migasfree() {
    process.stdout.write("=> El listado de etiquetas seleccionadas es: " + etiquetas_seleccionadas.toString().replace(/,/g, " ") + "\n\n");
    //process.stdout.write("\n\nsudo migasfree-tags -s $(echo " + etiquetas_seleccionadas.toString() + " | sed -e 's/,/ /g')\n\n");

    var mis_etiquetas_ordenadas = mis_etiquetas.split(',').sort();
    var etiquetas_seleccionadas_ordenadas = etiquetas_seleccionadas.sort();

    process.stdout.write("=> Comprobamos el etiquetado, y si no hay cambios no hacemos nada:\n");
    process.stdout.write("==> Las etiquetas iniciales eran: '" + mis_etiquetas_ordenadas.toString() + "'\n");
    process.stdout.write("==> Las etiquetas finales son: '" + etiquetas_seleccionadas_ordenadas.toString() + "'\n");

    if (etiquetas_seleccionadas_ordenadas.toString().length == 0) {
        // En caso de no aa ver seleccionado ninguna etiqueta se indicará de esta forma:
        var etiquetas_resultantes = "-- Ninguna Etiqueta Seleccionada --";
    } else {
        var etiquetas_resultantes = etiquetas_seleccionadas_ordenadas.toString();
    }
    swal({
        title: "Asignación de Etiquetas Migasfree",
        imageUrl: '../images/migasfree.png',
        imageWidth: 80,
        imageHeight: 60,
        imageAlt: 'Migasfree Tags',
        html: "Por favor, confirma que este es tu <b>listado de etiquetas <i>Migasfree</i></b> deseado: <br><br><b>" + etiquetas_resultantes + "</b>",
        //type: 'success',
        showCancelButton: true,
        confirmButtonText: 'Aplicar',
        cancelButtonText: 'Volver',
        timer: 15000,
    }).then(function() {
        console.log(etiquetas_seleccionadas.toString());
        $('#contenedor').hide('slow', function() {

        });
        $('.botonera2').show('slow', function() {

        });
        $('.logresultado').show('slow', function() {

        });
        if (mis_etiquetas_ordenadas.toString() != etiquetas_seleccionadas_ordenadas.toString()) {
            process.stdout.write("=> Hay un cambio de etiquetado así asignaremos las nuevas etiquetas al equipo ...\n");
            asignar_etiquetas_migasfree("SI", etiquetas_seleccionadas.toString());
        } else {
            process.stdout.write("=> NO hay cambio en el etiquetado migasfree ...\n");
            asignar_etiquetas_migasfree("NO", "<b>No hay cambio</b> en el <b>Etiquetado Migasfree</b> ...<br>Por tanto, no haremos nada ...");
        }
    })
}

//if LISTADO=$(sudo migasfree-tags -g) &> /dev/null ; then echo "El listado es: $LISTADO" ; else echo noooo ; fi
