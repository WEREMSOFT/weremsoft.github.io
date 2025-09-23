#!/bin/bash

# Generador de indice para el blog

set -e

SRC_DIR="blog/src"

cat layout/blog_header.html.c

for post in $(ls -1r ${SRC_DIR}/*.txt); do
    DATE=$(head -n 1 "${post}")
    TITLE=$(head -n 2 "${post}" | tail -n 1)
    SUMMARY=$(head -n 3 "${post}" | tail -n 1)
    FILENAME=$(basename "${post}" .txt)

    echo "<li>"
    echo "  <h3><a href=\"posts/${FILENAME}.html\">${TITLE}</a></h3>"
    echo "  <small>${DATE}</small>"
    echo "  <p>${SUMMARY}</p>"
    echo "</li>"
done

cat layout/blog_footer.html.c
