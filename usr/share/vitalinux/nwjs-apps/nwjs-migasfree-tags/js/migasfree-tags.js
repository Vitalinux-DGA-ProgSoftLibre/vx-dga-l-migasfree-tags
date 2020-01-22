// Load native UI library
var gui = require('nw.gui');

// Mostramos los argumentos de la llamada a la aplicación:
process.stdout.write("=> La lista de argumentos de llamada a la app es: " + gui.App.argv);
// process.stdout.write("=> El primer parámetro es: " + gui.App.argv[0]);

var win = gui.Window.get();

// Indicamos la acción a realizar al darle a la X de la ventana
win.on('close', function () {
    this.hide(); // Pretend to be closed already
    process.stdout.write("=> Has abortado el proceso de asignación de etiquetas ...\n");
    console.log("Cerramos la aplicación ... Abortado por el usuario!!");
    if (es_post_instalacion()) {
        cancelar_post_instalacion();
    }
    process.exit(252);
    this.close(true);
    gui.App.quit();
});

// En el caso de que estemos en una post-insatalación el botón "Cancelar" indicará "Salir de la Post-Instalación"
if (es_post_instalacion()) {
    $('.cancelar').html('<i class="fa fa-window-close" aria-hidden="true"></i>' +
        '&nbsp;Salir de la Post-Instalación');
    $(".cerrar").click(function (event) {
        cerrar_aplicacion();
    });
}

$(function () {
    $(".preload").fadeOut(2000, function () {
        $(".content").fadeIn(1000);
    });
})

$body = $("body");

$(document).on({
    ajaxStart: function () {
        $body.addClass("loading");
    },
    ajaxStop: function () {
        $body.removeClass("loading");
    }
});

// Comprobamos las etiquetas migasfree que hay disponibles en el servidor para el equipo
var obj_etiquetas_migasfree = JSON.parse(etiquetas_migasfree_disponibles());

//Comprobamos las etiquetas que tiene inicialmente asignadas el equipo
var mis_etiquetas = etiquetas_migasfree_seleccionadas().toString().trim();

//escribir_tags(mis_etiquetas);

if (gui.App.argv[0] == "consultar-etiquetas") {
    consultar_etiquetado_migasfree(mis_etiquetas);
} else {
    // Comprobamos si es el usuario root quien ha lanzado la aplicación
    // consultar_usuario_whoami();
    if (!es_post_instalacion()) {
        process.stdout.write("=> NO nos encontramos en la post-instalación: Se chequeará al usuario ...\n");
        check_usuario("");
    } else {
        process.stdout.write("=> Nos encontramos en la post-instalación: No se chequeará al usuario ...\n");
    }
}

if (mis_etiquetas.length == 0) {
    process.stdout.write("=> El equipo no tiene ninguna Etiqueta Migasfree asignada ...");
} else {
    process.stdout.write("=> Listado de Etiquetas Migasfree del equipo: " + mis_etiquetas + "\n");
}

