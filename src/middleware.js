const { arrayInfo } = require("./info");

// Funciones de middlewares
function existeAutor(req, res, next) {
    let id = req.params.id;
    let index = arrayInfo.findIndex(autor => autor.id == id);
    let autor = arrayInfo[index];
    console.log(index);
    if (!autor) {
        res.status(404).send({ resultado: `Id autor ${id} no existe` });
    } else {
        req.index = index;
        req.autor = autor;
        next();
    }
}
exports.existeAutor = existeAutor;
function existeAutorLibro(req, res, next) {
    id = req.params.id;
    idLibro = req.params.idLibro;
    index = arrayInfo.findIndex(autor => autor.id == id);
    autor = arrayInfo[index];
    indexLibro = autor.libros.findIndex(libro => libro.id == idLibro);
    libro = autor.libros[indexLibro];
    console.log('indexLibro: ', indexLibro);
    if (!libro) {
        res.status(404).send({ resultado: `Id libro ${idLibro} no existe` });
    } else {
        req.index = index;
        req.autor = autor;
        req.indexLibro = indexLibro;
        req.libro = libro;
        next();
    }
}
exports.existeAutorLibro = existeAutorLibro;
