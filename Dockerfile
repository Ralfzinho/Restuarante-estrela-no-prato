FROM php:8.2-apache

# Copia tudo da pasta local para a pasta do Apache
COPY . /var/www/html/

# Ativa o mod_rewrite (opcional, mas útil)
RUN a2enmod rewrite