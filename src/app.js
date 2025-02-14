///src/app.js

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import userRoutes from './routes/Users.js';
import swaggerDocs from './config/swagger.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 📌 Rutas
app.use('/api', userRoutes);

// 📌 Swagger
swaggerDocs(app);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 ¡El servidor está funcionando correctamente!',
    status: 'ok',
    documentation: '/api-docs',
  });
});

// 📌 Middleware de manejo de rutas no encontradas (404)
app.use(notFoundHandler);

// 📌 Middleware de manejo de errores generales
app.use(errorHandler);

export default app;