/* Pruebas locales (sin conexión a Internet/Migasfree): */
//var etiquetas-disponibles='{"SBR": ["SBR-SOFTEDUCATIVO"], "SERVICIO": ["SRV-CARPERTASCOMPARTIDAS", "SRV-CONGELARESCRITORIO", "SRV-CONGELADORTOTAL", "SRV-CONTROL-EQUIPOS-CLIENTE", "SRV-CONTROL-EQUIPOS-SERVIDOR", "SRV-NAVEGADORINCOGNITO"], "PRIMARIA": ["PRI-ALCORISA.PORTATIL.ECOMUNES", "PRI-ALCORISA.PORTATIL.PROFES", "PRI-ALCORISA.SOBREMESA.AULA.ALUMNOS", "PRI-ALCORISA.SOBREMESA.AULA.PROFES", "PRI-ALCORISA.SOBREMESA.ECOMUNES", "PRI-ALCORISA.SOBREMESA.INFANTIL", "PRI-ALCORISA.TABLETPC.INFORMATICA", "PRI-ALCORISA.TABLETPC.RADIO", "PRI-ALCORISA.TABLETPC.SACTOS", "PRI-ALPARTIR", "PRI-ANTONIOBELTRAN", "PRI-ANTONIOBELTRAN.INFANTIL", "PRI-ANTONIOBELTRAN.INFORMATICA", "PRI-ANTONIOBELTRAN.TABLETS", "PRI-ARAGONDEALAGON", "PRI-ARAGONMONZON", "PRI-ARAGONMONZON.INFORMATICA", "PRI-ARAGONMONZON.ALUMNOS", "PRI-CALISTOARINO", "PRI-CANDIDODOMINGO", "PRI-CANDIDODOMINGO.PCSAULA", "PRI-CANDIDODOMINGO.SALAINF", "PRI-CATALINADEARAGON", "PRI-CIUDADZARAGOZA", "PRI-CRABAJOGALLEGO", "PRI-EMILIODIAZ", "PRI-EMILIODIAZ.1CICLO", "PRI-EMILIODIAZ.2CICLO", "PRI-EMILIODIAZ.3CICLO", "PRI-EMILIODIAZ.AULAINFORMATICA", "PRI-EMILIODIAZ.TABLETS", "PRI-EMILIODIAZ.ZONASCOMUNES", "PRI-ELOPEZ", "PRI-ELOPEZ.ALUMNOS", "PRI-ELOPEZ.PROFESORES", "PRI-FLORENCIOJARDIEL", "PRI-FLORIANREY", "PRI-GILTARIN", "PRI-JERONIMOBLANCAS", "PRI-JUANPABLOBONET", "PRI-JUANPABLOBONET.MINIS", "PRI-JUANPABLOBONET.PCSAULA.INFANTIL", "PRI-JUANPABLOBONET.PCSAULA.PRIMARIA", "PRI-JUANPABLOBONET.SALAPROF", "PRI-JUANPABLOBONET.PCSAULA", "PRI-RAMONSAINZVARANDA.INFANTIL", "PRI-RAMONSAINZVARANDA", "PRI-VIRGENDELPORTAL.MINIS", "PRI-VIRGENDELPORTAL.SOBREMESA", "PRI-EMILIODIAZ.INFANTIL", "PRI-RAMONYCAJAL-PINADEEBRO"], "CPEPA": ["CPA-BAJOCINCA", "CPA-BAJOCINCA.AULAINF", "CPA-BAJOCINCA.PCSAULA", "CPA-CASADELCANAL", "CPA-CASADELCANAL.INFORMATICA", "CPA-CASADELCANAL.PCSAULA", "CPA-CUENCAMINERA.ALUMNADO.MONTALBAN", "CPA-CUENCAMINERA.ALUMNADO.UTRILLAS", "CPA-CUENCAMINERA.AULAMENTOR.MONTALBAN", "CPA-CUENCAMINERA.AULAMENTOR.UTRILLAS", "CPA-CUENCAMINERA.CONVENIOS", "CPA-CUENCAMINERA.DIRECCION", "CPA-RIBAGORZA", "CPA-RIBAGORZA.BENABARRE", "CPA-RIBAGORZA.CASTEJON", "CPA-RIBAGORZA.GRAUS", "CPA-RIBAGORZA.GRAUS.DIRECCION", "CPA-RIBAGORZA.GRAUS.ESPANOL", "CPA-RIBAGORZA.GRAUS.SALAINFOR", "CPA-RIBAGORZA.PCSPROFESOR", "CPA-RIBAGORZA.TG"], "SECUNDARIA": ["SEC-STEMERECIANA.TEC", "SEC-MIGUELSERVET.2ESO.CARROS.3", "SEC-MIGUELSERVET.2ESO.CARROS.5", "SEC-MIGUELSERVET.2ESO.CARROS.6", "SEC-MIGUELSERVET.3ESO.CARROS", "SEC-MIGUELSERVET", "SEC-IESALCORISA", "SEC-ALMUDEVAR.MINIS", "SEC-ALMUDEVAR.PCSAULA", "SEC-IESAVEMPACE", "SEC-IESAVEMPACE.INFORMATICA", "SEC-IESAVEMPACE.MINIS", "SEC-AZUCARERA.AULASINF", "SEC-AZUCARERA.AULASINF.INF1", "SEC-AZUCARERA.AULASINF.INF2", "SEC-AZUCARERA.AULASINF.INF3", "SEC-AZUCARERA.AULASINF.INF4", "SEC-AZUCARERA.AULASINF.INF5", "SEC-AZUCARERA.AULASINF.PROF", "SEC-AZUCARERA.DPTOS", "SEC-AZUCARERA.MINIS", "SEC-AZUCARERA.PCSAULA", "SEC-AZUCARERA.SPROF", "SEC-LUISBUNUEL.AULAINF", "SEC-CORONADEARAGON", "SEC-CORONADEARAGON.MINIS", "SEC-CORONADEARAGON.MINIS.TEC", "SEC-CORONADEARAGON.PCSAULA", "SEC-DOMINGOMIRAL", "SEC-GALLICUM", "SEC-GOYA", "SEC-GOYA.MINIS", "SEC-GOYA.AULAS", "SEC-GOYA.SALASPROF", "SEC-GUDARJAVALAMBRE", "SEC-ITACA", "SEC-ITACA.AULASINF", "SEC-ITACA.EDUCAFISICA", "SEC-ITACA.MINIS", "SEC-ITACA.PCSAULA", "SEC-ITACA.TUTORES", "SEC-JERONIMOZURITA", "SEC-LUISBUNUEL", "SEC-LUISBUNUEL.AULAGRUPO", "SEC-LUISBUNUEL.MINIPORTATILES", "SEC-LUISBUNUEL.DOMINIO", "SEC-VALLEHUECHA", "SEC-VALLEHUECHA.AULAINF", "SEC-VALLEHUECHA.MINIS", "SEC-MEDINAALBAIDA", "SEC-MEDINAALBAIDA.INFORMATICA1", "SEC-MIGUELCATALAN", "SEC-MIGUELDEMOLINOS", "SEC-MIGUELDEMOLINOS.MINIS", "SEC-MIGUELSERVET.1ESO.CARROS.1", "SEC-MIGUELSERVET.1ESO.CARROS.2", "SEC-MIGUELSERVET.1ESO.CARROS.4", "SEC-MIGUELSERVET.3ESO.CARROS.7", "SEC-MIGUELSERVET.3ESO.CARROS.8", "SEC-MIGUELSERVET.3ESO.CARROS.9", "SEC-MIGUELSERVET.BIBLIOTECA.CARROS.10", "SEC-MIGUELSERVET.AULAINF1", "SEC-MIGUELSERVET.AULAINF2", "SEC-MIGUELSERVET.1ESO.CARROS", "SEC-MIGUELSERVET.2ESO.CARROS", "SEC-MIGUELSERVET.BIBLIOTECA.CARROS", "SEC-MIGUELSERVET.RAMONYCAJAL", "SEC-MIRALBUENO", "SEC-MIRALBUENO.MINIS", "SEC-PABLOSERRANO", "SEC-PABLOSERRANO.MINIS", "SEC-PABLOSERRANO.PCSAULA", "SEC-PEDRODELUNA", "SEC-PEDRODELUNA.AULA", "SEC-PEDRODELUNA.BIBLIO", "SEC-PEDRODELUNA.INFORMATICA", "SEC-PEDRODELUNA.MINI", "SEC-PIRAMIDE", "SEC-PIRAMIDE.ALUMNOS", "SEC-PIRAMIDE.PROFESORES", "SEC-PIRAMIDE.ALUMNOS.MUSICA", "SEC-RAMONPIGNATELLI", "SEC-RAMONPIGNATELLI.MINIS", "SEC-RIOGALLEGO", "SEC-RIOGALLEGO.AULASINF", "SEC-RIOGALLEGO.MINIS", "SEC-RIOGALLEGO.PCSPROFESOR", "SEC-RODANAS", "SEC-RODANAS.MINIS", "SEC-RODANAS.PCSAULA", "SEC-RODANAS.TECNOLOGIA", "SEC-SANALBERTO", "SEC-SANALBERTO.ADMINISTRACION", "SEC-SANALBERTO.MINIS", "SEC-SANALBERTO.PCSAULA", "SEC-SANALBERTO.PROFESORES", "SEC-SANALBERTO.AULASINF.1", "SEC-SANALBERTO.AULASINF.2", "SEC-SANALBERTO.TECNOLOGIA", "SEC-STEMERECIANA", "SEC-STEMERECIANA.MINIS", "SEC-SANTIAGOHERNANDEZ", "SEC-SANTIAGOHERNANDEZ.AULAS", "SEC-SANTIAGOHERNANDEZ.AULAS20", "SEC-SANTIAGOHERNANDEZ.DEPARTAMENTOS", "SEC-SIERRADEGUARA", "SEC-SIGLOXXI-PEDROLA", "SEC-TORREDELOSESPEJOS", "SEC-TORREDELOSESPEJOS.AULAMUSICA", "SEC-TORREDELOSESPEJOS.PCSAULA.BACH", "SEC-TORREDELOSESPEJOS.PCSAULA.ESO", "SEC-TORREDELOSESPEJOS.AULAINFOR1", "SEC-TORREDELOSESPEJOS.AULAINFOR2", "SEC-TORREDELOSESPEJOS.PCSAULA", "SEC-TUBALCAIN", "SEC-TUBALCAIN.AULAINF", "SEC-TUBALCAIN.LAB", "SEC-TUBALCAIN.CARROS", "SEC-TUBALCAIN.CARROS.0", "SEC-TUBALCAIN.CARROS.1", "SEC-TUBALCAIN.CARROS.1TEC", "SEC-TUBALCAIN.CARROS.2", "SEC-TUBALCAIN.CARROS.2TEC", "SEC-TUBALCAIN.CARROS.LATIN", "SEC-TUBALCAIN.PCSAULA", "SEC-TUBALCAIN.PCSAULA.BACH", "SEC-TUBALCAIN.PCSAULA.ESO", "SEC-VIRGENDELPILAR", "SEC-VIRGENDELPILAR.PCSAULA", "SEC-VIRGENDELPILAR.TECNOLOGIA", "SEC-SANALBERTO.AULASINF", "SEC-ALMUDEVAR"], "CENTRO": ["CEN-CAREI", "CEN-CIFE2", "CEN-CIFEMA", "CEN-CIFEMA.SALASINF", "CEN-CIFEMA.SALASINF.1"], "CRA": ["CRA-ALGARS", "CRA-LALBADA-BUJARALOZ", "CRA-ORBAMUEL.TABLETS"], "PERFIL": ["PER-AULARAGON"], "ENTORNO": ["ENT-ALUMNO", "ENT-PROFESOR", "ENT-CASA"]}';
//var obj_etiquetas_migasfree = JSON.parse('{"SBR": ["SBR-SOFTEDUCATIVO"], "SERVICIO": ["SRV-CARPERTASCOMPARTIDAS", "SRV-CONGELARESCRITORIO", "SRV-CONGELADORTOTAL", "SRV-CONTROL-EQUIPOS-CLIENTE", "SRV-CONTROL-EQUIPOS-SERVIDOR", "SRV-NAVEGADORINCOGNITO"], "PRIMARIA": ["PRI-ALCORISA.PORTATIL.ECOMUNES", "PRI-ALCORISA.PORTATIL.PROFES", "PRI-ALCORISA.SOBREMESA.AULA.ALUMNOS", "PRI-ALCORISA.SOBREMESA.AULA.PROFES", "PRI-ALCORISA.SOBREMESA.ECOMUNES", "PRI-ALCORISA.SOBREMESA.INFANTIL", "PRI-ALCORISA.TABLETPC.INFORMATICA", "PRI-ALCORISA.TABLETPC.RADIO", "PRI-ALCORISA.TABLETPC.SACTOS", "PRI-ALPARTIR", "PRI-ANTONIOBELTRAN", "PRI-ANTONIOBELTRAN.INFANTIL", "PRI-ANTONIOBELTRAN.INFORMATICA", "PRI-ANTONIOBELTRAN.TABLETS", "PRI-ARAGONDEALAGON", "PRI-ARAGONMONZON", "PRI-ARAGONMONZON.INFORMATICA", "PRI-ARAGONMONZON.ALUMNOS", "PRI-CALISTOARINO", "PRI-CANDIDODOMINGO", "PRI-CANDIDODOMINGO.PCSAULA", "PRI-CANDIDODOMINGO.SALAINF", "PRI-CATALINADEARAGON", "PRI-CIUDADZARAGOZA", "PRI-CRABAJOGALLEGO", "PRI-EMILIODIAZ", "PRI-EMILIODIAZ.1CICLO", "PRI-EMILIODIAZ.2CICLO", "PRI-EMILIODIAZ.3CICLO", "PRI-EMILIODIAZ.AULAINFORMATICA", "PRI-EMILIODIAZ.TABLETS", "PRI-EMILIODIAZ.ZONASCOMUNES", "PRI-ELOPEZ", "PRI-ELOPEZ.ALUMNOS", "PRI-ELOPEZ.PROFESORES", "PRI-FLORENCIOJARDIEL", "PRI-FLORIANREY", "PRI-GILTARIN", "PRI-JERONIMOBLANCAS", "PRI-JUANPABLOBONET", "PRI-JUANPABLOBONET.MINIS", "PRI-JUANPABLOBONET.PCSAULA.INFANTIL", "PRI-JUANPABLOBONET.PCSAULA.PRIMARIA", "PRI-JUANPABLOBONET.SALAPROF", "PRI-JUANPABLOBONET.PCSAULA", "PRI-RAMONSAINZVARANDA.INFANTIL", "PRI-RAMONSAINZVARANDA", "PRI-VIRGENDELPORTAL.MINIS", "PRI-VIRGENDELPORTAL.SOBREMESA", "PRI-EMILIODIAZ.INFANTIL", "PRI-RAMONYCAJAL-PINADEEBRO"], "CPEPA": ["CPA-BAJOCINCA", "CPA-BAJOCINCA.AULAINF", "CPA-BAJOCINCA.PCSAULA", "CPA-CASADELCANAL", "CPA-CASADELCANAL.INFORMATICA", "CPA-CASADELCANAL.PCSAULA", "CPA-CUENCAMINERA.ALUMNADO.MONTALBAN", "CPA-CUENCAMINERA.ALUMNADO.UTRILLAS", "CPA-CUENCAMINERA.AULAMENTOR.MONTALBAN", "CPA-CUENCAMINERA.AULAMENTOR.UTRILLAS", "CPA-CUENCAMINERA.CONVENIOS", "CPA-CUENCAMINERA.DIRECCION", "CPA-RIBAGORZA", "CPA-RIBAGORZA.BENABARRE", "CPA-RIBAGORZA.CASTEJON", "CPA-RIBAGORZA.GRAUS", "CPA-RIBAGORZA.GRAUS.DIRECCION", "CPA-RIBAGORZA.GRAUS.ESPANOL", "CPA-RIBAGORZA.GRAUS.SALAINFOR", "CPA-RIBAGORZA.PCSPROFESOR", "CPA-RIBAGORZA.TG"], "SECUNDARIA": ["SEC-STEMERECIANA.TEC", "SEC-MIGUELSERVET.2ESO.CARROS.3", "SEC-MIGUELSERVET.2ESO.CARROS.5", "SEC-MIGUELSERVET.2ESO.CARROS.6", "SEC-MIGUELSERVET.3ESO.CARROS", "SEC-MIGUELSERVET", "SEC-IESALCORISA", "SEC-ALMUDEVAR.MINIS", "SEC-ALMUDEVAR.PCSAULA", "SEC-IESAVEMPACE", "SEC-IESAVEMPACE.INFORMATICA", "SEC-IESAVEMPACE.MINIS", "SEC-AZUCARERA.AULASINF", "SEC-AZUCARERA.AULASINF.INF1", "SEC-AZUCARERA.AULASINF.INF2", "SEC-AZUCARERA.AULASINF.INF3", "SEC-AZUCARERA.AULASINF.INF4", "SEC-AZUCARERA.AULASINF.INF5", "SEC-AZUCARERA.AULASINF.PROF", "SEC-AZUCARERA.DPTOS", "SEC-AZUCARERA.MINIS", "SEC-AZUCARERA.PCSAULA", "SEC-AZUCARERA.SPROF", "SEC-LUISBUNUEL.AULAINF", "SEC-CORONADEARAGON", "SEC-CORONADEARAGON.MINIS", "SEC-CORONADEARAGON.MINIS.TEC", "SEC-CORONADEARAGON.PCSAULA", "SEC-DOMINGOMIRAL", "SEC-GALLICUM", "SEC-GOYA", "SEC-GOYA.MINIS", "SEC-GOYA.AULAS", "SEC-GOYA.SALASPROF", "SEC-GUDARJAVALAMBRE", "SEC-ITACA", "SEC-ITACA.AULASINF", "SEC-ITACA.EDUCAFISICA", "SEC-ITACA.MINIS", "SEC-ITACA.PCSAULA", "SEC-ITACA.TUTORES", "SEC-JERONIMOZURITA", "SEC-LUISBUNUEL", "SEC-LUISBUNUEL.AULAGRUPO", "SEC-LUISBUNUEL.MINIPORTATILES", "SEC-LUISBUNUEL.DOMINIO", "SEC-VALLEHUECHA", "SEC-VALLEHUECHA.AULAINF", "SEC-VALLEHUECHA.MINIS", "SEC-MEDINAALBAIDA", "SEC-MEDINAALBAIDA.INFORMATICA1", "SEC-MIGUELCATALAN", "SEC-MIGUELDEMOLINOS", "SEC-MIGUELDEMOLINOS.MINIS", "SEC-MIGUELSERVET.1ESO.CARROS.1", "SEC-MIGUELSERVET.1ESO.CARROS.2", "SEC-MIGUELSERVET.1ESO.CARROS.4", "SEC-MIGUELSERVET.3ESO.CARROS.7", "SEC-MIGUELSERVET.3ESO.CARROS.8", "SEC-MIGUELSERVET.3ESO.CARROS.9", "SEC-MIGUELSERVET.BIBLIOTECA.CARROS.10", "SEC-MIGUELSERVET.AULAINF1", "SEC-MIGUELSERVET.AULAINF2", "SEC-MIGUELSERVET.1ESO.CARROS", "SEC-MIGUELSERVET.2ESO.CARROS", "SEC-MIGUELSERVET.BIBLIOTECA.CARROS", "SEC-MIGUELSERVET.RAMONYCAJAL", "SEC-MIRALBUENO", "SEC-MIRALBUENO.MINIS", "SEC-PABLOSERRANO", "SEC-PABLOSERRANO.MINIS", "SEC-PABLOSERRANO.PCSAULA", "SEC-PEDRODELUNA", "SEC-PEDRODELUNA.AULA", "SEC-PEDRODELUNA.BIBLIO", "SEC-PEDRODELUNA.INFORMATICA", "SEC-PEDRODELUNA.MINI", "SEC-PIRAMIDE", "SEC-PIRAMIDE.ALUMNOS", "SEC-PIRAMIDE.PROFESORES", "SEC-PIRAMIDE.ALUMNOS.MUSICA", "SEC-RAMONPIGNATELLI", "SEC-RAMONPIGNATELLI.MINIS", "SEC-RIOGALLEGO", "SEC-RIOGALLEGO.AULASINF", "SEC-RIOGALLEGO.MINIS", "SEC-RIOGALLEGO.PCSPROFESOR", "SEC-RODANAS", "SEC-RODANAS.MINIS", "SEC-RODANAS.PCSAULA", "SEC-RODANAS.TECNOLOGIA", "SEC-SANALBERTO", "SEC-SANALBERTO.ADMINISTRACION", "SEC-SANALBERTO.MINIS", "SEC-SANALBERTO.PCSAULA", "SEC-SANALBERTO.PROFESORES", "SEC-SANALBERTO.AULASINF.1", "SEC-SANALBERTO.AULASINF.2", "SEC-SANALBERTO.TECNOLOGIA", "SEC-STEMERECIANA", "SEC-STEMERECIANA.MINIS", "SEC-SANTIAGOHERNANDEZ", "SEC-SANTIAGOHERNANDEZ.AULAS", "SEC-SANTIAGOHERNANDEZ.AULAS20", "SEC-SANTIAGOHERNANDEZ.DEPARTAMENTOS", "SEC-SIERRADEGUARA", "SEC-SIGLOXXI-PEDROLA", "SEC-TORREDELOSESPEJOS", "SEC-TORREDELOSESPEJOS.AULAMUSICA", "SEC-TORREDELOSESPEJOS.PCSAULA.BACH", "SEC-TORREDELOSESPEJOS.PCSAULA.ESO", "SEC-TORREDELOSESPEJOS.AULAINFOR1", "SEC-TORREDELOSESPEJOS.AULAINFOR2", "SEC-TORREDELOSESPEJOS.PCSAULA", "SEC-TUBALCAIN", "SEC-TUBALCAIN.AULAINF", "SEC-TUBALCAIN.LAB", "SEC-TUBALCAIN.CARROS", "SEC-TUBALCAIN.CARROS.0", "SEC-TUBALCAIN.CARROS.1", "SEC-TUBALCAIN.CARROS.1TEC", "SEC-TUBALCAIN.CARROS.2", "SEC-TUBALCAIN.CARROS.2TEC", "SEC-TUBALCAIN.CARROS.LATIN", "SEC-TUBALCAIN.PCSAULA", "SEC-TUBALCAIN.PCSAULA.BACH", "SEC-TUBALCAIN.PCSAULA.ESO", "SEC-VIRGENDELPILAR", "SEC-VIRGENDELPILAR.PCSAULA", "SEC-VIRGENDELPILAR.TECNOLOGIA", "SEC-SANALBERTO.AULASINF", "SEC-ALMUDEVAR"], "CENTRO": ["CEN-CAREI", "CEN-CIFE2", "CEN-CIFEMA", "CEN-CIFEMA.SALASINF", "CEN-CIFEMA.SALASINF.1"], "CRA": ["CRA-ALGARS", "CRA-LALBADA-BUJARALOZ", "CRA-ORBAMUEL.TABLETS"], "PERFIL": ["PER-AULARAGON"], "ENTORNO": ["ENT-ALUMNO", "ENT-PROFESOR", "ENT-CASA"]}');

