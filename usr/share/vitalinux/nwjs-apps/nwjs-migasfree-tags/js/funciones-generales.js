function check_usuario(texto_previo) {
    var texto = "";
    if ( texto_previo != "") {
        texto = "<span style='color=red'>" + texto_previo + "</span><br>" +
            "Es necesario ser usuario <b>Administrador</b> para modificar las etiquetas Migasfree:";
    }
    else {
        texto = "Es necesario ser usuario <b>Administrador</b> para modificar las etiquetas Migasfree:";
    }
    swal({
        title: 'Autenticación Usuario',
        html: texto +
            '<br><br>' +
            '<input type="text" id="swal-input1" class="form-control" placeholder="Nombre del Usuario" autofocus="autofocus">' +
            '<br>' +
            '<input type="password" id="swal-input2" class="form-control" placeholder="Password o Contraseña">',
        showCancelButton: true,
        //confirmButtonColor: '#3085d6',
        //cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: function() {
            return new Promise(function(resolve) {
                resolve([
                    $('#swal-input1').val(),
                    $('#swal-input2').val()
                ])
            })
        }
    }).then(function(result) {
        //swal(JSON.stringify(result))
        var execSync = require('child_process').execSync;
        try {
            execSync("sudo /usr/bin/vx-check_usuario_admin " + document.getElementById('swal-input1').value + " " + document.getElementById('swal-input2').value)
            //swal("Perfecto", "todo Ok: " + document.getElementById('swal-input1').value + " " + document.getElementById('swal-input2').value, "success");
            //$('#auth').text("yes");
        } catch (err) {
            //$('#auth').text("");
            //swal("Error!!", "Ha fallado la autenticación del Usuario ...", "error");
            check_usuario("<b>Error!!</b> Ha fallado la autenticación del usuario ...");
        }
    }, function(dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel' || dismiss === 'close') {
            cerrar_aplicacion();
        } else {
            check_usuario("");
        }
    }).catch(swal.noop);
}

function cerrar_aplicacion() {
    //console.log(`Terminando con código de salida: ${code}`);
    //process.stdout.write(`Terminando con código de salida: ${code}`);
    process.exit(0);
    // Quit current app
    gui.App.quit();
}

function cerrar_aplicion_con_mensaje_y_error(codigo_salida, titulo, texto) {
    swal({
        title: titulo,
        //type: 'error',success,warning,info,question
        type: 'error',
        html: texto,
        confirmButtonText: 'Cerrar'
    }).then(function(result) {
        process.exit(codigo_salida);
        // Quit current app
        gui.App.quit();
    }, function(dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        //if (dismiss === 'cancel') {

        //}
        process.exit(codigo_salida);
        // Quit current app
        gui.App.quit();
    });
}

function consultar_usuario_whoami() {
    var execSync = require('child_process').execSync;
    try {
        // Consultamos que usuario esta lanzando la aplicación
        var usuario = execSync("whoami");
        if (usuario != "root") {
            var codigo = 250;
            var titulo = "¡¡No tienes Privilegios!!";
            var texto = "Debes lanzar la aplicación como usuario <b>root</b> para poder alterar el <b>Etiquetado Migasfree</b> del equipo ...";

            cerrar_aplicion_con_mensaje_y_error(codigo, titulo, texto);
        }
    } catch (err) {
        var codigo = 253;
        var titulo = "¡¡Problemas de Comprobación!!";
        var texto = "No se ha podido comprobar el <b>usuario del sistema</b> que esta haciendo uso de la aplicación.<br>Lo sentimos, no vas a poder hacer uso de ella ...";
        cerrar_aplicion_con_mensaje_y_error(codigo, titulo, texto);
    }

}

// Función sleep equivalente a la del sistema Linux
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Función para reemplazar los códigos de color ANSI usados en la salida "echo" de un sistema Linux
var colorReplace = function(input, replace) {
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

        "0": "</span><br>"
    };

    if (replace) {
        for (k in replaceColors) {
            //console.log( "\033\[" + k + "m" + replaceColors[ k ] );
            var re = new RegExp("\\033\\[" + k + "m", "g");

            input = input.toString().replace(re, replaceColors[k]);
        }
    } else {
        input = input.toString().replace(/\033\[[0-9;]*m/g, "");
    }

    return input;
};

function mensaje_salida(titulo, texto, cerrar) {
    var mis_etiquetas_actualizadas = etiquetas_migasfree_seleccionadas().toString().trim();
    var texto_etiquetas = "Etiquetado Actual: <br><b>" + mis_etiquetas_actualizadas + "</b>.<br><br>";
    swal({
        title: titulo,
        //text: texto_etiquetas + texto,
        html: texto_etiquetas + texto,
        type: 'success',
        //showCancelButton: true,
        //confirmButtonColor: '#3085d6',
        //cancelButtonColor: '#d33',
        confirmButtonText: 'Cerrar',
        //cancelButtonText: 'No, cancel!',
        //confirmButtonClass: 'btn btn-success',
        //cancelButtonClass: 'btn btn-danger',
        //buttonsStyling: false
        timer: 15000,
    }).then(function() {
        // Evitamos cerrar la ventana en el caso de que quiera comprobar errores o Warnings en la salida
        // del comando migasfree-tags -s
        if (cerrar.toString() == "SI") {
            cerrar_aplicacion();
        } else {
            //$('.cancelar').html="<i class='fa fa-window-close' aria-hidden='true'></i>&nbsp;Cerrar";
            $('#botoncancelar1').html('<p class="img-rounded cerrar" id="cerrar">' +
                '<i class="fa fa-window-close" aria-hidden="true"></i>' +
                '&nbsp;Cerrar' +
                '</p>');
            $(".cerrar").click(function(event) {
                cerrar_aplicacion();
            });
            //$('.cancelar').css("background-color", "green");
        }

    }, function(dismiss) {
        // dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
        if (dismiss === 'cancel') {

        }
        if (dismiss === 'timer') {
            cerrar_aplicacion();
        }

    })

}
