#!/bin/bash

# Nombres fijos
REPOSITORIO="restreamer"
SCRIPT_DIR=$(dirname "$0")  # Obtiene el directorio del script

# Actualizar el código fuente
echo "Actualizando el código fuente desde Git..."
cd $SCRIPT_DIR
if [[ -z "$GITHUB_TOKEN" ]]; then
    echo "Error: El token de GitHub no está configurado."
    exit 1
fi

# Usa el usuario y token directamente en la URL del repositorio
git config --local credential.username marceloremeseiro
git pull https://marceloremeseiro:${GITHUB_TOKEN}@github.com/MarceloRemeseiro/${REPOSITORIO}.git

# Apagar y eliminar los contenedores existentes
echo "Apagando y eliminando los contenedores existentes..."
docker-compose down

# Reconstruir las imágenes Docker y levantar los contenedores en modo detach
echo "Reconstruyendo las imágenes Docker y levantando los contenedores..."
docker-compose up -d --build

# Limpiar imágenes "dangling"
echo "Limpiando imágenes sin usar..."
docker image prune -f

echo "Actualización completada y contenedores reiniciados."