var arr_etiquetas_migasfree = [];
var etiquetas_seleccionadas = [];
var etiquetas_disponibles = [];

for (var x in obj_etiquetas_migasfree) {
    arr_etiquetas_migasfree.push(obj_etiquetas_migasfree[x]);
}

function etiquetasSeleccionadasIniciales() {
    var cadena = arguments[0].toString();
    var separador = ",";
    var lista_etiquetas = cadena.split(separador);
    //var tipo = lista_etiquetas[0].toString();
    for (var j = 0; j < lista_etiquetas.length; j++) {
        etiquetas_seleccionadas.push(lista_etiquetas[j].trim());
    }
}
// Comprobamos si "migasfree-tags -g" ha devuelto algo para rellenar el array "etiquetas_seleccionadas" para mostrarlas
if (mis_etiquetas.length != 0) {
    etiquetasSeleccionadasIniciales(mis_etiquetas);
}

function etiquetasDisponiblesIniciales() {
    //Recorremos el array que llega vía parámetro formando una tabla: arguments[0]
    var resultado = '<table class="table table-hover">';
    /*resultado += '<tbody><tr><td id="cabecera2"' +
        ' style="color: skyblue; ">' +
        'Etiquetas Disponibles' +
        '</td></tr></tbody>';
        */
    for (var i = 0; i < arguments[0].length; i++) {
        var cadena = arguments[0][i].toString();
        var separador = ",";
        var lista_etiquetas_por_tipo = cadena.split(separador);
        var tipo = lista_etiquetas_por_tipo[0].toString().split("-");
        resultado += '<tr><td id="' +
            tipo[0] +
            '" style="background-color: gold; cursor:pointer; cursor: hand">' +
            '<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;' +
            tipo[0] +
            '</td></tr>';
        for (var j = 0; j < lista_etiquetas_por_tipo.length; j++) {
            etiquetas_disponibles.push(lista_etiquetas_por_tipo[j]);
            if ($.inArray(lista_etiquetas_por_tipo[j], etiquetas_seleccionadas) < 0) {
                resultado += '<tr class="' + tipo[0] +
                    ' ' +
                    lista_etiquetas_por_tipo[j] +
                    '" id="tr_' + lista_etiquetas_por_tipo[j] + '" style="display: none;"><td id="' +
                    lista_etiquetas_por_tipo[j] +
                    '" style="color: black; cursor:pointer; cursor: hand">' +
                    '&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>&nbsp;' +
                    lista_etiquetas_por_tipo[j] +
                    '&nbsp;<i class="fa fa-square-o" aria-hidden="true"></i>' +
                    ' </td></tr>';
            } else {
                resultado += '<tr class="' + tipo[0] +
                    ' ' +
                    lista_etiquetas_por_tipo[j] +
                    '" style="display: none;"><td id="' +
                    lista_etiquetas_por_tipo[j] +
                    '" style="color: red; cursor:pointer; cursor: hand">' +
                    '&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>&nbsp;' +
                    lista_etiquetas_por_tipo[j] +
                    '&nbsp;<i class="fa fa-check-square-o" aria-hidden="true"></i>' +
                    ' </td></tr>';
            }
        }

    }
    resultado += '</table>';

    //$('#cabecera2').click(controlDisplay());
    document.getElementById("etiquetas-disponibles").innerHTML = resultado;

    for (var i = 0; i < arguments[0].length; i++) {
        var cadena = arguments[0][i].toString();
        var separador = ",";
        var lista_etiquetas_por_tipo = cadena.split(separador);
        var tipo = lista_etiquetas_por_tipo[0].toString().split("-");
        //document.getElementById(tipo[0]).addEventListener("click", controlDisplay);
        var el = document.getElementById(tipo[0]);
        //alert('Hola!! Soy ' + tipo[0]);
        if (el) {
            //document.getElementById(tipo[0]).addEventListener("click", controlDisplay);
            configurarEvento(tipo[0], "click", "controlDisplay");
            /*
            $('#' + tipo[0]).click(function() {
                //swal("Todo Bien", "Perfecto!! Soy " + tipo[0], "error");
                //$('.SBR').show();
                $('.' + tipo[0]).show('slow', function() {
                    
                });
            });
            */
        } else {
            alert('No existe el elemento ' + tipo[0]);
        }
        for (var j = 0; j < lista_etiquetas_por_tipo.length; j++) {
            configurarEvento(lista_etiquetas_por_tipo[j], "click", "seleccionarEtiqueta");
            // var el = document.getElementById(lista_etiquetas_por_tipo[j]);
            // if (el) {
            //     document.getElementById(lista_etiquetas_por_tipo[j]).addEventListener("click", seleccionarEtiqueta);
            //     /*document.querySelector('#cabecera2').addEventListener('click', function() {
            //         alert('Holaaaa');
            //     });*/
            // }
        }
    }
}

