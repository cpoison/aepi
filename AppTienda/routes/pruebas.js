const router = require("express").Router()
const { skips } = require("debug");
const { route } = require(".");
const Persona = require('../models/persona');
const Producto = require('../models/producto');


// INSERTAR UNA PERSONA

router.get('/insert', (req, res) => {
    const pers = new Persona();

    pers.nombre = 'Ana';
    pers.apellidos = 'Robles';
    pers.email = 'ana@gmail.cm';
    pers.edad = 23;
    pers.activo = true;

    // Con callback
    // pers.save((err, nuevaPersona) => {
    //     if (err) {
    //         return res.send('error en la insercion');
    //     }
    //     console.log(nuevaPersona);
    //     res.send('Se ha insertado una nueva persona')
    // })

    // Con promesa
    // pers.save()
    //     .then(nuevaPersona => {
    //         res.send('Se ha insertado una nueva persona');
    //     })
    //     .catch(err => console.log(err))

});


// INSERTA UNA PERSONA A TRAVES DE /CREATE

router.get('/insert_v2', (req, res) => {
    Persona.create({
        nombre: 'Lorenzo',
        apellidos: 'Gonzalez',
        email: 'lorenzo@gmail.com',
        edad: '78',
        activo: false
    })
        .then(nuevaPersona => {
            console.log(nuevaPersona);
            res.send('Ha insertado una persona')
        })
        .catch(err => console.log(err));
})

// INSERTA UNA PERSONA CON CREATE ASYNC AWAIT

router.get('/inster_v3', async (req, res) => {
    try {
        const nuevaPersona = await Persona.create({
            nombre: 'Raul',
            apellidos: 'Ramirez',
            email: 'raul@gmail.com',
            edad: '16',
            activo: false
        })
        console.log(nuevaPersona);
        res.send("Se ha insertado una nueba persona")
    } catch(error){
        console.log(error)
    }

})

// RECUPERO TODAS LAS PERSONAS

router.get('/find', (req, res) => {
    Persona.find()
        .then(personas => {
            res.json(personas)
        })
        .catch(error => console.log(error))
})

// RECUPERO POR UN NOMBRE

router.get('/find_by_name', async (req, res) => {
    try {
        const personas = await Persona.find({ nombre: 'Raul' });
        res.json(personas)
    } catch(error){
        console.log(error);
    }     
})

// RECUPERO LOS MAYORES DE EDAD y menor de 65

router.get('/find_mayores_edad', async (req, res) => {
    try {
        const personas = await Persona.find({ edad: {$gt: 18, $lt: 65} });
        
        //Acceder a la propiedad virtual nombre_completo
        for (let persona of personas) {
            console.log(persona.nombre_completo)
        }
        
        res.json(personas)
    } catch (error) {
        console.log(error);
    }
})

// Modificar una persona concreta

router.get('/modificar', async (req, res) => {

    try {
        const persona = await Persona.findById('5f808684c236ae9844b41936')
        persona.nombre = "Nuevo nombre persona";
        persona.save();
        res.json(persona);
    } catch(error) {
        console.log(error);
    }
})


// Modificar persona v2

router.get('/modificar_v2', async (req, res) => {

    try {
        // findByIdAndUpdate devuelve el objeto anterior a la modificacion asi que añadimos el tercer parametro
        // {new: true} para que nos devueva el nuevo objeto ya modificado
        const personaEditada = await Persona.findByIdAndUpdate('5f808684c236ae9844b41936', {apellidos: 'Apellido Modificado otro'}, {new: true})
        
        res.json(personaEditada);
    } catch (error) {
        console.log(error);
    }
})

// Modificar personas que cumplan una condicion (De activo TRUE a FALSE)

router.get('/modificar_v3', async (req, res) => {

    try {
        // De activo TRUE a FALSE
        const resultado = await Persona.updateMany({activo: true}, {$set: {activo:false}})
        res.json(resultado);
    } catch (error) {
        console.log(error);
    }
})

// Recuperar todos los productos del mismo departamento

router.get('/mismo_departamento', (req, res) => {

    const prod = new Producto();
    prod.departamento = 'Electrodomesticos'
    //mismoDepartamento() hace referencia al metodo de producto.js
    prod.mismoDepartamento()
        .then(productos => res.json(productos))
        .catch(error => console.log(error)) 
})

// Recuperar todas las personas activas
router.get('/activas', async (req, res) => {

    const personasActivas = await Persona.activos();
    res.json(personasActivas);

})


module.exports = router;

