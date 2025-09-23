#!/bin/bash

# Generador de posts para el blog

set -e

if [ -z "$1" ]; then
    echo "Uso: $0 <archivo_de_entrada>"
    exit 1
fi

INPUT_FILE="$1"

DATE=$(head -n 1 "${INPUT_FILE}")
TITLE=$(head -n 2 "${INPUT_FILE}" | tail -n 1)
BODY=$(tail -n +4 "${INPUT_FILE}")

cat layout/header.html.c

echo "<h1>${TITLE}</h1>"
echo "<p><em>${DATE}</em></p>"
echo "${BODY}"

cat layout/footer.html.c