function configurarEvento() {
    var identificador = arguments[0];
    var evento = arguments[1];
    var funcion_asignada = arguments[2];
    var el = document.getElementById(identificador);
    if (el) {
        //alert('El elemento exixte ' + identificador + ' con evento ' + evento + ' y funcion ' + funcion_asignada);
        document.getElementById(identificador).addEventListener(evento, eval(funcion_asignada));
        /*document.querySelector('#cabecera2').addEventListener('click', function() {
            alert('Holaaaa');
        });*/
    }
}


etiquetasDisponiblesIniciales(arr_etiquetas_migasfree);

function etiquetasDisponibles() {
    var resultado = '<table class="table table-hover">';
    // resultado += '<tbody><tr><td id="cabecera2" style="color: skyblue; ">Etiquetas Disponibles</td></tr></tbody>';
    // arguments[0] es la lista de etiquetas que llegan y que hay que mostrar
    for (var i = 0; i < arguments[0].length; i++) {
        var cadena = arguments[0][i].toString();
        if ($.inArray(arguments[0][i], etiquetas_seleccionadas) < 0) {
            resultado += '<tr class="' +
                ' ' +
                arguments[0][i] +
                '"><td id="' +
                arguments[0][i] +
                '" style="color: black; cursor:pointer; cursor: hand">' +
                '&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>&nbsp;' +
                arguments[0][i] +
                '&nbsp;<i class="fa fa-square-o" aria-hidden="true"></i>' +
                ' </td></tr>';
        } else {
            resultado += '<tr class="' +
                ' ' +
                arguments[0][i] +
                '"><td id="' +
                arguments[0][i] +
                '" style="color: red; cursor:pointer; cursor: hand">' +
                '&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>&nbsp;' +
                arguments[0][i] +
                '&nbsp;<i class="fa fa-check-square-o" aria-hidden="true"></i>' +
                ' </td></tr>';
        }
    }
    resultado += '</table>';
    //alert('Perfecto, se ha encontrado el patrón: ' + arguments[0]);
    document.getElementById("etiquetas-disponibles").innerHTML = resultado;

    for (var i = 0; i < arguments[0].length; i++) {
        configurarEvento(arguments[0][i], "click", "seleccionarEtiqueta");
    }
}

