const express = require('express');
const app = express();
app.use(express.json());

// TODO: Pasar a un archivo por separado
let info = {
    id: 1,
    nombre: "Jorge Luis",
    apellido: "Borges",
    fechaDeNacimiento: "24/08/1899",
    libros: [
        {
            id: 1,
            titulo: "Ficciones",
            descripcion: "Se trata de uno de sus más ...",
            anioPublicacion: 1944
        },
        {
            id: 2,
            titulo: "El Aleph",
            descripcion: "Otra recopilación de cuentas ...",
            anioPublicacion: 1949
        }
    ]

}
let arrayInfo = [];
arrayInfo.push(info);

app.get('/', function (req, res) {
    res.send({programa: "Autores y sus Libros"})
})

app.get('/autores', function (req, res) {
    res.send(arrayInfo);
});

app.post('/autores', function (req, res) {
    let autor = req.body;
    console.log(autor);
    arrayInfo.push(autor);
    res.send(autor);
});



app.listen(3000, function () {
    console.log('Escuchando el puerto 3000!');
});