const express = require('express');
const morgan = require('morgan')

const { arrayInfo } = require("./info");
const { existeAutor, existeAutorLibro } = require("./middleware");

//Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Autores y Libros API',
            version: '1.0.1'
        }
    },
    apis: ['./src/app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();

app.use(express.json());
app.use(morgan('dev'));



/**
 * @swagger
 * /:
 *  get:
 *    summary: programa
 *    description : Listado de autores y sus libros
 */
app.get('/', function (req, res) {
    res.send({ programa: "Autores y sus Libros" })
})

/**
 * @swagger
 * /autores:
 *  get:
 *    summary: Autores
 *    description: Listado de autores y sus libros
 *    responses:
 *       200:
 *         description: Listado de autores
 */
app.get('/autores', function (req, res) {
    console.log(arrayInfo);
    res.send(arrayInfo);
});

/**
 * @swagger
 * /autores:
 *  post:
 *    summary: Autores
 *    description : Listado de autores y sus libros
 */
app.post('/autores', function (req, res) {
    let autor = req.body;
    console.log(autor);
    arrayInfo.push(autor);
    res.send(autor);
});


/**
 * @swagger
 * /autores/{id}:
 *  get:
 *    summary: Autor por ID
 *    description: Información de un autor.
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del autor a recuperar.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *        description: Listado ok.
 */
app.get('/autores/:id', existeAutor, function (req, res) {
    let autor = req.autor;
    console.log(autor);
    res.send(autor);
});


/**
 * @swagger
 * /autores/{id}/libros:
 *  get:
 *    summary: Libros según ID de Autor
 *    description: Devuelve los libros de un autor.
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del autor a recuperar.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *        description: Listado de libros.
 */
app.get('/autores/:id/libros', existeAutor, function (req, res) {
    let autor = req.autor;
    console.log(autor.libros);
    res.send(autor.libros);
});



app.delete('/autores/:id', existeAutor, function (req, res) {
    let autor = req.autor;
    let index = req.index
    resultado = 'Borrado según el indice: ' + index
    arrayInfo.splice(index, 1);
    res.send({ resultado: resultado, valor: autor });
});

app.put('/autores/:id', existeAutor, function (req, res) {
    let autorNuevo = req.body;
    let index = req.index
    resultado = 'Actualización según el indice: ' + index
    arrayInfo[index] = autorNuevo;
    res.send({ resultado: resultado, valor: autorNuevo });
});


app.post('/autores/:id/libros', existeAutor, function (req, res) {
    let autor = req.autor;
    let index = req.index

    let libro = req.body;
    console.log(libro);
    autor.libros.push(libro);
    res.send(autor);
});


app.get('/autores/:id/libros/:idLibro', existeAutor, existeAutorLibro, function (req, res) {
    let autor = req.autor;
    indexLibro = req.indexLibro;
    console.log(autor.libros[indexLibro]);
    res.send(autor.libros[indexLibro]);
});




app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// view in localhost:3000/api-docs


app.listen(3000, function () {
    console.log('Escuchando el puerto 3000!');
});

