# Paquete DEB vx-dga-l-migasfree-tags

Paquete encargado de permitir una gestión eficiente de las etiquetas Migasfree (Migasfree Tags) asociadas al equipo.

# Usuarios Destinatarios

Cualquier usuario que haga uso de la gestión remota y desatendida del servicio Migasfree

# Aspectos Interesantes:

Con la finalidad de facilitar la asignación de etiquetas se ha rehecho totalmente la aplicación GUI migasfree-tags, buscando una mayor eficiencia y amigabilidad de su entorno gráfico

# Como Crear o Descargar el paquete DEB a partir del codigo de GitHub
Para crear el paquete DEB será necesario encontrarse dentro del directorio donde localizan los directorios que componen el paquete.  Una vez allí, se ejecutará el siguiente comando (es necesario tener instalados los paquetes apt-get install debhelper devscripts):

```
apt-get install debhelper devscripts
/usr/bin/debuild --no-tgz-check -us -uc
```

En caso de no querer crear el paquete para tu distribución, puedes hacer uso del que está disponible para Vitalinux (*Lubuntu 14.04*) desde el siguiente repositorio:

[Respositorio de paquetes DEB de Vitalinux](http://migasfree.educa.aragon.es/repo/Lubuntu-14.04/STORES/base/)

# Como Instalar el paquete vx-dga-l-*.deb:

Para la instalación de paquetes que estan en el equipo local puede hacerse uso de ***dpkg*** o de ***gdebi***, siendo este último el más aconsejado para que se instalen de manera automática también las dependencias correspondientes.
```
gdebi vx-dga-l-*.deb
```