function controlDisplay() {
    identificador = this.id;
    var color = $(this).css("color");

    if (color != "rgb(255, 0, 0)") {
        contenido = '<i class="fa fa-chevron-circle-down" aria-hidden="true"></i>&nbsp;' +
            identificador;
        $(this).css("color", "red");
        $('.' + identificador).show('slow', function () {});
    } else {
        contenido = '<i class="fa fa-chevron-circle-right" aria-hidden="true"></i>&nbsp;' +
            identificador;
        $(this).css("color", "black");
        $('.' + identificador).hide('fast', function () {});
    }
    document.getElementById(identificador).innerHTML = contenido;
}


function seleccionarEtiqueta() {

    identificador = this.id;
    confSeleccionarEtiqueta(identificador);
}

function confSeleccionarEtiqueta(identificador) {

    //var color = $(this).css("color");
    //var color = $("#" + identificador).css("color");
    var el = document.getElementById(identificador);

    if (el) {

        var color = document.getElementById(identificador).style.color;
        //alert('La etiqueta seleccionada es: ' + identificador + ' y su color: ' + color);
        //if (color != "rgb(255, 0, 0)") {
        if (color != "red") {
            contenido = '&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>&nbsp;' +
                identificador +
                '&nbsp;<i class="fa fa-check-square-o" aria-hidden="true"></i>';
            //$(this).css("color", "red");
            //$("#" + identificador).css("color", "red");
            document.getElementById(identificador).style.color = "red";
            // Comprobamos si ya esta la etiqueta previamente seleccionada:
            if ($.inArray(identificador, etiquetas_seleccionadas) < 0) {
                //etiquetas_seleccionadas.push($("#" + identificador).text());
                etiquetas_seleccionadas.push(identificador);
                //alert('La lista de etiquetas seleccionadas es: ' + etiquetas_seleccionadas);
                completarEtiquetasSeleccionadas();
            }
        } else {
            contenido = '&nbsp;<i class="fa fa-angle-double-right" aria-hidden="true"></i>&nbsp;' +
                identificador +
                '&nbsp;<i class="fa fa-square-o" aria-hidden="true"></i>';
            //$(this).css("color", "black");
            //$("#" + identificador).css("color", "black");
            document.getElementById(identificador).style.color = "black";

            var index = etiquetas_seleccionadas.indexOf(identificador);
            if (index > -1) {

                etiquetas_seleccionadas.splice(index, 1);
                //alert('Se ha encontrado la etiqueta y se va a eliminar, ahora quedan: ' + etiquetas_seleccionadas);
            }
            completarEtiquetasSeleccionadas();

        }
        document.getElementById(identificador).innerHTML = contenido;

    } else {
        if ($.inArray(identificador, etiquetas_seleccionadas) < 0) {
            //etiquetas_seleccionadas.push($("#" + identificador).text());
            etiquetas_seleccionadas.push(identificador);
            //alert('La lista de etiquetas seleccionadas es: ' + etiquetas_seleccionadas);
        } else {
            var index = etiquetas_seleccionadas.indexOf(identificador);
            if (index > -1) {
                etiquetas_seleccionadas.splice(index, 1);
                //alert('Se ha encontrado la etiqueta y se va a eliminar, ahora quedan: ' + etiquetas_seleccionadas);
            }
        }
        completarEtiquetasSeleccionadas();
    }
}

