## Pasos para Desplegar el Proyecto

A continuación, te proporciono un paso a paso detallado para desplegar tu proyecto de comercio electrónico utilizando Node.js 18.16 y PostgreSQL 15.3. Asegúrate de seguir estos pasos en orden:

1. Instalación de Dependencias:

Asegúrate de tener Node.js y npm instalados en tu sistema. Luego, en la carpeta raíz del proyecto, ejecuta el siguiente comando para instalar las dependencias:

`npm install` 

2. Configuración de la Base de Datos:

Crea una base de datos en PostgreSQL con el nombre "PFHenry" y configura las credenciales en un archivo .env siguiendo el siguiente formato:

DB_USER=mi_usuario DB_PASSWORD=mi_contraseña DB_HOST=mi_host 

3. Inicio del Servidor:

Inicia el servidor de desarrollo con el siguiente comando:

`npm start` 

4. Datos .env:

DB_USER=postgres
DB_PASSWORD=admin
DB_HOST=localhost
DB_PORT=5432
PORT=3010
JWT_KEY=Grupo7
ACCESS_TOKEN=TEST-6310559041386566-071820-2556cfd79c12b7ca5ed095500b899251-1338314230
BACK_URL_SUCCESS=http://localhost:3000/success
BACK_URL_FAILED=http://localhost3001/failed
BACK_URL_PENDING=http://localhost3001/pending
EMAIL_PASSWORD=eotozmzgsmxdejnk
EMAIL_USER=ecommercepfhenry@gmail.com
