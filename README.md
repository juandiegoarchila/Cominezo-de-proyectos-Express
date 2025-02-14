# SERVI

Este proyecto nace de la necesidad de contar con una estructura base sólida para el desarrollo de aplicaciones en Node.js con Express.js. Su objetivo es evitar la configuración repetitiva en cada nuevo proyecto, proporcionando una plantilla bien organizada que sirva como punto de partida.

La estructura incluye controladores, modelos, rutas, vistas, configuración y middleware, asegurando un desarrollo modular y mantenible. Además, incorpora herramientas esenciales como nodemon para recarga automática, mocha y chai para pruebas, dotenv para variables de entorno y una configuración inicial de seguridad.

Aunque en esta versión se ha integrado Firebase Admin SDK como base de datos, la arquitectura es flexible y permite reemplazar Firebase por otras bases de datos como MongoDB, PostgreSQL o MySQL con mínimos cambios. Esto facilita la adaptación del proyecto a diferentes necesidades sin perder su estructura base.

Este proyecto no solo optimiza el tiempo de desarrollo, sino que también permite escalar y mejorar con el tiempo, añadiendo mejores prácticas, seguridad y herramientas avanzadas. Funciona como una base reutilizable para futuras aplicaciones, facilitando la creación de nuevos proyectos sin empezar desde cero.

🔹 Si planeas agregar autenticación en el futuro, puedes añadir:

Próximamente se integrará autenticación con JWT o Firebase Authentication para mejorar la seguridad del sistema.

## 📌 Características

- **API RESTful**: Creada con Express.js para gestionar operaciones CRUD.
- **Seguridad**: Implementada con Helmet y CORS.
- **Base de datos**: Utiliza Firebase Admin SDK para la persistencia de datos.
- **Variables de entorno**: Soporte completo a través de dotenv.
- **Documentación automática**: Integrada con Swagger.
- **Testing**: Pruebas automatizadas con Mocha, Chai y Supertest.
- **Validación de datos**: Realizada mediante express-validator.
- **Control de calidad de código**: ESLint y Prettier con Husky y lint-staged.

## 🚀 Instalación

### 1️⃣ Clonar el repositorio

```sh
git clone https://github.com/juandiegoarchila/comienzo-de-proyectos.git
cd comienzo-de-proyectos
```

### 2️⃣ Abrir el proyecto en Visual Studio Code (opcional)

```sh
code .
```

### 3️⃣ Instalar dependencias

```sh
npm init -y
npm install express express-handlebars firebase-admin dotenv body-parser cors helmet joi morgan winston express-validator jsonwebtoken google-gax node-fetch swagger-jsdoc swagger-ui-express
npm install --save-dev chai mocha nodemon supertest husky lint-staged eslint prettier
```

## 🛠 Automatización de Linting y Formateo con Husky y lint-staged

Para garantizar que el código mantenga siempre el formato y estilo establecidos, se automatizará el proceso de linting y formateo antes de cada commit.

### 1. Inicializar ESLint

```sh
npx eslint --init
```

### 2. Configurar Prettier

Crea un archivo `.prettierrc` en la raíz del proyecto:

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### 3. Agregar Scripts en package.json

```json
"scripts": {
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "mocha --reporter spec --exit \"src/tests/**/*.test.js\"",
    "prepare": "husky install"
  },
"type": "module"
```

### 4. Configurar Husky y lint-staged

```sh
npx husky install
npm set-script prepare "husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

```json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.js": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

### 5. Formateo de código manual

Si deseas formatear el código manualmente en cualquier momento, usa el siguiente comando:

```sh
npx prettier --write .
```

💡 **Nota:** El formateo de código también se ejecuta automáticamente cada vez que realizas un commit gracias a Husky y lint-staged.

## 🏢 Estructura del Proyecto

```
/src
├── /controllers     # Lógica de negocio (controladores)
├── /models          # Modelos de datos
├── /routes          # Definición de rutas
├── /views           # Archivos estáticos o plantillas Handlebars
├── /public          # Archivos estáticos (imágenes, CSS, JS frontend)
├── /config          # Configuración global del proyecto
│   ├── db.js        # Configuración de Firebase
│   ├── config.js    # Configuración de variables de entorno
├── /middleware      # Middlewares globales (seguridad, errores, etc.)
│   ├── errorHandler.js
│   ├── cors.js
├── app.js           # Configuración principal de Express
├── firebase.js      # Inicialización de Firebase Admin SDK
├── index.js         # Punto de entrada del servidor
.gitignore            # Evitar subir archivos innecesarios
.env                  # Variables de entorno
README.md             # Documentación del proyecto
package.json          # Configuración de dependencias y scripts
```

### 📂 Explicación de los archivos clave

- **`firebase.js`**: Inicializa Firebase Admin SDK y establece la conexión con Firebase.
- **`config/config.js`**: Define variables de configuración globales y carga el archivo `.env`.
- **`config/db.js`**: Administra la conexión con Firebase y las funciones de base de datos.
- **`middleware/errorHandler.js`**: Middleware para manejar errores de manera centralizada.
- **`middleware/cors.js`**: Configura la seguridad de la API mediante CORS.
- **`views/`**: Contiene las plantillas de Handlebars si se usa renderización del lado del servidor.
- **`public/`**: Contiene archivos estáticos como imágenes, estilos CSS y scripts frontend.

Para crear la estructura y archivos rápidamente, ejecuta este comando:

```sh
mkdir src, src/config, src/controllers, src/docs, src/middleware, src/public, src/routes, src/tests, src/validators, src/views; New-Item src/index.js, src/app.js, src/config/config.js, src/config/swagger.js, src/controllers/userController.js, src/docs/usersDocs.js, src/middleware/errorHandler.js, src/middleware/notFoundHandler.js, src/middleware/validation.js, src/routes/Users.js, src/tests/userController.test.js, src/validators/userValidator.js, .env, .gitignore, README.md -ItemType File
```

## 🔗 Endpoints Disponibles

La API cuenta con los siguientes endpoints para la gestión de usuarios:

| Método | Endpoint       | Descripción                  |
| ------ | -------------- | ---------------------------- |
| GET    | /api/users     | Obtener la lista de usuarios |
| POST   | /api/users     | Crear un nuevo usuario       |
| PUT    | /api/users/:id | Actualizar un usuario por ID |
| DELETE | /api/users/:id | Eliminar un usuario por ID   |

⚠️ **Importante**: La documentación Swagger (disponible en `/api-docs`) refleja estos endpoints.

## 🏃‍♂️ Ejecución del Proyecto

Para iniciar el servidor en modo producción:

```sh
npm start
```

Para iniciar en modo desarrollo con recarga automática:

```sh
npm run dev
```

Para ejecutar las pruebas:

```sh
npm test
```

## 🌐 Variables de Entorno

Consejo: Asegúrate de que la ruta a tu archivo de credenciales de Firebase sea correcta.

Ejemplo de `.env`:

```
PORT=5000
GOOGLE_APPLICATION_CREDENTIALS="C:\aca\tu\proyecto\firebase.json"
```

`Linux/macOS`
GOOGLE_APPLICATION_CREDENTIALS="/home/usuario/proyecto/firebase.json"

## 📌 Contribuciones

Si deseas contribuir, por favor abre un issue o un pull request con tus mejoras.

## 📝 Licencia

Este proyecto está bajo la licencia **ISC**.

📌 **Autor**: Juan Diego