//La siguiente función elimina la etiqueta seleccionada al pinchar sobre ella (función definida en su click)
function corroborarEtiqueta() {
    identificador = this.id;
    var separador = "_";
    var trozos_etiqueta_seleccionada = identificador.split(separador);

    confSeleccionarEtiqueta(trozos_etiqueta_seleccionada[1]);

    /*var index = etiquetas_seleccionadas.indexOf(trozos_etiqueta_seleccionada[1]);
    if (index > -1) {
        etiquetas_seleccionadas.splice(index, 1);
    }*/
    completarEtiquetasSeleccionadas();
}

function completarEtiquetasSeleccionadas() {
    var resultado = '<table class="table table-hover">';
    // resultado += '<tbody><tr><td id="cabecera2" style="color: skyblue; ">Etiquetas Seleccionadas</td></tr></tbody>';
    if (etiquetas_seleccionadas.length == 0) {
        resultado += '<tr><td style="background-color: Crimson; color: white; text-align: center; padding: 20px; " >' +
            '-- El equipo NO tiene Etiquetas Asignadas, y no se ha seleccionado todavía ninguna Etiqueta Migasfree --</td></tr>';
    } else {
        //alert('Se van a mostrar las etiquetas seleccionadas: ' + etiquetas_seleccionadas);
        for (var i = 0; i < etiquetas_seleccionadas.length; i++) {
            var cadena = etiquetas_seleccionadas[i].toString();
            resultado += '<tr><td id="seleccionada_' + cadena +
                '" class="etiquetas-seleccionadas">' +
                '<i class="fa fa-hand-o-right" aria-hidden="true"></i>&nbsp;' +
                cadena +
                ' &nbsp;<i class="fa fa-times-circle" aria-hidden="true" style="color: red;"></i>' +
                '</td></tr>';
        }
    }
    resultado += '</table>';

    //$('#cabecera2').click(controlDisplay());
    document.getElementById("etiquetas-seleccionadas").innerHTML = resultado;

    // Ahora les asociamos un evento click a cada uno de los elementos anteriores
    for (var j = 0; j < etiquetas_seleccionadas.length; j++) {
        var el = document.getElementById("seleccionada_" + etiquetas_seleccionadas[j]);
        if (el) {
            document.getElementById("seleccionada_" + etiquetas_seleccionadas[j]).addEventListener("click", corroborarEtiqueta);
        }
    }
}

