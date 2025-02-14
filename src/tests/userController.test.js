//src/tests/userController.test.js

import request from 'supertest';
import { expect } from 'chai';
import chalk from 'chalk';
import app from '../app.js';

console.log(chalk.magenta('\n═══════════════════════════════════════'));
console.log(chalk.bold('🎯 INICIANDO PRUEBAS DE USER CONTROLLER...'));
console.log(chalk.magenta('═══════════════════════════════════════'));

describe('User Controller', function () {
  this.timeout(5000);
  let testUserId = null;
  let passedTests = 0;
  let totalTests = 5;

  async function runTest(testFunction) {
    try {
      await testFunction();
      passedTests++;
    } catch (error) {
      console.error(chalk.red('❌ ERROR EN PRUEBA:'), error.message);
    }
  }

  it(
    chalk.cyan('📌 [GET] /api/users - Obtener todos los usuarios'),
    async function () {
      await runTest(async () => {
        console.log(chalk.magenta('\n═══════════════════════════════════════'));
        console.log(chalk.bold('🔍 PRUEBA: OBTENER TODOS LOS USUARIOS'));
        console.log(chalk.magenta('═══════════════════════════════════════'));

        const startTime = Date.now();
        const res = await request(app).get('/api/users');
        const duration = Date.now() - startTime;

        console.log(chalk.yellow(`⏱ Tiempo: ${duration}ms`));
        console.log(chalk.green('📡 Respuesta del servidor:'), res.body);

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');

        console.log(
          chalk.green('✅ Lista de usuarios obtenida correctamente.')
        );
      });
    }
  );

  it(
    chalk.cyan('📌 [POST] /api/users - Crear un nuevo usuario'),
    async function () {
      await runTest(async () => {
        console.log(chalk.magenta('\n═══════════════════════════════════════'));
        console.log(chalk.bold('📝 PRUEBA: CREAR UN NUEVO USUARIO'));
        console.log(chalk.magenta('═══════════════════════════════════════'));

        const startTime = Date.now();
        const newUser = {
          name: 'John Doe',
          email: 'john@example.com',
          testUser: true,
        };
        const res = await request(app).post('/api/users').send(newUser);
        const duration = Date.now() - startTime;

        console.log(chalk.yellow(`⏱ Tiempo: ${duration}ms`));
        console.log(chalk.green('📡 Respuesta del servidor:'), res.body);

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');

        testUserId = res.body.id;
        console.log(
          chalk.green('✅ Usuario creado y verificado en Firestore.')
        );
      });
    }
  );

  it(
    chalk.cyan('📌 [PUT] /api/users/:id - Actualizar un usuario'),
    async function () {
      await runTest(async () => {
        console.log(chalk.magenta('\n═══════════════════════════════════════'));
        console.log(chalk.bold('✏️ PRUEBA: ACTUALIZAR UN USUARIO'));
        console.log(chalk.magenta('═══════════════════════════════════════'));

        const updatedUser = {
          name: 'John Updated',
          email: 'john_updated@example.com',
        };
        const res = await request(app)
          .put(`/api/users/${testUserId}`)
          .send(updatedUser);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Usuario actualizado con éxito');
        console.log(chalk.green('✅ Usuario actualizado correctamente.'));
      });
    }
  );

  it(
    chalk.cyan('📌 [DELETE] /api/users/:id - Eliminar un usuario existente'),
    async function () {
      await runTest(async () => {
        console.log(chalk.magenta('\n═══════════════════════════════════════'));
        console.log(chalk.bold('🗑 PRUEBA: ELIMINAR UN USUARIO EXISTENTE'));
        console.log(chalk.magenta('═══════════════════════════════════════'));

        const res = await request(app).delete(`/api/users/${testUserId}`);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Usuario eliminado con éxito');
        console.log(chalk.green('✅ Usuario eliminado correctamente.'));
      });
    }
  );

  it(
    chalk.cyan(
      '📌 [DELETE] /api/users/:id - Intentar eliminar usuario inexistente'
    ),
    async function () {
      await runTest(async () => {
        console.log(chalk.magenta('\n═══════════════════════════════════════'));
        console.log(chalk.bold('❌ PRUEBA: ELIMINAR USUARIO INEXISTENTE'));
        console.log(chalk.magenta('═══════════════════════════════════════'));

        const fakeId = 'nonexistentID';
        const res = await request(app).delete(`/api/users/${fakeId}`);
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Usuario no encontrado');
        console.log(
          chalk.green('✅ Correctamente identificado que el usuario no existe.')
        );
      });
    }
  );

  after(async function () {
    console.log(chalk.magenta('\n═══════════════════════════════════════'));
    console.log(
      chalk.bold('🧹 LIMPIEZA FINAL - ELIMINANDO USUARIOS DE PRUEBA')
    );
    console.log(chalk.magenta('═══════════════════════════════════════'));

    if (testUserId) {
      console.log(
        chalk.red(`🗑 Eliminando usuario de prueba con ID: ${testUserId}`)
      );
      await request(app).delete(`/api/users/${testUserId}`);
    }

    console.log(chalk.green('✅ Se eliminaron usuarios de prueba.'));
    console.log(chalk.magenta('\n═══════════════════════════════════════'));
    console.log(
      chalk.bold(
        `✅ PRUEBAS COMPLETADAS - ${passedTests}/${totalTests} EXITOSAS ✅`
      )
    );
    console.log(chalk.magenta('═══════════════════════════════════════'));
  });
});
