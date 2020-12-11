const express = require('express');
const User = require('../models/User');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.send('Home')
});

router.post('/wantToVisit', (req, res)=>{
  User.findByIdAndUpdate(req.body.userID, {$push: {wantToVisit: req.body.mangaID}})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.post('/alreadyVisited', (req, res)=>{
  User.findByIdAndUpdate(req.body.userID, {$push: {alreadyVisited: req.body.mangaID}})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.post('/hotelsBooking', (req, res)=>{
  User.findByIdAndUpdate(req.body.userID, {$push: {hotelsBooking: req.body.mangaID}})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.get('/getUser/:id', (req, res)=>{

  User.findById(req.params.id)
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})

/* GET: Ver todos los mangas */

/* GET: Página principal (profile page) donde podré ver los tres grupos */

/* GET: Ver mis mangas wantToVisit */

/* GET: Ver los mangas que estoy alreadyVisited */

/* GET: Ver mis mangas por leer */

/* GET: Página independiente de cada manga */

/* GET: Ver todos los usuarios */
router.get('/all-users', (req, res)=>{
  User.find({})
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    res.send(err)
  })
})

/* POST: Añadir manga a WantToVisit */

/* POST: Añadir manga a AlreadyVisited */

/* POST: Añadir manga a Por leer */

/* POST: Crear un manga nuevo */

/* PUT: Editar usuario */

/* PUT: Editar WantToVisit */

/* PUT: Editar AlreadyVisited */

/* PUT: Editar Por Leer */

/* DELETE: Eliminar usuario */

/* DELETE: Eliminar manga */



module.exports = router;