completarEtiquetasSeleccionadas();



$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $("#buscar-etiquetas").keyup(function () {

        var etiquetas_segun_patron = [];
        // Lo que escribe en el Input: Eliminamos cualquier espacio en blanco y lo forzamos a mayúsculas 
        var dInput = this.value.toString().replace(/\s/g, '').toUpperCase();
        //document.getElementById("salida1").innerHTML = dInput;
        //if ( dInput.localeCompare("") != 0 ) {
        if (dInput.length > 3) {
            //document.getElementById("salida2").innerHTML = "Pasamos la comparación";
            for (var i = 0; i < etiquetas_disponibles.length; i++) {
                //var cadena = etiquetas_disponibles[i].toString();
                //var index = cadena.indexOf(dInput);
                if (etiquetas_disponibles[i].match(dInput)) {
                    //if (index > -1) {
                    if ($.inArray(etiquetas_disponibles[i], etiquetas_segun_patron) < 0) {
                        etiquetas_segun_patron.push(etiquetas_disponibles[i]);
                    }
                }
            }
            if (etiquetas_segun_patron.length == 0) {
                etiquetas_segun_patron = ['No existen etiquetas con ese patrón'];

            }
            //alert ('Perfecto, se ha encontrado el patrón: ' + etiquetas_segun_patron );
            etiquetasDisponibles(etiquetas_segun_patron);
        } else {
            //document.getElementById("salida2").innerHTML = "Esta vacío";
            etiquetasDisponiblesIniciales(arr_etiquetas_migasfree);
        }
    });

    $("#minimizar").click(function (event) {
        win.minimize();
    });

    $("#ocultar").click(function (event) {
        win.hide();
    });

    $("#aplicar").click(function (event) {
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
        }).then(function () {
            console.log(etiquetas_seleccionadas.toString());
            $('#contenedor').hide('slow', function () {

            });
            $('.botonera2').show('slow', function () {

            });
            $('.logresultado').show('slow', function () {

            });
            if (mis_etiquetas_ordenadas.toString() != etiquetas_seleccionadas_ordenadas.toString()) {
                process.stdout.write("=> Hay un cambio de etiquetado así asignaremos las nuevas etiquetas al equipo ...\n");
                asignar_etiquetas_migasfree("SI", etiquetas_seleccionadas.toString());
            } else {
                process.stdout.write("=> NO hay cambio en el etiquetado migasfree ...\n");
                asignar_etiquetas_migasfree("NO", "<b>No hay cambio</b> en el <b>Etiquetado Migasfree</b> ...<br>Por tanto, no haremos nada ...");
            }
        })

    });

    $("#divaplicar").keypress(function (e) {
        if (e.which == 13) {
            accion_boton_aplicar_etiquetado_migasfree();
        }
    });

    $("#divcancelar").keypress(function (e) {
        if (e.which == 13) {
            if (es_post_instalacion()) {
                cancelar_post_instalacion();
            }
            cerrar_aplicacion();
        }
    });

    $(".cancelar").click(function (event) {
        //process.stdout.write("1");
        //console.log("Salimos ...");
        if (es_post_instalacion()) {
            cancelar_post_instalacion();
        }
        process.exit(1);
        console.log("1");
        // Quit current app
        gui.App.quit();
    });

    // Posicionamos el foco en el buscador de etiquetas:
    // document.getElementById("buscar-etiquetas").focus();
    $("#buscar-etiquetas").focus();
});

/*
var arr = [];
json = JSON.stringify(eval('(' + etiquetas_migasfree_disponibles() + ')')); //convert to json string
arr = $.parseJSON(json); //convert to javascript array
document.write(arr) ;
*/