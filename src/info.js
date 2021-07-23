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
};
let arrayInfo = [];
//exports.arrayInfo = arrayInfo;
arrayInfo.push(info);

module.exports = { arrayInfo }
